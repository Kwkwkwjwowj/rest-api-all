const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://backend.lambdatest.com/api/dev-tools/credit-card-generator';
const VALID_TYPES = ['American Express', 'MasterCard', 'Visa', 'JCB'];

router.get('/', async (req, res) => {
    let { type, count } = req.query;

    if (!VALID_TYPES.includes(type)) {
        return res.status(400).json({ error: 'Tipe kartu tidak valid. Pilih: American Express, MasterCard, Visa, JCB' });
    }

    count = parseInt(count) || 1;
    if (count > 5) count = 5;

    try {
        const response = await axios.get(`${BASE_URL}?type=${encodeURIComponent(type)}&no-of-cards=${count}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil data dari API' });
    }
});

module.exports = router;