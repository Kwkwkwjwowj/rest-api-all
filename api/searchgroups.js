const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

async function cariGC(q) {
    try {
        const { data } = await axios.get(`https://groupsor.link/group/searchmore/${q.replace(/\s+/g, '-')}`, {
            timeout: 30000
        });

        const $ = cheerio.load(data);
        const result = [];

        $('.maindiv').each((i, el) => {
            result.push({
                title: $(el).find('img').attr('alt')?.trim(),
                thumb: $(el).find('img').attr("src")?.trim(),
                link: ''
            });
        });

        $('div.post-info-rate-share > .joinbtn').each((i, el) => {
            if (result[i]) {
                result[i].link = $(el).find('a').attr("href")?.trim().replace('https://groupsor.link/group/join/', 'https://chat.whatsapp.com/');
            }
        });

        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
}

router.get('/', async (req, res) => {
    const q = req.query.q;
    if (!q) {
        return res.status(400).json({
            status: 400,
            creator: 'OwnBlox',
            error: 'Masukkan kata kunci grup!'
        });
    }

    const result = await cariGC(q);

    if (result.length === 0) {
        return res.status(404).json({
            status: 404,
            creator: 'OwnBlox',
            error: 'Grup tidak ditemukan atau gagal.'
        });
    }

    res.json({
        status: 200,
        creator: 'OwnBlox',
        result
    });
});

module.exports = router;