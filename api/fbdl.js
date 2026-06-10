const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status: 400,
            creator: 'OwnBlox',
            error: 'Masukkan URL Facebook!'
        });
    }

    try {
        const { data } = await axios.post(
            'https://facebook-video-downloader.fly.dev/app/main.php',
            new URLSearchParams({ url }).toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        if (!data.links || !data.links["Download High Quality"]) {
            return res.status(500).json({
                status: 500,
                creator: "OwnBlox",
                error: "Gagal mendapatkan link video."
            });
        }

        res.json({
            status: 200,
            creator: "OwnBlox",
            source: url,
            download_link: data.links["Download High Quality"]
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({
            status: 500,
            creator: 'OwnBlox',
            error: 'Terjadi kesalahan, coba lagi nanti!'
        });
    }
});

module.exports = router;