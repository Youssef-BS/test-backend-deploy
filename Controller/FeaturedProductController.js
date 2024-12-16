// controllers/FeaturedProductController.js
const FeaturedProduct = require('../Models/FeaturedProduct');
const Product = require('../Models/Products');

// Create a new featured product
const createFeaturedProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Missing required field: productId" });
    }

    const featuredProduct = await FeaturedProduct.create({
      ProductId: productId
    });

    res.status(201).json(featuredProduct);
  } catch (error) {
    console.error("Error creating featured product:", error);
    res.status(500).json({ message: "Failed to create featured product" });
  }
};

// Get all featured products
const getAllFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await FeaturedProduct.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a featured product by ID
const getFeaturedProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const featuredProduct = await FeaturedProduct.findByPk(id, {
      include: [{ model: Product }]
    });

    if (!featuredProduct) {
      return res.status(404).json({ message: 'Featured product not found' });
    }

    res.status(200).json(featuredProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a featured product
const updateFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;

    const featuredProduct = await FeaturedProduct.findByPk(id);

    if (!featuredProduct) {
      return res.status(404).json({ message: 'Featured product not found' });
    }

    await featuredProduct.update({ ProductId: productId });

    res.status(200).json(featuredProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a featured product
const deleteFeaturedProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const featuredProduct = await FeaturedProduct.findByPk(id);

    if (!featuredProduct) {
      return res.status(404).json({ message: 'Featured product not found' });
    }

    await featuredProduct.destroy();

    res.status(200).json({ message: 'Featured product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFeaturedProduct,
  getAllFeaturedProducts,
  getFeaturedProductById,
  updateFeaturedProduct,
  deleteFeaturedProduct,
};
