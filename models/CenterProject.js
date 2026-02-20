const mongoose = require("mongoose");

const centerProjectSchema = new mongoose.Schema({
  userId:{
    type: String, required: true, 
  },
  projectCode: { type: String, required: true, unique: true },
  projectType: String,
  projectApprovalDate: Date,
  projectNDADate: Date,
  centerVisitDate: Date,
  slaData: String,
  softwareInstallationDate: Date,
  softwareStatus: String,
  ndaFile: String,
  slaFile: String,
  invoiceFile: String
}, { timestamps: true });

// ✅ Safe export
module.exports = mongoose.models.CenterProject || mongoose.model("CenterProject", centerProjectSchema);
