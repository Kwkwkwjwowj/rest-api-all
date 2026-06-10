const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', async (req, res) => {
  const url = 'https://news.detik.com/';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const $ = cheerio.load(data);
    let beritaList = [];

    $('.list-content__item').each((index, element) => {
      let title = $(element).find('.media__title a').text().trim();
      let link = $(element).find('.media__title a').attr('href');
      if (title && link) beritaList.push({ title, link });
    });

    res.json({
      status: true,
      source: url,
      result: beritaList.slice(10, 20)
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Gagal mengambil berita.' });
  }
});

module.exports = router;