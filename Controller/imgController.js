// controllers/imageController.js

const Image = require("../Models/imgModel");

async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = await Image.uploadImage(req.file.buffer);
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { uploadImage };
