const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({
            status: 400,
            error: 'Parameter "q" diperlukan, contoh: ?q=axios'
        });

        const { data } = await axios.get(`https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(query)}`);
        const { objects } = data;

        if (!objects.length) return res.status(404).json({
            status: 404,
            error: `Paket "${query}" tidak ditemukan.`
        });

        const result = objects.map(({ package: pkg }) => ({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
            link: pkg.links.npm
        }));

        res.status(200).json({
            status: 200,
            results: result
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message
        });
    }
});

module.exports = router;