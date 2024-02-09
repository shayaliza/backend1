const express = require("express");
const {
  Login,
  SearchUnacceptedData,
  EditDeliverBy,
} = require("../Controller/gotanAdminController");

const router = express.Router();

router.post("/", Login);
router.get("/all", SearchUnacceptedData);
router.put("/edit", EditDeliverBy);

module.exports = router;
