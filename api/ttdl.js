const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url || !(url.includes('http://') || url.includes('https://')) || !url.includes('tiktok.com')) {
    return res.status(400).json({ status: false, error: 'URL TikTok tidak valid.' });
  }

  try {
    const response = await axios.post('https://www.tikwm.com/api/', {}, {
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.tikwm.com',
        'Referer': 'https://www.tikwm.com/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest'
      },
      params: {
        url: url,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1
      }
    });

    const data = response.data.data;

    res.json({
      status: true,
      result: {
        video: 'https://www.tikwm.com' + (data.hdplay || data.play || data.wmplay),
        audio: data.music ? 'https://www.tikwm.com' + data.music : (data.music_info.play ? 'https://www.tikwm.com' + data.music_info.play : null),
        title: data.title,
        author: data.author.nickname
      }
    });

  } catch (error) {
    res.status(500).json({ status: false, error: 'Gagal memproses permintaan.' });
  }
});

module.exports = router;