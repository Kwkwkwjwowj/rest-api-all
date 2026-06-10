const express = require('express');
const axios = require('axios');

const router = express.Router();

const warnaMap = {
    putih: '#ffffff',
    hitam: '#000000',
    merah: '#ff0000',
    biru: '#0000ff',
    hijau: '#00ff00',
    kuning: '#ffff00',
    ungu: '#800080',
    oranye: '#ffa500',
    pink: '#ffc0cb',
    abu: '#808080',
    emas: '#ffd700',
    perak: '#c0c0c0',
    coklat: '#8b4513',
    biru_tua: '#00008b',
    biru_muda: '#add8e6',
    hijau_tua: '#006400',
    hijau_muda: '#90ee90',
    merah_muda: '#ff7f7f',
    merah_tua: '#8b0000',
    ungu_muda: '#dda0dd',
    ungu_tua: '#4b0082',
    jingga: '#ffa500',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    navy: '#000080',
    teal: '#008080',
    olive: '#808000',
    coral: '#ff7f50',
    lavender: '#e6e6fa',
    salmon: '#fa8072'
};

router.get('/', async (req, res) => {
    const { text, name = 'Anonymous', color = 'putih', profile } = req.query;

    if (!text) return res.status(400).send({ status: false, message: 'Text tidak boleh kosong!' });

    const bgColor = warnaMap[color.toLowerCase()] || (color.startsWith('#') ? color : '#ffffff');
    const profilePic = profile || 'https://telegra.ph/file/320b066dc81928b782c7b.png';

    try {
        const payload = {
            type: "quote",
            format: "png",
            backgroundColor: bgColor,
            width: 512,
            height: 768,
            scale: 2,
            messages: [
                {
                    entities: [],
                    avatar: true,
                    from: {
                        id: 1,
                        name: name,
                        photo: { url: profilePic }
                    },
                    text: text
                }
            ]
        };

        const quoteRes = await axios.post('https://bot.lyo.su/quote/generate', payload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const buffer = Buffer.from(quoteRes.data.result.image, 'base64');

        res.set('Content-Type', 'image/png');
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: false, message: 'Gagal membuat quote.' });
    }
});

module.exports = router;