const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ status: 400, message: 'Parameter q diperlukan.' });

  try {
    const { data: html } = await axios.get(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'id-ID,id;q=0.9',
      }
    });

    const $ = cheerio.load(html);
    const results = [];

    $('.result__title').each((_, el) => {
      const title = $(el).text().trim();
      const link = $(el).find('a').attr('href');
      if (title && link) results.push({ title, link });
    });

    res.json({ status: 200, results });
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Gagal mengambil data.', error: err.message });
  }
});

module.exports = router;