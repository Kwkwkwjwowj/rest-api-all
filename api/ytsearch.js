const express = require('express');
const ytSearch = require('yt-search');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ status: 400, message: 'Masukkan query pencarian.' });

    try {
        const search = await ytSearch(query);
        const results = search.videos.slice(0, 5).map(video => ({
            title: video.title,
            author: video.author.name,
            thumbnail: video.thumbnail,
            url: video.url,
            duration: video.timestamp,
            views: video.views
        }));

        res.json({ status: 200, result: results });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Terjadi kesalahan.' });
    }
});

module.exports = router;