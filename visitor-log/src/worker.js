const MAX_LOGS = 2000;
const HOUR_LIMIT = 60;
const CORS_ORIGINS = [
  "https://chloceg.github.io",
  "http://127.0.0.1:4000",
  "http://localhost:4000",
  "http://127.0.0.1:4001",
  "http://localhost:4001",
];

function corsHeaders(origin) {
  const allow = CORS_ORIGINS.includes(origin) ? origin : CORS_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data, origin, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin),
      ...extra,
    },
  });
}

function clientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    (request.headers.get("X-Forwarded-For") || "").split(",")[0].trim() ||
    "unknown"
  );
}

function clip(value, n) {
  return String(value || "").slice(0, n);
}

async function readPayload(request) {
  const text = await request.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function isAdmin(request, env) {
  const header = request.headers.get("Authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "");
  return Boolean(env.ADMIN_TOKEN) && token === env.ADMIN_TOKEN;
}

async function recordHit(request, env) {
  const ip = clientIp(request);
  const hourKey = `r:${ip}:${Math.floor(Date.now() / 3600000)}`;
  const count = parseInt((await env.VISITS.get(hourKey)) || "0", 10);
  if (count >= HOUR_LIMIT) return;

  const body = await readPayload(request);
  const rec = {
    t: new Date().toISOString(),
    ip,
    country: request.cf?.country || "",
    city: request.cf?.city || "",
    path: clip(body.path, 200),
    ref: clip(body.ref, 300),
    lang: clip(body.lang, 32),
    ua: clip(request.headers.get("User-Agent"), 300),
  };

  const id = `v:${Date.now()}:${crypto.randomUUID()}`;
  await Promise.all([
    env.VISITS.put(id, JSON.stringify(rec), { expirationTtl: 60 * 60 * 24 * 90 }),
    env.VISITS.put(hourKey, String(count + 1), { expirationTtl: 3600 }),
  ]);
}

async function listLogs(env) {
  const rows = [];
  let cursor;
  do {
    const page = await env.VISITS.list({ prefix: "v:", limit: 1000, cursor });
    const batch = await Promise.all(
      page.keys.map(async (key) => {
        const raw = await env.VISITS.get(key.name);
        if (!raw) return null;
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      })
    );
    for (const row of batch) {
      if (row) rows.push(row);
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor && rows.length < MAX_LOGS);

  rows.sort((a, b) => String(b.t).localeCompare(String(a.t)));
  return rows.slice(0, MAX_LOGS);
}

function adminPage() {
  return `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Visitor log</title>
<style>
  body { font: 14px/1.45 system-ui, sans-serif; margin: 24px; color: #222; }
  input { font: inherit; padding: 6px 8px; }
  button { font: inherit; padding: 6px 12px; }
  table { border-collapse: collapse; width: 100%; margin-top: 16px; }
  th, td { border-bottom: 1px solid #ddd; text-align: left; padding: 6px 8px; vertical-align: top; }
  th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: #555; }
  .muted { color: #666; }
  .ip { font-family: ui-monospace, monospace; }
</style>
<h1>Visitor log</h1>
<p class="muted">IPs are stored on this Worker only (90 days). They are not written to GitHub Pages.</p>
<form id="login">
  <input type="password" id="token" placeholder="ADMIN_TOKEN" autocomplete="current-password">
  <button type="submit">Load</button>
</form>
<p id="status" class="muted"></p>
<table hidden id="table">
  <thead><tr><th>Time (UTC)</th><th>IP</th><th>Geo</th><th>Path</th><th>Referrer</th><th>UA</th></tr></thead>
  <tbody></tbody>
</table>
<script>
const status = document.getElementById("status");
const table = document.getElementById("table");
const body = table.querySelector("tbody");
const saved = sessionStorage.getItem("adminToken") || "";
if (saved) document.getElementById("token").value = saved;

document.getElementById("login").addEventListener("submit", async (event) => {
  event.preventDefault();
  const token = document.getElementById("token").value.trim();
  status.textContent = "Loading…";
  const res = await fetch("/logs", { headers: { Authorization: "Bearer " + token } });
  if (!res.ok) {
    status.textContent = "Unauthorized or Worker error (" + res.status + ").";
    table.hidden = true;
    return;
  }
  sessionStorage.setItem("adminToken", token);
  const data = await res.json();
  function cell(text, className) {
    const td = document.createElement("td");
    if (className) td.className = className;
    td.textContent = text || "";
    return td;
  }
  body.replaceChildren();
  for (const row of data.visits || []) {
    const tr = document.createElement("tr");
    const geo = [row.country, row.city].filter(Boolean).join(" / ");
    tr.append(
      cell(row.t),
      cell(row.ip, "ip"),
      cell(geo),
      cell(row.path),
      cell(row.ref),
      cell(row.ua)
    );
    body.appendChild(tr);
  }
  table.hidden = false;
  status.textContent = (data.visits || []).length + " records.";
});
</script>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === "/hit" && request.method === "POST") {
      try {
        await recordHit(request, env);
      } catch (err) {
        return json({ ok: false }, origin, 500);
      }
      return json({ ok: true }, origin);
    }

    if (url.pathname === "/logs" && request.method === "GET") {
      if (!isAdmin(request, env)) {
        return json({ error: "unauthorized" }, origin, 401);
      }
      const visits = await listLogs(env);
      return json({ visits }, origin, 200, { "Cache-Control": "no-store" });
    }

    if (url.pathname === "/" || url.pathname === "/admin") {
      return new Response(adminPage(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Robots-Tag": "noindex",
        },
      });
    }

    return new Response("not found", { status: 404 });
  },
};
