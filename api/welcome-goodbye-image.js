const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { name, profile, welcome } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Parameter name dan profile wajib diisi.' });
  }

  try {
    const finalProfile = profile || "";
    const response = await axios.post('https://lemon-welcome.vercel.app/api/generate-image', {
      name,
      image: finalProfile,
      welcome: welcome === 'true'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://lemon-welcome.vercel.app'
      },
      responseType: 'arraybuffer'
    });

    const buffer = Buffer.from(response.data);
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'Gagal membuat gambar.' });
  }
});

module.exports = router;
