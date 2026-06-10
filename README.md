# OwnBlox REST API

REST API ini sudah dirapikan supaya lebih fleksibel, lebih mudah dirawat, dan tampilan dokumentasinya lebih modern.

## Yang berubah
- Endpoint API diload otomatis dari folder `api/`
- Tambah/hapus endpoint cukup lewat file, tanpa edit daftar manual di `index.js`
- Ada registry API di `/api`
- Ada health check di `/api/health`
- Halaman depan, dokumentasi, dan 404 dibuat lebih modern

## Cara kerja
- File router Express di folder `api/` akan dipasang otomatis
- File helper seperti `*array.js` tidak ikut dipasang sebagai endpoint
- Dokumentasi tetap bisa dipakai seperti REST API biasa

## Jalankan
```bash
npm install
npm start
```

## Struktur penting
- `/` → halaman depan
- `/docs` → dokumentasi
- `/api` → daftar endpoint yang aktif
- `/api/health` → status server

## Menambah endpoint baru
1. Buat file baru di folder `api/`
2. Export `express.Router()`
3. Restart server

Contoh:
```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: true, message: "Hello" });
});

module.exports = router;
```
