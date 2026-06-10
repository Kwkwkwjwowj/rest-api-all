const express = require('express');
const axios = require('axios');

const router = express.Router();
const apiKey = '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';
const model = 'llama-3.3-70b-versatile';

async function callGroq(content) {
    const url = 'https://api.groq.com/openai/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const body = {
        model,
        messages: [{ role: 'user', content }]
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data.choices?.[0]?.message?.content || 'No response';
    } catch (error) {
        console.error('Error fetching Groq API:', error.response?.data || error.message);
        return 'Error fetching response';
    }
}

router.get('/', async (req, res) => {
    const { content } = req.query;

    if (!content) {
        return res.status(400).json({ status: 400, error: 'Parameter "content" tidak boleh kosong' });
    }

    const response = await callGroq(content);
    res.json({ status: 200, model, response });
});

module.exports = router;
