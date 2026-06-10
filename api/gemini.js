const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyDdfNNmvphdPdHSbIvpO5UkHdzBwx7NVm0');

router.get('/', async (req, res) => {
    try {
        const { text } = req.query;

        if (!text) {
            return res.status(400).json({ 
                error: "Parameter text diperlukan",
                contoh: {
                    url: "/gemini?text=Apa itu kecerdasan buatan?"
                }
            });
        }

        const prompt = `${text.trim()}\n\nBalas dalam Bahasa Indonesia dan gunakan emoji agar lebih ekspresif. 😊🔥`;
        
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const response = await model.generateContent([prompt]);

        let replyText = "Maaf, AI tidak memberikan jawaban.";
        
        if (response?.response?.candidates?.length) {
            replyText = response.response.candidates[0].content.parts.map(part => part.text.trim()).join("\n") || replyText;
        }

        res.json({ 
            sukses: true,
            jawaban: replyText 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            sukses: false,
            error: error.message 
        });
    }
});

module.exports = router;