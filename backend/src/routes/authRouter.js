const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require('../middleware/isAuth');

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
// Below route is restricted
router.get("/user", isAuth, authController.getUser);

module.exports = router;
