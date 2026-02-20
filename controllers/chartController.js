// controllers/chartController.js
const Form = require("../models/form");

exports.getMonthlySubmissions = async (req, res) => {
  try {
    const result = await Form.aggregate([
        {
        $match: {
          createdAt: { $type: "date" } // ✅ Filter out invalid/null createdAt
        }
      },
      
        {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const data = {};
    months.forEach((month) => (data[month] = 0));

    result.forEach((item) => {
      data[months[item._id - 1]] = item.total;
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
