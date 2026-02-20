const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
   name: { type: String },  // removed required
  mobile: { type: String },  // removed required
  email: { type: String },  // removed required
  projectInterested: String,
  projectCode: String,
  location: String,
  dateOfCall: Date,
  attendedBy: String,
  status: { type: String, enum: ["Active", "Inactive", "Deal"], default: "Active" },
  remarks: String,
  // ✅ Track which user created this
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  

}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
