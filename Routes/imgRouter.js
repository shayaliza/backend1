// routes/imageRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../Controller/imgController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), imageController.uploadImage);

module.exports = router;
