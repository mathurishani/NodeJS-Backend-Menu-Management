// Item model schema

const mongoose = require("mongoose");
const { calculateTotalAmount } = require("../utils/calculateTotalAmount");

const itemSchema = mongoose.Schema({
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: false,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: { type: String, required: true },
  image: {
    type: String,
    // URL validation for the image field
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(v); // Regex to validate a URL
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  description: { type: String },
  taxApplicability: { type: Boolean },
  tax: { type: Number },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number },
});

// Pre-save middleware to calculate the total amount before saving the item
itemSchema.pre("save", function (next) {
  this.totalAmount = calculateTotalAmount(this.baseAmount, this.discount);
  next();
});

module.exports = mongoose.model("Item", itemSchema);
