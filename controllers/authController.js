const User = require("../models/User");
const jwt = require("jsonwebtoken"); // ✅ this line is missing
const { JWT_SECRET } = require("../config/config");
const crypto = require("crypto");


const generateToken = (user) => {
  return jwt.sign({ 
    id: user._id, 
    role: user.role,
     username: user.username  // ✅ ADD THIS LINE
   }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.login = async (req, res) => {
  // const { email, password } = req.body;
   const { username, password } = req.body; // ✅ email → username
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.json({ success: true, token });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (!(await user.comparePassword(oldPassword))) {
    return res.status(400).json({ success: false, message: "Incorrect old password" });
  }

  user.password = newPassword;
  await user.save();
  res.json({ success: true, message: "Password updated successfully" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  await user.save();

  // Normally, send token via email. For now just return it
  res.json({ success: true, message: "Reset token sent", token });
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  res.json({ success: true, message: "Password reset successfully" });
};