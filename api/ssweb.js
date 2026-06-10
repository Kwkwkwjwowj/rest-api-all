const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status: 400,
            error: 'Masukkan URL yang ingin di screenshot!'
        });
    }

    try {
        const encodedUrl = encodeURIComponent(url);
        const screenshotUrl = `https://api.pikwy.com/?tkn=125&d=3000&u=${encodedUrl}&fs=0&w=841&h=1200&s=100&f=jpg&trj=web`;

        const response = await axios.get(screenshotUrl, {
            responseType: 'arraybuffer',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        if (response.status === 200) {
            res.set('Content-Type', 'image/jpeg');
            res.send(response.data);
        } else {
            res.status(500).json({
                status: 500,
                error: 'Gagal mengambil screenshot.'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: 'Terjadi kesalahan, coba lagi nanti!'
        });
    }
});

module.exports = router;
