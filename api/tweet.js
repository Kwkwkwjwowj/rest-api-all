const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  const {
    text = '',
    displayName = 'User',
    sender = 'user@example.com',
    avatar = 'https://telegra.ph/file/24fa902ead26340f3df2c.png',
    replies = '',
    retweets = '',
    likes = ''
  } = req.query;

  if (!text) {
    return res.status(400).json({
      error: true,
      message: `Format: /tweet?text=isi%20tweet&displayName=Nama&sender=628xxxx@s.whatsapp.net&avatar=link_gambar&replies=5k&retweets=10k&likes=23k`
    });
  }

  const generateStat = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    return Math.random() > 0.7 ? num + 'k' : num.toString();
  };

  const repliesCount = replies || generateStat();
  const retweetsCount = retweets || generateStat();
  const likesCount = likes || generateStat();

  const username = sender.split('@')[0];

  const url = `https://some-random-api.com/canvas/misc/tweet?` +
    `displayname=${encodeURIComponent(displayName)}` +
    `&username=${encodeURIComponent(username)}` +
    `&avatar=${encodeURIComponent(avatar)}` +
    `&comment=${encodeURIComponent(text)}` +
    `&replies=${encodeURIComponent(repliesCount)}` +
    `&retweets=${encodeURIComponent(retweetsCount)}` +
    `&likes=${encodeURIComponent(likesCount)}` +
    `&theme=light&verified=true`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: 'Gagal membuat tweet.' });
  }
});

module.exports = router;