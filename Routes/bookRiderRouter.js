const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  orderDetails,
} = require("../Controller/bookRiderController");

router.post("/", addOrder);
router.get("/", getOrder);
router.get("/orderDetails/:id", orderDetails);

module.exports = router;
