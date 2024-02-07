// const orderController = require("../Controller/orderController");

const express = require("express");
const router = express.Router();
const {
  httpPlaceOrder,
  httpGetOrders,
  httpGetOrder,
  httpGetRiderdetails,
  httpGetAcceptedOrders,
  httpAcceptOrder,
  httpUpdateRiderDetails,
  httpUpdateAcceptedOrders,
  httpNotAcceptedBySeller,
} = require("../Controller/orderController");

router.post("/", httpPlaceOrder);
router.get("/", httpGetOrders);
router.get("/:orderId", httpGetOrder);
router.get("/seller/:orderId", httpGetRiderdetails);
router.get("/getAcceptedOrders/:email", httpGetAcceptedOrders);
router.put("/:orderId", httpAcceptOrder);
router.put("/:orderId/rider-details", httpUpdateRiderDetails);
router.put("/updateAcceptedOrders/:email", httpUpdateAcceptedOrders);
router.post("/:orderId/no", httpNotAcceptedBySeller);

module.exports = router;
