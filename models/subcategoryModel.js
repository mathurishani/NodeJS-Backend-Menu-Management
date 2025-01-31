// SubCategory model schema

const mongoose = require('mongoose');
const Category = require('./categoryModel'); 

const subcategorySchema = mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  image: { 
    type: String,
    // URL validation for the image field
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(v); // Regex to validate a URL
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  description: { type: String },
  taxApplicability: { type: Boolean },
  tax: { type: Number },
});

// Pre-save middleware to inherit tax values from Category
subcategorySchema.pre('save', async function (next) {
  try {
    if (!this.isModified('taxApplicability') || !this.isModified('tax')) {
      const category = await Category.findById(this.categoryId);
      if (category) {
        this.taxApplicability = category.taxApplicability;
        this.tax = category.tax;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
