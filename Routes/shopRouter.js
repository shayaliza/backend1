const express = require("express");
const shopController = require("../Controller/shopController");

const router = express.Router();

router.get("/product/:shopId", shopController.product);

module.exports = router;
