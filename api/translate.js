const express = require('express')
const router = express.Router()
const translate = require('@vitalets/google-translate-api')

router.get('/', async (req, res) => {
    const { text, to } = req.query
    if (!text || !to) return res.status(400).json({ status: false, message: 'Masukkan parameter text & to' })

    try {
        const result = await translate(text, { to })
        res.json({
            status: 200,
            original_text: text,
            translated_text: result.text,
            lang_from: result.from.language.iso,
            lang_to: to
        })
    } catch (err) {
        res.status(500).json({ status: false, message: 'Terjadi kesalahan saat translate', error: err.message })
    }
})

module.exports = router