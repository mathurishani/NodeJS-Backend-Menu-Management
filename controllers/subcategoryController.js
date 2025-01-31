// Route handlers for subcategory routes

const Subcategory = require("../models/subcategoryModel");
const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const subcategory = new Subcategory(req.body);
    const savedSubcategory = await subcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a subcategory by id or name
exports.getSubcategory = async (req, res) => {
  try {
    const { id, name } = req.query;

    let subcategory;
    if (id) {
      subcategory = await Subcategory.findById(id);
    } else if (name) {
      subcategory = await Subcategory.findOne({
        name: { $regex: new RegExp(name, "i") },
      });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide either id or name" });
    }

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryIdOrName } = req.params;

    // Check if the parameter is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(categoryIdOrName);

    let category;
    if (isObjectId) {
      category = await Category.findById(categoryIdOrName);
    } else {
      category = await Category.findOne({ name: categoryIdOrName });
    }

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subcategories = await Subcategory.find({ categoryId: category._id });

    if (subcategories.length === 0) {
      return res
        .status(404)
        .json({ message: "No subcategories found for this category" });
    }

    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a subcategory by id or name
exports.updateSubcategory = async (req, res) => {
  try {
    const { idOrName } = req.params;

    const isObjectId = mongoose.Types.ObjectId.isValid(idOrName);

    const query = isObjectId ? { _id: idOrName } : { name: idOrName };

    const updatedSubcategory = await Subcategory.findOneAndUpdate(
      query,
      req.body,
      { new: true }
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
