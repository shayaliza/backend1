const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  orderDetails,
  sellerAccept,
  editBookRiderOrder,
  getUnacceptedBookRiderOrders,
  getSellerAcceptedTrue,
} = require("../Controller/bookRiderController");

router.post("/", addOrder);
router.get("/", getOrder);
router.get("/orderDetails/:id", orderDetails); //tracking order
router.put("/sellerAccept/:id", sellerAccept);
router.get("/admin", getUnacceptedBookRiderOrders);
router.put("/admin/:id", editBookRiderOrder);
router.get("/accepted", getSellerAcceptedTrue);
module.exports = router;
