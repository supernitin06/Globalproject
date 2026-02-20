const mongoose = require("mongoose");

const projectDetailsSchema = new mongoose.Schema({
  projectCode: { type: String},
  projectType: { type: String },
  projectDetails: { type: String },
  moneyPayout: { type: String },
  monthlyPayout: { type: String },               // ✅ NEW
  requiredDocuments: { type: String },           // ✅ NEW
  paymentNumber: { type: String },               // ✅ NEW (Cheque/NEFT/DD number)
  securityDeposit: { type: String },
  country: { type: String },
  softwareRequirement: { type: String },
  closedCenter: { type: String },
  projectStatus: { type: String },
  tatGoLive: { type: String },
  pdfLink: { type: String },

  
}, { timestamps: true });

module.exports = mongoose.model("ProjectDetail", projectDetailsSchema);