// // Route handlers forv item routes

const Item = require("../models/itemModel");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const mongoose = require("mongoose");

// Create a new item
exports.createItem = async (req, res) => {
  try {
    //const item = new Item(req.body);
    const savedItem = await Item.insertMany(req.body);
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an item by id or name
exports.getItem = async (req, res) => {
  try {
    const { id, name } = req.query;

    let item;
    if (id) {
      item = await Item.findById(id);
    } else if (name) {
      item = await Item.findOne({ name: { $regex: new RegExp(name, "i") } });
    } else {
      return res
        .status(400)
        .json({ message: "Please provide either id or name" });
    }

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get items by category
exports.getItemsByCategory = async (req, res) => {
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

    const items = await Item.find({ categoryId: category._id });

    if (items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this category" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get items by subcategory
exports.getItemsBySubcategory = async (req, res) => {
  try {
    const { subcategoryIdOrName } = req.params;

    // Check if the parameter is a valid ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(subcategoryIdOrName);

    let subcategory;
    if (isObjectId) {
      subcategory = await Subcategory.findById(subcategoryIdOrName);
    } else {
      subcategory = await Subcategory.findOne({ name: subcategoryIdOrName });
    }

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const items = await Item.find({ subcategoryId: subcategory._id });

    if (items.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found for this subcategory" });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { idOrName } = req.params;

    const isObjectId = mongoose.Types.ObjectId.isValid(idOrName);
    const query = isObjectId ? { _id: idOrName } : { name: idOrName };

    const updatedItem = await Item.findOneAndUpdate(query, req.body, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};