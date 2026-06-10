const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

let lastMemes = [];

router.get('/', async (req, res) => {
    try {
        const count = req.query.count ? parseInt(req.query.count) : 5;
        const memeCount = Math.min(Math.max(count, 5), 10);
        
        const memes = await getRandomMemes(memeCount);
        if (!memes || memes.length === 0) {
            return res.status(404).json({ message: 'Meme tidak ditemukan!' });
        }

        res.json(memes.map(meme => ({
            title: meme.title,
            imgUrl: meme.imgUrl
        })));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Gagal mengambil meme.' });
    }
});

module.exports = router;

async function getLatestMemes() {
    try {
        const { data } = await axios.get("https://1cak.com", {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://1cak.com/',
            }
        });

        const $ = cheerio.load(data);
        const memes = [];

        $("div[id^='posts']").each((i, el) => {
            const imgEl = $(el).find("div[id^='img_container'] img");
            const titleEl = $(el).find("h3");

            let imgUrl = imgEl.attr('src');
            const title = titleEl.text().trim();

            if (imgUrl) {
                if (!imgUrl.startsWith("http")) {
                    imgUrl = "https://1cak.com" + imgUrl;
                }
                memes.push({ title, imgUrl });
            }
        });

        return memes;
    } catch (error) {
        console.error('Error fetching memes:', error);
        return [];
    }
}

async function getRandomMemes(count) {
    const allMemes = await getLatestMemes();
    if (allMemes.length === 0) return [];

    shuffleArray(allMemes);
    
    let availableMemes = allMemes.filter(meme => !lastMemes.includes(meme.imgUrl));
    
    if (availableMemes.length < count) {
        availableMemes = allMemes;
    }
    
    const selectedCount = Math.min(count, availableMemes.length);
    const selectedMemes = availableMemes.slice(0, selectedCount);
    
    lastMemes = selectedMemes.map(meme => meme.imgUrl);
    if (lastMemes.length > 20) {
        lastMemes = lastMemes.slice(-20);
    }
    
    return selectedMemes;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}