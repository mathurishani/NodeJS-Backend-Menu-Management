// API routes for category

const express = require('express');
const { createCategory, getAllCategories, getCategory, updateCategory } = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/search', getCategory);
router.put('/:idOrName', updateCategory);

module.exports = router;