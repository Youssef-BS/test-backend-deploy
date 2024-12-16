const asyncHandler = require('express-async-handler');
const Product = require('../Models/Products');

// Create a Product Relation
const createProductRelation = asyncHandler(async (req, res) => {
  const { productId, relatedProductId } = req.body;

  if (!productId || !relatedProductId) {
    return res.status(400).json({ message: 'Both productId and relatedProductId are required' });
  }

  try {
    const product = await Product.findByPk(productId);
    const relatedProduct = await Product.findByPk(relatedProductId);

    if (!product || !relatedProduct) {
      return res.status(404).json({ message: 'Product(s) not found' });
    }

    await product.addRelatedProducts(relatedProductId);
    
    res.status(201).json({ message: 'Product relation created successfully' });
  } catch (error) {
    console.error('Error creating product relation:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get All Product Relations
const getProductRelations = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: [
        { model: Product, as: 'RelatedProducts' }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product.RelatedProducts);
  } catch (error) {
    console.error('Error fetching product relations:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove a Related Product
const removeRelatedProduct = asyncHandler(async (req, res) => {
  const { productId, relatedProductId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.removeRelatedProducts(relatedProductId);
    
    res.status(200).json({ message: 'Related product removed successfully' });
  } catch (error) {
    console.error('Error removing related product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a Product Relation
const deleteProductRelation = asyncHandler(async (req, res) => {
  const { productId, relatedProductId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.removeRelatedProducts(relatedProductId);

    res.status(200).json({ message: 'Product relation deleted successfully' });
  } catch (error) {
    console.error('Error deleting product relation:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createProductRelation,
  getProductRelations,
  removeRelatedProduct,
  deleteProductRelation
};
