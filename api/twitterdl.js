const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

router.get('/', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({
            status: 400,
            error: 'Masukkan URL Twitter!'
        });
    }

    try {
        const apiUrl = 'https://x2twitter.com/api/ajaxSearch';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10)'
        };

        const formData = new URLSearchParams();
        formData.append('q', url);

        const response = await axios.post(apiUrl, formData, { headers });
        const $ = cheerio.load(response.data.data);
        let links = [];

        $('.tw-button-dl').each((i, el) => {
            const link = $(el).attr('href');
            const quality = $(el).text().trim();
            if (link && link.startsWith('http')) {
                if (quality.includes('720p') || quality.includes('360p')) {
                    links.push(link);
                }
            }
        });

        if (links.length === 0) {
            return res.status(500).json({
                status: 500,
                error: "Gagal mendapatkan link video."
            });
        }

        res.json({
            status: 200,
            source: url,
            download_link: links
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({
            status: 500,
            error: 'Terjadi kesalahan, coba lagi nanti!'
        });
    }
});

module.exports = router;