const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  sellerAccept,
  orderDetails,
} = require("../Controller/ruralRiderController");

router.post("/", addOrder);
router.get("/", getOrder);
router.put("/sellerAccept/:id", sellerAccept);
router.get("/orderDetails/:id", orderDetails);

module.exports = router;
