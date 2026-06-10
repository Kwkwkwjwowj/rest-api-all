const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({
                status: false,
                code: 400,
                creator: "OwnBlox",
                message: "Masukkan username GitHub!"
            });
        }

        const url = `https://github.com/${username}`;
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });

        const $ = cheerio.load(data);
        if ($('title').text().includes("Page not found")) {
            return res.status(404).json({
                status: false,
                code: 404,
                creator: "OwnBlox",
                message: `Akun *${username}* tidak ditemukan.`
            });
        }

        let name = $('span.p-name').text().trim() || username;
        let followers = $('a[href$="followers"] span.text-bold').text().trim() || '0';
        let following = $('a[href$="following"] span.text-bold').text().trim() || '0';
        let repo = $('a[href$="?tab=repositories"] span.Counter').text().trim() || '0';
        let avatar = ($('img.avatar-user').attr('src') || '') + '?size=400';

        res.status(200).json({
            status: true,
            code: 200,
            creator: "OwnBlox",
            data: {
                name,
                username,
                followers,
                following,
                repository: repo,
                avatar,
                profile_url: url
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            code: 500,
            creator: "OwnBlox",
            message: "Terjadi kesalahan saat mengambil data.",
            error: error.message
        });
    }
});

module.exports = router;