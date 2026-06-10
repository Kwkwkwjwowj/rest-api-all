const express = require('express');
const axios = require('axios');

const router = express.Router();

const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  "Origin": "https://enka.network",
  "Referer": "https://enka.network/",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.89 Safari/537.36",
};

router.get('/', async (req, res) => {
  const uid = req.query.uid;
  if (!uid) return res.status(400).json({ status: 400, message: 'Parameter ?uid= diperlukan.' });

  try {
    const response = await axios.get(`https://enka.network/api/uid/${uid.trim()}`, { headers });
    const data = response.data;

    if (!data.playerInfo) {
      return res.status(404).json({ status: 404, message: 'Data tidak ditemukan untuk UID tersebut.' });
    }

    const player = data.playerInfo;
    const screenshot = `https://mini.s-shot.ru/990x810/PNG/975/Z100/?https://enka.network/u/${data.uid}/`;

    const result = {
      status: 200,
      uid: data.uid,
      detail_url: `https://enka.network/u/${data.uid}`,
      screenshot,
      info: {
        nickname: player.nickname,
        level: player.level,
        worldLevel: player.worldLevel,
        achievement: player.finishAchievementNum,
        nameCardId: player.nameCardId,
        spiralAbyss: `${player.towerFloorIndex}-${player.towerLevelIndex}`
      }
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ status: 500, message: 'Gagal mengambil data.', error: err.message });
  }
});

module.exports = router;