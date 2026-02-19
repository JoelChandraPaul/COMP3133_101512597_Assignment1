const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();


const upload = multer({ storage: multer.memoryStorage() });

router.post("/employee-photo", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "employees" },
        (err, uploaded) => {
          if (err) return reject(err);
          resolve(uploaded);
        }
      );

      stream.end(req.file.buffer);
    });

    return res.json({ url: result.secure_url });
  } catch (e) {
    return res.status(500).json({ error: "Upload failed", details: e.message });
  }
});

module.exports = router;
