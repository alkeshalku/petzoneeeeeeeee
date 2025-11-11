const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
//   parentCategory: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     default: null,
//   }, // Reference to parent category
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Category", categorySchema);
