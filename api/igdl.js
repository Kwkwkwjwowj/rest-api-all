const express = require('express');
const axios = require('axios');
const CryptoJS = require('crypto-js');
const router = express.Router();

async function ambilWaktuServer() {
  try {
    const { data } = await axios.get('https://sssinstagram.com/msec', { timeout: 5000 });
    return Math.floor(data.msec * 1000);
  } catch {
    return Date.now();
  }
}

async function bikinSignature(url, secretKey, timestamp) {
  const waktuDisesuaikan = Date.now() - (timestamp ? Date.now() - timestamp : 0);
  const teksHash = `${url}${waktuDisesuaikan}${secretKey}`;
  const hash = CryptoJS.SHA256(teksHash).toString(CryptoJS.enc.Hex);
  return { signature: hash, waktuDisesuaikan, timestamp };
}

async function ambilDataInstagram(url) {
  const secretKey = '19e08ff42f18559b51825685d917c5c9e9d89f8a5c1ab147f820f46e94c3df26';
  const timestamp = await ambilWaktuServer();
  const { signature, waktuDisesuaikan } = await bikinSignature(url, secretKey, timestamp);

  const dataRequest = {
    url,
    ts: waktuDisesuaikan,
    _ts: 1739186038417,
    _tsc: timestamp ? Date.now() - timestamp : 0,
    _s: signature
  };

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://sssinstagram.com/',
    'Origin': 'https://sssinstagram.com/'
  };

  try {
    const response = await axios.post('https://sssinstagram.com/api/convert', dataRequest, {
      headers,
      timeout: 10000
    });
    return response.data;
  } catch {
    return { error: 'Gagal ambil data', details: 'Yah error, coba lagi ya' };
  }
}

router.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'Link tidak valid atau kosong' });
  }

  try {
    const result = await ambilDataInstagram(url);
    if (result.error) {
      return res.status(500).json({ error: result.details || result.error });
    }

    const semuaMedia = Array.isArray(result) ? result : [result];
    const output = semuaMedia.map(item => ({
      username: item.meta?.username || null,
      likes: item.meta?.like_count || 0,
      comments: item.meta?.comment_count || 0,
      caption: item.meta?.title || null,
      type: item.url?.[0]?.ext || null,
      download_url: item.url?.[0]?.url || null,
      thumbnail: item.thumb || null
    }));

    res.json({ status: true, result: output });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Terjadi kesalahan' });
  }
});

module.exports = router;