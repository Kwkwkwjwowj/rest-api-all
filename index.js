const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const { loadApiRoutes } = require("./lib/routeLoader");

const app = express();
const apiDir = path.join(__dirname, "api");
const publicDir = path.join(__dirname, "public");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Terlalu banyak permintaan, coba lagi nanti." },
  keyGenerator: (req) => req.headers["x-forwarded-for"]?.split(",")[0] || req.ip,
  standardHeaders: true,
  legacyHeaders: false
});

app.set("trust proxy", 1);
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

const apiManifest = loadApiRoutes(apiDir)
  .filter((item) => item.loaded);

apiManifest.forEach(({ name }) => {
  app.use(`/api/${name}`, limiter, require(path.join(apiDir, `${name}.js`)));
});

app.get("/api", (req, res) => {
  res.json({
    status: true,
    service: "rest-api-all",
    total: apiManifest.length,
    routes: apiManifest.map(({ name, path: routePath }) => ({
      name,
      path: routePath,
      method: "GET"
    })),
    documentation: "/docs"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: true,
    message: "API is running",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(publicDir, "documentation.html"));
});

app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: true,
    message: "Endpoint API tidak ditemukan",
    documentation: "/docs"
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, "404.html"));
});

module.exports = app;
