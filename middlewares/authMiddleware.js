const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token); // Log the received token

  if (!token) {
    console.log("No token provided in request headers"); // Log if no token
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User:", req.user); // Log the decoded user information
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message); // Log token verification errors
    return res.status(401).json({ success: false, message: "Token invalid" });
  }
};

