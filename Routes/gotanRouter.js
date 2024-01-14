const express = require("express");
const gotanController = require("../Controller/gotanController");

const router = express.Router();

router.post("/form", gotanController.GotanData);

module.exports = router;
