const express = require("express");

// Controllers
const { signupUser, loginUser } = require("../controller/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

module.exports = router;
