const Visitor = require('../models/Visitor');

module.exports = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const today = new Date().toISOString().split("T")[0];
    const start = new Date(today);
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    // Avoid duplicate count for same IP in a day
    const alreadyLogged = await Visitor.findOne({
      ip,
      createdAt: { $gte: start, $lte: end }
    });

    if (!alreadyLogged) {
      await Visitor.create({ ip });
    }
  } catch (err) {
    console.error('Visitor track error:', err);
  }

  next();
};
