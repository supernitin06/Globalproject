const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  // invoiceNo: { type: String, required: true, unique: true },
  // date: { type: Date, required: true },
  // due: { type: String, required: true },
  // balanceDue: { type: Number, required: true, default: 0 },

  invoiceNo: { type: String, unique: true },
  date: { type: Date },
  due: { type: String },

  billTo: {
    address: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
  },

  // Aap chaho to aur fields bhi add kar sakte ho jaise line items, taxes, etc.
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
