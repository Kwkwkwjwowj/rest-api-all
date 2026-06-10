const express = require('express');
const router = express.Router();
const facts = require('./tahukahkamuarray');

router.get('/', async (req, res) => {
    try {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        res.json({ status: 200, result: randomFact });
    } catch (err) {
        res.status(500).json({ status: 500, message: 'Terjadi kesalahan.' });
    }
});

module.exports = router;