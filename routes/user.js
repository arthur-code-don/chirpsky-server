const router = require("express").Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");


router.post(
  "/generate-zego-token",
  authController.protect,
  userController.generateZegoToken
);

router.get("https://chirpskykite-server.onrender.com/get-call-logs", authController.protect, userController.getCallLogs);
router.get("https://chirpskykite-server.onrender.com/get-me", authController.protect, userController.getMe);
router.patch("https://chirpskykite-server.onrender.com/update-me", authController.protect, userController.updateMe);
router.get("https://chirpskykite-server.onrender.com/get-all-verified-users", authController.protect, userController.getAllVerifiedUsers);
router.get("https://chirpskykite-server.onrender.com/get-users", authController.protect, userController.getUsers);
router.get("https://chirpskykite-server.onrender.com/get-requests", authController.protect, userController.getRequests);
router.get("https://chirpskykite-server.onrender.com/get-friends", authController.protect, userController.getFriends);

router.post("/start-audio-call", authController.protect, userController.startAudioCall);
router.post("/start-video-call", authController.protect, userController.startVideoCall);


module.exports = router;


