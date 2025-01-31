// Route handlers for category routes

const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a category by id or name
exports.getCategory = async (req, res) => {
  try {
    const { id, name } = req.query;

    let category;
    if (id) {
      category = await Category.findById(id);
    } else if (name) {
      category = await Category.findOne({
        name: { $regex: new RegExp(name, "i") },
      });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide either id or name" });
    }

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category by id or name
exports.updateCategory = async (req, res) => {
  try {
    const { idOrName } = req.params;

    // Check if the provided idOrName is a valid MongoDB ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(idOrName);

    const query = isObjectId ? { _id: idOrName } : { name: idOrName };

    const updatedCategory = await Category.findOneAndUpdate(query, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
