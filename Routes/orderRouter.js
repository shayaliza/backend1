const express = require("express");
const router = express.Router();
const orderController = require("../Controller/orderController");

router.post("/", orderController.placeOrder); //seller side se data aane ke liye
router.get("/", orderController.getOrders); //sare orders ka list
router.get("/:orderId", orderController.getOrder); //detals of 1 order
router.put("/:orderId", orderController.acceptOrder); //boolean accepted
router.put("/:orderId/rider-details", orderController.updateRiderDetails); //rider details sent to seller
router.get("/getAcceptedOrders/:email", orderController.getAcceptedOrders);
router.put(
  "/updateAcceptedOrders/:email",
  orderController.updateAcceptedOrders
);
module.exports = router;
