const Form = require('../models/form');
const Visitor = require("../models/Visitor");

exports.getDashboardSummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const totalUsers = await Visitor.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const registered = await Form.countDocuments();

    const todaysForms = await Form.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        registered,
        todaysForms
      }
    });

  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
