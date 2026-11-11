import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "./src/worker.js";

function memoryKv() {
  const store = new Map();
  return {
    async get(key) {
      return store.has(key) ? store.get(key) : null;
    },
    async put(key, value) {
      store.set(key, value);
    },
    async list({ prefix = "", cursor, limit = 1000 } = {}) {
      const keys = [...store.keys()]
        .filter((name) => name.startsWith(prefix))
        .sort()
        .map((name) => ({ name }));
      const start = cursor ? parseInt(cursor, 10) : 0;
      const slice = keys.slice(start, start + limit);
      const next = start + slice.length;
      return {
        keys: slice,
        list_complete: next >= keys.length,
        cursor: next >= keys.length ? undefined : String(next),
      };
    },
  };
}

function env() {
  return { VISITS: memoryKv(), ADMIN_TOKEN: "secret" };
}

function hit(env, { ip = "203.0.113.9", origin = "https://chloceg.github.io", body = {} } = {}) {
  return worker.fetch(
    new Request("https://log.example/hit", {
      method: "POST",
      headers: {
        "CF-Connecting-IP": ip,
        Origin: origin,
        "User-Agent": "cv-test",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify(body),
    }),
    env
  );
}

test("records CF-Connecting-IP and ignores spoofed body.ip", async () => {
  const e = env();
  const res = await hit(e, {
    body: { ip: "1.2.3.4", path: "/#experience", ref: "https://example.com" },
  });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), "https://chloceg.github.io");

  const logs = await worker.fetch(
    new Request("https://log.example/logs", {
      headers: { Authorization: "Bearer secret" },
    }),
    e
  );
  assert.equal(logs.status, 200);
  const data = await logs.json();
  assert.equal(data.visits.length, 1);
  assert.equal(data.visits[0].ip, "203.0.113.9");
  assert.equal(data.visits[0].path, "/#experience");
});

test("rejects logs without the admin token", async () => {
  const e = env();
  const res = await worker.fetch(new Request("https://log.example/logs"), e);
  assert.equal(res.status, 401);
});

test("rate-limits the same IP within an hour", async () => {
  const e = env();
  for (let i = 0; i < 60; i += 1) {
    const res = await hit(e, { ip: "198.51.100.10" });
    assert.equal(res.status, 200);
  }
  await hit(e, { ip: "198.51.100.10", body: { path: "/dropped" } });
  const logs = await worker.fetch(
    new Request("https://log.example/logs", {
      headers: { Authorization: "Bearer secret" },
    }),
    e
  );
  const data = await logs.json();
  assert.equal(data.visits.length, 60);
  assert.equal(
    data.visits.some((row) => row.path === "/dropped"),
    false
  );
});

test("does not accept the admin token in the query string", async () => {
  const e = env();
  const res = await worker.fetch(new Request("https://log.example/logs?token=secret"), e);
  assert.equal(res.status, 401);
});

test("serves an admin page without leaking the token", async () => {
  const res = await worker.fetch(new Request("https://log.example/"), env());
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Visitor log/);
  assert.doesNotMatch(html, /secret/);
});
