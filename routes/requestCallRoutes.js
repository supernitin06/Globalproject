const express = require("express");
const router = express.Router();
const requestCallController = require("../controllers/requestCallController");

router.post("/", requestCallController.createRequest);
router.get("/", requestCallController.getAllRequests);
router.delete("/:id", requestCallController.deleteRequest);
router.put("/:id", requestCallController.updateRequest); // ✅ Added PUT route
module.exports = router;

