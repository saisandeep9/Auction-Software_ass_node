const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
    trim: true,
  },
});
const Category = mongoose.model("Category", CategorySchema);

exports.Category = Category;
