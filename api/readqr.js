const express = require('express')
const axios = require('axios')
const Jimp = require('jimp')
const QrCode = require('qrcode-reader')

const router = express.Router()

router.get('/', async (req, res) => {
  const imageUrl = req.query.url

  if (!imageUrl) {
    return res.status(400).json({
      status: 400,
      error: 'Parameter ?url= tidak ditemukan.'
    })
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
    const image = await Jimp.read(response.data)
    const qr = new QrCode()

    qr.callback = function(err, value) {
      if (err || !value) {
        return res.status(422).json({
          status: 422,
          error: 'Gagal membaca QR Code atau tidak terdeteksi.'
        })
      } else {
        return res.status(200).json({
          status: 200,
          result: value.result
        })
      }
    }

    qr.decode(image.bitmap)

  } catch (e) {
    console.error('Fatal error:', e.message)
    res.status(500).json({
      status: 500,
      error: `Terjadi kesalahan: ${e.message}`
    })
  }
})

module.exports = router