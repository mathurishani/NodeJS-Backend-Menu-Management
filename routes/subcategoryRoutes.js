// API routes for subcategories

const express = require('express');
const { createSubcategory, getAllSubcategories, getSubcategory, getSubcategoriesByCategory, updateSubcategory } = require('../controllers/subcategoryController');
const router = express.Router();

router.post('/', createSubcategory);
router.get('/', getAllSubcategories);
router.get('/search', getSubcategory);
router.get('/category/:categoryIdOrName', getSubcategoriesByCategory);
router.put('/:idOrName', updateSubcategory);

module.exports = router;