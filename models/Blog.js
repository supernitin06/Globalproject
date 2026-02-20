const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  readTime: { type: String, required: true } // like "3 min read"
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
