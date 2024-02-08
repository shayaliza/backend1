const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  orderDetails,
  sellerAccept,
} = require("../Controller/bookRiderController");

router.post("/", addOrder);
router.get("/", getOrder);
router.get("/orderDetails/:id", orderDetails);
router.put("/sellerAccept/:id", sellerAccept);

module.exports = router;
