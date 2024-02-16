const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();

const {
  addOrder,
  getOrder,
  sellerAccept,
  orderDetails,
  getUnacceptedVetOrders,
  editVetiderOrder,
  getSellerAcceptedTrue,
} = require("../Controller/ruralRiderController");

// router.post("/", addOrder);
router.post("/", upload.single("photoUrl"), addOrder);

router.get("/", getOrder);
router.put("/sellerAccept/:id", sellerAccept);
router.get("/orderDetails/:id", orderDetails);
router.get("/admin", getUnacceptedVetOrders);
router.put("/admin/:id", editVetiderOrder);
router.get("/accepted", getSellerAcceptedTrue);
module.exports = router;
