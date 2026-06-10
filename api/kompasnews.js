const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

async function getKompasNews() {
    try {
        const { data } = await axios.get("https://www.kompas.com/");
        const $ = cheerio.load(data);
        let berita = [];

        $(".headline__big__link, .article__title a").each((i, el) => {
            const title = $(el).text().trim();
            const link = $(el).attr("href");
            if (title && link) berita.push({ title, link });
        });

        return berita.slice(0, 15);
    } catch (error) {
        return [];
    }
}

router.get("/", async (req, res) => {
    try {
        const news = await getKompasNews();
        if (news.length === 0) throw new Error("Gagal mengambil berita.");

        res.json({ status: 200, result: news });
    } catch (err) {
        res.status(500).json({ status: 500, message: "Terjadi kesalahan." });
    }
});

module.exports = router;