// API routes for items

const express = require('express');
const { createItem, getAllItems, getItem, getItemsByCategory, getItemsBySubcategory, updateItem } = require('../controllers/itemController');
const router = express.Router();

router.post('/', createItem);
router.get('/', getAllItems);
router.get('/search', getItem);
router.get('/category/:categoryIdOrName', getItemsByCategory);
router.get('/subcategory/:subcategoryIdOrName', getItemsBySubcategory);
router.put('/:idOrName', updateItem);

module.exports = router;