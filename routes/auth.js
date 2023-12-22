const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("https://chirpskykite-server.onrender.com/login", authController.login);

router.post("https://chirpskykite-server.onrender.com/register", authController.register, authController.sendOTP);
router.post("https://chirpskykite-server.onrender.com/verify", authController.verifyOTP);
router.post("https://chirpskykite-server.onrender.com/send-otp", authController.sendOTP);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;