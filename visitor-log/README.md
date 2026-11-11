# Visitor IP log

GitHub Pages is static: the Pages server never sees visitor IPs. This Cloudflare Worker records them on the edge (`CF-Connecting-IP`) and keeps them **off** the public repo.

Retention: 90 days. Admin UI is on the Worker, not on `chloceg.github.io`.

Hong Kong PDPO: IP addresses can be personal data. The site footer links to `/privacy/` once this is enabled.

## Deploy

1. Install Wrangler and log in:

```bash
cd visitor-log
npx wrangler login
npx wrangler kv namespace create VISITS
```

2. Put the printed KV `id` into `wrangler.toml` (`REPLACE_WITH_KV_NAMESPACE_ID`).

3. Set a viewing password (do not commit it):

```bash
npx wrangler secret put ADMIN_TOKEN
npx wrangler deploy
```

4. Copy the `*.workers.dev` URL into `_config.yml`:

```yaml
visitor_log_url: "https://chloceg-visitor-log.<account>.workers.dev"
```

5. Commit and push `_config.yml` so the homepage starts sending beacons.

Open the Worker root URL, enter `ADMIN_TOKEN`, and load the table. IPs never appear on the GitHub Pages site.

## Local check (no Cloudflare account)

```bash
node --test visitor-log/test.mjs
node visitor-log/dev-server.mjs   # http://127.0.0.1:8787  token=dev-token
```

Point `_config.yml` `visitor_log_url` at that URL only on your machine. Do not commit a live Worker URL until you have deployed one.
