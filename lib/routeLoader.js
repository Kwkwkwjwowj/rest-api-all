const fs = require('fs');
const path = require('path');

function isExpressRouter(mod) {
  return Boolean(mod) &&
    typeof mod === 'function' &&
    typeof mod.use === 'function' &&
    typeof mod.handle === 'function';
}

function shouldLoadFile(fileName) {
  if (!fileName.endsWith('.js')) return false;
  if (fileName.startsWith('_')) return false;
  if (fileName.endsWith('array.js')) return false;
  return true;
}

function loadApiRoutes(apiDir) {
  const manifest = [];
  const files = fs.readdirSync(apiDir)
    .filter(shouldLoadFile)
    .sort((a, b) => a.localeCompare(b));

  for (const file of files) {
    const routeName = path.basename(file, '.js');
    const filePath = path.join(apiDir, file);

    try {
      const mod = require(filePath);

      if (!isExpressRouter(mod)) {
        manifest.push({
          name: routeName,
          path: `/api/${routeName}`,
          loaded: false,
          reason: 'Module is not an Express router'
        });
        continue;
      }

      manifest.push({
        name: routeName,
        path: `/api/${routeName}`,
        loaded: true
      });
    } catch (error) {
      manifest.push({
        name: routeName,
        path: `/api/${routeName}`,
        loaded: false,
        reason: error.message
      });
    }
  }

  return manifest;
}

module.exports = {
  loadApiRoutes
};
