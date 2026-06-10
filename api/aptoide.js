const express = require('express');
const router = express.Router();
const { search } = require('aptoide-api');

router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ status: false, message: 'Silakan tambahkan parameter ?q=' });
  }

  try {
    const results = await search(query, 1);
    if (!results.length) {
      return res.status(404).json({ status: false, message: 'APK tidak ditemukan' });
    }

    const app = results[0];
    const { name, id: packageName, icon, downloadUrl } = app;

    return res.json({
      status: true,
      name,
      package: packageName,
      icon,
      download_url: downloadUrl
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message || error });
  }
});

module.exports = router;