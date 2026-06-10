const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Silakan masukkan URL Pastebin yang ingin dibaca.');
  }
  if (!url.includes('pastebin.com')) {
    return res.status(400).send('URL tidak valid! Pastikan URL berasal dari Pastebin.');
  }

  try {
    const rawUrl = url.replace('pastebin.com/', 'pastebin.com/raw/');
    const response = await axios.get(rawUrl);

    if (!response.data) {
      return res.status(404).send('Tidak ada konten yang ditemukan. URL mungkin kosong atau tidak valid.');
    }

    res.type('text/plain').send(response.data);
  } catch (error) {
    console.error('Error in getpastebin:', error.message);
    res.status(500).send(`Terjadi kesalahan saat mengambil teks. Error: ${error.message}`);
  }
});

module.exports = router;