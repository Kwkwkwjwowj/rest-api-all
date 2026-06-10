const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const link = req.query.url;
  if (!link) return res.status(400).json({ status: false, message: 'URL tidak boleh kosong' });

  try {
    const init = await axios.get(`https://api.fabdl.com/spotify/get?url=${encodeURIComponent(link)}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        referer: "https://spotifydownload.org/",
      },
    });

    const { gid, id } = init.data.result;

    const convert = await axios.get(`https://api.fabdl.com/spotify/mp3-convert-task/${gid}/${id}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        referer: "https://spotifydownload.org/",
      },
    });

    const result = {
      title: init.data.result.name,
      artist: init.data.result.artists,
      duration_ms: init.data.result.duration_ms,
      image: init.data.result.image,
      download: 'https://api.fabdl.com' + convert.data.result.download_url,
    };

    res.json({ status: true, result });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Gagal mendapatkan link download', error: err.message });
  }
});

module.exports = router;