const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    let { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Masukkan URL repository. Contoh: /gitclone?url=https://github.com/Takashi-Kemii/Kiku' });
    }

    let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    if (!regex.test(url)) {
        return res.status(400).json({ error: 'Link tidak valid!' });
    }

    try {
        let [, user, repo] = url.match(regex);
        repo = repo.replace(/.git$/, '');
        let apiUrl = `https://api.github.com/repos/${user}/${repo}/zipball`;

        let response = await axios.head(apiUrl);
        let contentDisposition = response.headers['content-disposition'];
        let filename = contentDisposition.match(/attachment; filename=(.*)/)[1];

        res.json({
            success: true,
            repository: `${user}/${repo}`,
            download_url: apiUrl,
            filename: filename
        });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil repository.', details: error.message });
    }
});

module.exports = router;