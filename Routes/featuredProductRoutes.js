// routes/featuredProductRoutes.js
const express = require('express');
const router = express.Router();
const {
  createFeaturedProduct,
  getAllFeaturedProducts,
  getFeaturedProductById,
  updateFeaturedProduct,
  deleteFeaturedProduct
} = require('../Controller/FeaturedProductController');

// Route to create a new featured product
router.post('/', createFeaturedProduct);

// Route to get all featured products
router.get('/', getAllFeaturedProducts);

// Route to get a featured product by ID
router.get('/:id', getFeaturedProductById);

// Route to update a featured product by ID
router.put('/:id', updateFeaturedProduct);

// Route to delete a featured product by ID
router.delete('/:id', deleteFeaturedProduct);

module.exports = router;
