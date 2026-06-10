const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const router = express.Router();

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
    info: "/v2/info",
    download: "/download"
  },
  headers: {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://yt.savetube.me',
    'referer': 'https://yt.savetube.me/',
    'user-agent': 'Postify/1.0.0'
  },
  crypto: {
    hexToBuffer: (hexString) => {
      const matches = hexString.match(/.{1,2}/g);
      return Buffer.from(matches.join(''), 'hex');
    },
    decrypt: async (enc) => {
      const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
      const data = Buffer.from(enc, 'base64');
      const iv = data.slice(0, 16);
      const content = data.slice(16);
      const key = savetube.crypto.hexToBuffer(secretKey);
      const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
      let decrypted = decipher.update(content);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString());
    }
  },
  youtube: url => {
    if (!url) return null;
    const a = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let b of a) {
      if (b.test(url)) return url.match(b)[1];
    }
    return null
  },
  request: async (endpoint, data = {}, method = 'post') => {
    const { data: response } = await axios({
      method,
      url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
      data: method === 'post' ? data : undefined,
      params: method === 'get' ? data : undefined,
      headers: savetube.headers
    });
    return { status: true, code: 200, data: response }
  },
  getCDN: async () => {
    const response = await savetube.request(savetube.api.cdn, {}, 'get');
    return { status: true, code: 200, data: response.data.cdn }
  },
  download: async (link, format) => {
    const id = savetube.youtube(link);
    if (!id) throw new Error('Invalid YouTube URL');
    const cdnx = await savetube.getCDN();
    const cdn = cdnx.data;
    const result = await savetube.request(`https://${cdn}${savetube.api.info}`, {
      url: `https://www.youtube.com/watch?v=${id}`
    });
    const decrypted = await savetube.crypto.decrypt(result.data.data);
    const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
      id: id,
      downloadType: format === 'mp3' ? 'audio' : 'video',
      quality: format === 'mp3' ? '128' : format,
      key: decrypted.key
    });
    return {
      status: true,
      code: 200,
      result: {
        title: decrypted.title || "Unknown",
        type: format === 'mp3' ? 'audio' : 'video',
        format: format,
        thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/0.jpg`,
        download: dl.data.data.downloadUrl,
        id: id,
        key: decrypted.key,
        duration: decrypted.duration,
        quality: format === 'mp3' ? '128' : format,
        downloaded: dl.data.data.downloaded
      }
    }
  }
};

router.get('/', async (req, res) => {
  const { url, type = 'mp3' } = req.query;
  
  if (!url) {
    return res.status(400).json({ status: false, message: 'YouTube URL is required' });
  }
  
  try {
    if (type === 'mp3') {
      const audioResult = await savetube.download(url, 'mp3');
      return res.json({
        status: true,
        result: {
          title: audioResult.result.title,
          thumbnail: audioResult.result.thumbnail,
          audio_download: audioResult.result.download,
          format: 'mp3',
          duration: audioResult.result.duration
        }
      });
    }
    
    if (type === 'mp4') {
      const videoResult = await savetube.download(url, '720');
      return res.json({
        status: true,
        result: {
          title: videoResult.result.title,
          thumbnail: videoResult.result.thumbnail,
          video_download: videoResult.result.download,
          format: 'mp4',
          quality: '720p',
          duration: videoResult.result.duration
        }
      });
    }
    
    const validQualities = ['144', '240', '360', '480', '720', '1080'];
    if (validQualities.includes(type)) {
      const videoResult = await savetube.download(url, type);
      return res.json({
        status: true,
        result: {
          title: videoResult.result.title,
          thumbnail: videoResult.result.thumbnail,
          video_download: videoResult.result.download,
          format: 'mp4',
          quality: `${type}p`,
          duration: videoResult.result.duration
        }
      });
    }
    
    if (type === 'all') {
      const audioResult = await savetube.download(url, 'mp3');
      const videoResult = await savetube.download(url, '720');
      
      return res.json({
        status: true,
        result: {
          title: videoResult.result.title,
          thumbnail: videoResult.result.thumbnail,
          audio_download: audioResult.result.download,
          video_download: videoResult.result.download,
          audio_format: 'mp3',
          video_format: 'mp4',
          video_quality: '720p',
          duration: videoResult.result.duration
        }
      });
    }
    
    return res.status(400).json({ 
      status: false, 
      message: 'Invalid type parameter. Use mp3, mp4, all, or a specific quality (144, 240, 360, 480, 720, 1080)' 
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ status: false, message: 'An error occurred', error: error.message });
  }
});

module.exports = router;