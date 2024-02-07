const express = require("express");
const router = express.Router();
const sellerController = require("../Controller/sellerController");
// router.use(express.json());

router.get("/getHello", sellerController.getHello);
router.put("/:orderId/no", sellerController.notAcceptedBySeller);
module.exports = router;
