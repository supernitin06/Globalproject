const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectCode: { type: String, required: true, unique: true },
  clientCode: { type: String, required: true },
  pdfLink: { type: String },
  originalFileName: { type: String }, // 👈 NEW LINE
  imageUrl: { type: String },
  // status: { type: String, enum: ["LIVE", "HOLD"], default: "LIVE" },
  status: {
  type: String,
  enum: ['AVAILABLE', 'HOLD', 'CLOSED'], // Allowed values
  default: 'AVAILABLE'
},

  totalApplications: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now },
  country: { type: String },
 countdownEndDate: {
  type: Date,
  required: false, // ✅ make it optional
  default: null    // ✅ good fallback
}

}, { timestamps: true });
module.exports = mongoose.model("Project", projectSchema);