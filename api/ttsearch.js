const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ status: 400, message: 'Masukkan query pencarian!' });

  try {
    const response = await axios({
      method: 'POST',
      url: 'https://tikwm.com/api/feed/search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'current_language=en',
        'User-Agent': 'Mozilla/5.0'
      },
      data: { keywords: query, count: 50, cursor: 0, HD: 1 }
    });

    const videos = response.data.data.videos;
    if (!videos || videos.length === 0) {
      return res.status(404).json({ status: 404, message: 'Video tidak ditemukan.' });
    }

    const randomVideo = videos[Math.floor(Math.random() * videos.length)];
    res.json({
      status: 200,
      title: randomVideo.title,
      video_url: randomVideo.play
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Terjadi kesalahan.' });
  }
});

module.exports = router;