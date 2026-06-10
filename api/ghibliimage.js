const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) return res.status(400).send('Query parameter "prompt" is required');

    try {
        const imageBuffer = await text2ghibli(prompt);
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        res.status(500).send('Failed to generate image: ' + (error.message || 'unknown error'));
    }
});

async function text2ghibli(prompt) {
    const styleList = ['Spirited Away', 'Totoro', 'Princess Mononoke', "Howl's Castle"];
    if (!prompt) throw new Error('Prompt is required');

    const style = styleList[Math.floor(Math.random() * styleList.length)];

    const { data } = await axios.post('https://ghibliimagegenerator.net/api/generate-image', {
        prompt,
        style
    }, {
        headers: {
            'content-type': 'application/json',
            referer: 'https://ghibliimagegenerator.net/generator',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36'
        }
    });

    const base64Data = data.imageData.split(',')[1];
    return Buffer.from(base64Data, 'base64');
}

module.exports = router;