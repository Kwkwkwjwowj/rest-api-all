const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    const prompt = req.query.prompt;
    let style = req.query.style || 'realistic';
    const deviceId = `dev-${Math.floor(Math.random() * 1000000)}`;

    if (!prompt) {
        return res.status(400).json({
            status: 400,
            error: 'Masukkan prompt!'
        });
    }

    try {
        const response = await axios.post('https://api-preview.chatgot.io/api/v1/deepimg/flux-1-dev', {
            prompt: prompt,
            size: "1024x1024",
            style: style,
            device_id: deviceId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://deepimg.ai',
                'Referer': 'https://deepimg.ai/'
            }
        });

        const data = response.data;
        if (data?.data?.images?.length > 0) {
            const imageUrl = data.data.images[0].url;
            res.json({
                status: 200,
                url: imageUrl
            });
        } else {
            res.status(500).json({
                status: 500,
                error: 'Gagal generate gambar.'
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
