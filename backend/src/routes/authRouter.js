const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require('../middleware/isAuth');

router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
// Below routes are restricted
router.get("/user", isAuth, authController.getUser);
router.get("/logout", isAuth, authController.postLogout);

module.exports = router;
