const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ status: false, message: 'Query tidak boleh kosong' });

  try {
    const access_token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const result = response.data.tracks.items.map(track => ({
      title: track.name,
      artists: track.artists.map(a => a.name).join(', '),
      duration_ms: track.duration_ms,
      link: track.external_urls.spotify,
      image: track.album.images[0]?.url
    }));

    res.json({ status: true, result });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal mencari lagu', error: err.message });
  }
});

async function getAccessToken() {
  const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
}

module.exports = router;