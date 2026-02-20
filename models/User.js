const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  // email: { type: String, unique: true, required: true },
username: { type: String, unique: true, required: true }, // ✅ Add this
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: String,
  resetTokenExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (input) {
  return bcrypt.compare(input, this.password);
};

module.exports = mongoose.model("User", userSchema);
