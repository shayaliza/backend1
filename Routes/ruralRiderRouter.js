const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  sellerAccept,
  orderDetails,
  getUnacceptedVetOrders,
  editVetiderOrder,
} = require("../Controller/ruralRiderController");

router.post("/", addOrder);
router.get("/", getOrder);
router.put("/sellerAccept/:id", sellerAccept);
router.get("/orderDetails/:id", orderDetails);
router.get("/admin", getUnacceptedVetOrders);
router.put("/admin/:id", editVetiderOrder);
module.exports = router;
