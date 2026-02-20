const express = require("express");
const router = express.Router();
const { getDashboardStats, search } = require("../controllers/centerAnalytics");

// ✅ Dashboard stats
router.get("/dashboard", getDashboardStats);

// ✅ Search users & projects
router.get("/search", search);

module.exports = router;