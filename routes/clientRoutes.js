const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, clientController.getClients);
router.post("/", protect, clientController.createClient);
router.put("/:id", protect, clientController.updateClient);
router.delete("/:id", protect, clientController.deleteClient);
router.get("/total", protect, clientController.getTotalClients);
router.get("/today", protect, clientController.getTodayClientsCount);
router.get("/active", protect, clientController.getActiveClientsCount);
router.get("/stats/by-user", protect, clientController.getClientStatsByUser);
router.get("/search", protect, clientController.searchClientByMobile);

module.exports = router;
