const http = require("http");
const next = require("next");
const express = require("express");
const compression = require("compression");
const path = require('path')

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const ServiceWorker = appServer => (req, res) => {
  const filePath = path.join(__dirname, '.next', 'service-worker.js');
  appServer.serveStatic(req, res, filePath);
};

// Start the server
app.prepare().then(() => {
  const server = express();
  server.disable("x-powered-by");
  server.use(compression());
  server.get('/service-worker.js', ServiceWorker(app));
  server.get(/(.+)\/$/, (req, res) =>
    res.redirect(301, req.url.replace(/\/$/, ""))
  );
  server.get("*", handle);
  const httpServer = http.createServer(server);
  httpServer.listen(port, err => {
    if (err) throw err;
    console.log(`Ready in port ${port}`)
  });
});
