const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const Product = require('../Models/Products');
const Market = require('../Models/Market')
const Category = require('../Models/Category')
const Subcategory = require('../Models/Subcategory')
const SubSubcategory = require('../Models/SubSubcategory');
const Newsroom = require('../Models/Newsroom');
const FeaturedProduct = require('../Models/FeaturedProduct');
const multer = require('multer');
const path = require('path');
const { message } = require('antd');
const Project = require('../Models/Project');
const { Op } = require('sequelize');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findAll({
    include : [
      {model : Market , 
        Market 
      } , 
      {
        model : Category,
        Category
      } , 
      {
        model : Subcategory,
        Subcategory
      } , 
      {
        model : SubSubcategory,
        SubSubcategory
      } , 
      
      
    
    ]
  });
  res.json(products);
});

const getNewsrooms = asyncHandler(async (req, res) => {
  const newsrooms = await Newsroom.findAll({
    include :[
      {
        model : Product,
        Product
        
      }
    ]
  });
  res.json(newsrooms);
});


const getFeaturedProduct = asyncHandler(async (req, res) => {
  const newsrooms = await FeaturedProduct.findAll({
    include :[
      {
        model : Product,
        Product
        
      }
    ]
  });
  res.json(newsrooms);
});

const getMarkets = asyncHandler(async (req, res) => {
  const markets = await Market.findAll();
  res.json(markets);
});


const deletedMarkets = asyncHandler(async (req, res) => {

  const id = req.params.id ; 
  try{
  const market = await Market.findOne(id);
  Market.delete(market);
  res.status(200).json('Market deleted');
  }catch(e) {
    res.status(500).json(e.message);
  }
}) ; 




const createMarkets = asyncHandler(async (req, res) => {
  const { name , image} = req.body;

  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  if (!name || !image) {
    return res.status(400).json({ message: 'Name and image are required' });
  }

  try {
    const newMarket = await Market.create({
      name: name,
      image: image,
    });

    res.status(201).json(newMarket);
  } catch (error) {
    console.error('Error creating market:', error);
    res.status(500).json({ message: 'Error creating market', error: error.message });
  }
});





// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      await product.update(req.body);
      res.json({ success: true, message: 'Product updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.json({ success: true, message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
});

// Get a single market with its related categories, subcategories, subsubcategories, and products
const getAllMarkets = asyncHandler(async (req, res) => {
    const markets = await Market.findAll({
      include: [
        {
          model: Category,
          include: [
            {
              model: Subcategory,
              include: [
                {
                  model: SubSubcategory,
                  include: Product 
                },
                Product 
              ]
            },
            Product 
          ]
        }
      ]
    });
    res.json(markets);
    console.log(markets)
  });


  const createCategory = asyncHandler(async (req, res) => {
    try {
      const { marketId, name } = req.body;
      const newCategory = await Category.create({ marketId, name });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [
                {
                    model: Market,
                    attributes: ['id', 'name', 'image'] 
                }
            ]
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const marketId = req.params.id; 

    const categories = await Category.findAll({
      where: { MarketId: marketId },
      include: [
        {
          model: Market,
          attributes: ['id', 'name', 'image'],
        },
      ],
    });

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(categories);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  const createSubcategory = asyncHandler(async (req, res) => {
    try {
      const { categoryId, name } = req.body;
      const newSubcategory = await Subcategory.create({ categoryId, name });
      res.status(201).json(newSubcategory);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  
  const getSubcategories = asyncHandler(async (req, res) => {
    try {
    const subcategories = await Subcategory.findAll({
      include : [
        {
          model: Category ,
          attributes: [ 'id' , 'name' ] 
        }
      ]
    });
   
    res.status(200).json(subcategories);
  }catch(e) {
    res.status(500).json({message : e.message})
  }
  });

  const getSubcategoryById = asyncHandler(async (req, res) => {
    try {
        const subcategoryId = req.params.id; // Assuming the ID is passed as a parameter in the request URL
        const subcategory = await Subcategory.findByPk(subcategoryId, {
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




  const createSubSubcategory = asyncHandler(async (req, res) => {
    try {
      const { subcategoryId, name } = req.body;
      const newSubSubcategory = await SubSubcategory.create({ subcategoryId, name });
      res.status(201).json(newSubSubcategory);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });

  const search = asyncHandler(async(req,res) => {
    const { query } = req.query;
  
      try {
          // Perform database query to search for matching products
          const products = await Product.findAll({
              where: {
                  [Op.or]: [
                      { title: { [Op.like]: `%${query}%` } },
                      { description: { [Op.like]: `%${query}%` } }
                  ]
              },
              include: [
                  { model: Category },
                  { model: Subcategory },
                  { model: SubSubcategory },
                  { model: Market }
              ]
          });
  
          // Send the search results back to the client
          res.json(products);
      } catch (error) {
          console.error('Error performing search:', error);
          res.status(500).json({ success: false, error: 'An error occurred while performing the search.' });
      }
  })
  const getSubSubcategories = asyncHandler(async (req, res) => {
    try {
      const subsubcategories = await SubSubcategory.findAll({
        include: [
          {
            model: Subcategory, 
            attributes: ['id', 'name']
          }
        ]
      });
      
      res.status(200).json(subsubcategories);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  const getSubSubcategoryById = asyncHandler(async (req, res) => {
    try {
        const subSubcategoryId = req.params.id; 
        const subSubcategory = await SubSubcategory.findByPk(subSubcategoryId, {
            include: [
                {
                    model: Subcategory,
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!subSubcategory) {
            return res.status(404).json({ message: 'Subsubcategory not found' });
        }

        res.json(subSubcategory);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


const getMarketById = asyncHandler(async (req, res) => {
  const id =req.params.id
  console.log(id)
  const markets = await Market.findByPk(id,{
    include: [
      {
        model: Category,
        include: [
          {
            model: Subcategory,
            include: [
              {
                model: SubSubcategory,
                include: Product // Include products in subsubcategories
              },
              Product // Include products in subcategories
            ]
          },
          Product // Include products in categories
        ]
      }
    ]
  });
  res.json(markets);
  console.log(markets)
});
  const getMarketAndCategories = asyncHandler(async (req, res) => {
    const { marketId } = req.params;
    
    try {
        const market = await Market.findByPk(marketId, {
            include: [
                {
                    model: Category,
                    include: [
                        {
                            model: Subcategory,
                            include: [
                                {
                                    model: SubSubcategory,
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        res.json(market);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


  
  
module.exports = { 
  createProduct,
  getFeaturedProduct, 
  getProducts,
  getProductById, 
  updateProduct, 
  getNewsrooms,
  deleteProduct,
  getAllMarkets,
  getMarkets, 
  createMarkets , 
  deletedMarkets,
  createCategory ,
  getCategories ,
  getCategoryById,
  createSubcategory, 
  getSubcategories ,
  getSubcategoryById ,
  createSubSubcategory,
  getSubSubcategories ,
  getSubSubcategoryById ,
  getMarketAndCategories,
  search,
  getMarketById
 };
