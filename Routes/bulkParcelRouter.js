const express = require("express");
const router = express.Router();
const {
  addOrder,
  getOrder,
  sellerAccept,
  getUnacceptedBulkParcelOrders,
  editBulkParcelOrder,
} = require("../Controller/bulkParcelController");

router.post("/", addOrder);
router.get("/", getOrder);
router.put("/sellerAccept/:id", sellerAccept);
router.get("/admin", getUnacceptedBulkParcelOrders);
router.put("/admin/:id", editBulkParcelOrder);
module.exports = router;
