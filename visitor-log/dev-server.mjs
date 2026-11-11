import http from "node:http";
import worker from "./src/worker.js";

const store = new Map();
const env = {
  ADMIN_TOKEN: process.env.ADMIN_TOKEN || "dev-token",
  VISITS: {
    async get(key) {
      return store.has(key) ? store.get(key) : null;
    },
    async put(key, value) {
      store.set(key, value);
    },
    async list({ prefix = "" } = {}) {
      return {
        keys: [...store.keys()].filter((name) => name.startsWith(prefix)).map((name) => ({ name })),
        list_complete: true,
      };
    },
  },
};

const port = Number(process.env.PORT || 8787);
const server = http.createServer(async (req, res) => {
  const url = `http://127.0.0.1:${port}${req.url}`;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const method = req.method || "GET";
  const headers = { ...req.headers };
  if (!headers["cf-connecting-ip"]) {
    const remote = req.socket?.remoteAddress || "";
    headers["cf-connecting-ip"] = remote.replace(/^::ffff:/, "") || "unknown";
  }
  const body = ["GET", "HEAD"].includes(method) ? undefined : Buffer.concat(chunks);
  const request = new Request(url, { method, headers, body });
  const response = await worker.fetch(request, env);
  const out = Buffer.from(await response.arrayBuffer());
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(out);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`visitor-log dev server http://127.0.0.1:${port} token=${env.ADMIN_TOKEN}`);
});
