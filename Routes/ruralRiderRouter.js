const express = require("express");
const router = express.Router();
const { addOrder, getOrder } = require("../Controller/ruralRiderController");

router.post("/", addOrder);
router.get("/", getOrder);

module.exports = router;
