# Visitor IP log

GitHub Pages is static: the Pages server never sees visitor IPs. Pick one of the options below. Do not paste IPs into this repo.

Hong Kong PDPO: IP addresses can be personal data. The footer links to `/privacy/`.

## Option A — Statcounter (no server, free)

This is the path if you do not want to run or deploy anything yourself.

1. Sign up at [statcounter.com](https://statcounter.com/) (Basic plan, no credit card).
2. Add a project for `https://chloceg.github.io`.
3. Open **Config → Reinstall Code** and copy **Project ID** and **Security Code**.
4. Put them in `_config.yml`:

```yaml
statcounter_project: 12345678
statcounter_security: "yoursecuritycode"
```

5. Commit, push, wait for Pages to rebuild.
6. Open Statcounter → **Visitor Activity**. Each row includes IP, location, ISP, page, and referrer.

Invisible tracker (`sc_invisible=1`): no public badge. Sidebar Vercount stays for counts.

Limits on the free Basic plan (as of 2026): about 5,000 sessions / month and 14 days of visitor-activity retention. IP data lives on Statcounter's servers, not yours.

## Option B — Cloudflare Worker (IPs stay on your KV)

Use this if you do not want a third-party analytics company to store IPs. You can paste the Worker in the [Cloudflare dashboard](https://dash.cloudflare.com/) (Workers & Pages → Create → paste `src/worker.js`) and bind a KV namespace named `VISITS`. No process runs on your laptop after that. CLI equivalent:

```bash
cd visitor-log
npx wrangler login
npx wrangler kv namespace create VISITS
# paste the id into wrangler.toml
npx wrangler secret put ADMIN_TOKEN
npx wrangler deploy
```

Then set `_config.yml`:

```yaml
visitor_log_url: "https://chloceg-visitor-log.<account>.workers.dev"
```

Open the Worker root URL, enter `ADMIN_TOKEN`, and load the table. Retention: 90 days.

## Local check of the Worker only

```bash
node --test visitor-log/test.mjs
node visitor-log/dev-server.mjs   # http://127.0.0.1:8787  token=dev-token
```

Point `visitor_log_url` at that URL only on your machine. Do not commit it.
