// Category model Schema

const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
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
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: 0 },
  taxType: { type: String },
});
module.exports = mongoose.model("Category", categorySchema);
