const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/login", authController.login);
router.put("/change-password", protect, authController.changePassword);
router.post("/forgot-password", authController.forgotPassword);
router.put("/reset-password", authController.resetPassword);

module.exports = router;