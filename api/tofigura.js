const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const CryptoJS = require("crypto-js");

const router = express.Router();
const BASE_URL = "https://ai-apps.codergautam.dev";

router.get("/", async (req, res) => {
    try {
        const { imageUrl } = req.query;
        if (!imageUrl) {
            return res.status(400).json({ error: "Harap sertakan parameter ?imageUrl=" });
        }

        const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const mime = imgRes.headers["content-type"];
        if (!/image\/(jpe?g|png)/.test(mime)) {
            return res.status(400).json({ error: `Format ${mime} tidak didukung!` });
        }

        const promptText = "Use the nano-banana model to create a 1/7 scale commercialized figure of the character in the illustration, in a realistic style and environment. Place the figure on a computer desk, using a circular transparent acrylic base without any text. On the computer screen, display the Blender modeling process of the figure. Next to the computer screen, place a marvel-style toy packaging box printed with the original artwork.";
        const resultBuffer = await img2img(Buffer.from(imgRes.data), promptText);

        res.setHeader("Content-Type", "image/jpeg");
        res.send(resultBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

function acakName(len = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function generateUid() {
    const randomStr = Math.random().toString(36).substring(2) + Date.now();
    return CryptoJS.SHA256(randomStr).toString().substring(0, 24);
}

async function autoregist() {
    const uid = generateUid();
    const email = `gienetic${Date.now()}@nyahoo.com`;

    const payload = {
        uid,
        email,
        displayName: acakName(),
        photoURL: "https://i.pravatar.cc/150",
        appId: "photogpt"
    };

    const res = await axios.post(`${BASE_URL}/photogpt/create-user`, payload, {
        headers: {
            "content-type": "application/json",
            "accept": "application/json",
            "user-agent": "okhttp/4.9.2"
        }
    });

    if (res.data.success) return uid;
    throw new Error("Register gagal: " + JSON.stringify(res.data));
}

async function img2img(imageBuffer, prompt) {
    const uid = await autoregist();

    const form = new FormData();
    form.append("image", imageBuffer, { filename: "input.jpg", contentType: "image/jpeg" });
    form.append("prompt", prompt);
    form.append("userId", uid);

    const uploadRes = await axios.post(`${BASE_URL}/photogpt/generate-image`, form, {
        headers: {
            ...form.getHeaders(),
            "accept": "application/json",
            "user-agent": "okhttp/4.9.2",
            "accept-encoding": "gzip"
        }
    });

    if (!uploadRes.data.success) throw new Error(JSON.stringify(uploadRes.data));

    const { pollingUrl } = uploadRes.data;
    let status = "pending";
    let resultUrl = null;

    while (status !== "Ready") {
        const pollRes = await axios.get(pollingUrl, {
            headers: { "accept": "application/json", "user-agent": "okhttp/4.9.2" }
        });
        status = pollRes.data.status;
        if (status === "Ready") {
            resultUrl = pollRes.data.result.url;
            break;
        }
        await new Promise((r) => setTimeout(r, 3000));
    }

    if (!resultUrl) throw new Error("Gagal mendapatkan hasil gambar.");

    const resultImg = await axios.get(resultUrl, { responseType: "arraybuffer" });
    return Buffer.from(resultImg.data);
}

module.exports = router;