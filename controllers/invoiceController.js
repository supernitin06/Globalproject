const Invoice = require("../models/Invoice");

// Create invoice (only here invoiceNo increment hoga)
exports.createInvoice = async (req, res) => {
  try {
    const userEmail = req.body.billTo?.email;
    if (!userEmail) {
      return res.status(400).json({ message: "User email is required" });
    }

    // Check if invoice already exists for this user
    let existingInvoice = await Invoice.findOne({ "billTo.email": userEmail });

    if (existingInvoice) {
      // Invoice already exists for user, return it directly
      return res.status(200).json(existingInvoice);
    }

    // Else create new invoice with incremented invoiceNo
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 }).exec();

    let newInvoiceNo = "BT8922";

    if (lastInvoice && lastInvoice.invoiceNo) {
      const lastNo = lastInvoice.invoiceNo;
      const numericPart = parseInt(lastNo.slice(2), 10);
      if (!isNaN(numericPart)) {
        newInvoiceNo = "BT" + (numericPart + 1);
      }
    }

    const invoiceData = { ...req.body, invoiceNo: newInvoiceNo };

    const invoice = new Invoice(invoiceData);
    await invoice.save();

    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Print/download invoice (no increment, just fetch by ID)
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    // Yahan se tum invoice data leke print ya download karwa sakti ho
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update invoice by ID
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete invoice by ID
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
