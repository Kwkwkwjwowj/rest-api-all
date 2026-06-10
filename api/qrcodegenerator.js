const express = require("express");
const QRCode = require("qrcode");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { text } = req.query;
        if (!text) {
            return res.status(400).json({ status: 400, message: "Masukkan teks dalam query, contoh: /api/qrcode?text=HelloWorld" });
        }

        res.setHeader("Content-Type", "image/png");
        QRCode.toFileStream(res, text);
    } catch (error) {
        res.status(500).json({ status: 500, message: "Terjadi kesalahan." });
    }
});

module.exports = router;