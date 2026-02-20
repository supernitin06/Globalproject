const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
 formId: { type: String, unique: true }, // 👈 NEW field
  prefix: String,
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  website: String,
  address: String,
  addressLine2: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  companyName: String,
  companyIntro: String,
  companyType: String,
  seatsAvailable: String,
  interestedProjects: String,
  preferredCity: String,
  preferredContact: String,
  profileFilePath: String
},{ timestamps: true });

module.exports = mongoose.model("Form", formSchema);