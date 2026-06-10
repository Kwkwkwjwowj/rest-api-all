const express = require('express');
const router = express.Router();
const khodamList = require('./cekkhodamarray');

router.get('/', async (req, res) => {
    const nama = req.query.nama;
    if (!nama) return res.status(400).json({ status: 400, message: 'Masukkan parameter nama.' });

    const random = khodamList[Math.floor(Math.random() * khodamList.length)];
    const hasil = `Khodam ${nama} adalah ${random}`;

    res.json({ status: 200, result: hasil });
});

module.exports = router;