const express = require("express");
const userController = require("../Controller/userController");

const router = express.Router();

// Register a new user
router.post("/authenticate", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

module.exports = router;
