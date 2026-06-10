const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const { emoji1, emoji2 } = req.query;

    if (!emoji1 || !emoji2) {
        return res.status(400).send('emoji1 dan emoji2 harus diisi');
    }

    try {
        const apiUrl = `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.results || data.results.length === 0) {
            return res.status(404).send('Kombinasi emoji tidak ditemukan');
        }

        const imageUrl = data.results[0].url;
        const imageRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        res.set('Content-Type', 'image/png');
        res.send(imageRes.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Gagal mengambil gambar emoji');
    }
});

module.exports = router;