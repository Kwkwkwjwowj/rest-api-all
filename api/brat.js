const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ status: 400, message: 'Masukkan parameter text.' });

    try {
        const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`, {
            responseType: 'arraybuffer'
        });

        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan saat mengambil gambar.',
            error: err.message
        });
    }
});

module.exports = router;