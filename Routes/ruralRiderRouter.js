const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  sellerAccept,
} = require("../Controller/ruralRiderController");

router.post("/", addOrder);
router.get("/", getOrder);
router.put("/sellerAccept/:id", sellerAccept);

module.exports = router;
