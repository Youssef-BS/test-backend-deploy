const express  = require('express')
const { getAllMarkets,getProducts }  =require('../Controller/ProductCtrl');
const { getProductById } = require('../Controller/ProductCtrl');
const { getMarkets } = require('../Controller/ProductCtrl');
const { getNewsrooms } = require('../Controller/ProductCtrl');
const { getFeaturedProduct } = require('../Controller/ProductCtrl');
const {createMarkets} = require('../Controller/ProductCtrl');
const { deletedMarkets } = require('../Controller/ProductCtrl');
const {createCategory} = require('../Controller/ProductCtrl');
const {getCategories} = require('../Controller/ProductCtrl');
const {getCategoryById} = require('../Controller/ProductCtrl');
const {createSubcategory} = require('../Controller/ProductCtrl');
const {getSubcategories} = require('../Controller/ProductCtrl');
const {getSubcategoryById} = require('../Controller/ProductCtrl');
const {createSubSubcategory} = require('../Controller/ProductCtrl');
const {getSubSubcategories} = require('../Controller/ProductCtrl');
const {getSubSubcategoryById} = require('../Controller/ProductCtrl');
const {getMarketAndCategories} = require('../Controller/ProductCtrl');
const {createProduct} = require('../Controller/ProductCtrl');
const {updateProduct} = require('../Controller/ProductCtrl');
const { search } = require('../Controller/ProductCtrl');
const {getMarketById} = require('../Controller/ProductCtrl');
const router = express.Router();


router.get('/products',getProducts)
router.post('/createProducts',createProduct)
router.get('/all',getAllMarkets)
router.post('/createMarke', createMarkets)
router.get('/markets',getMarkets)
router.get('/product/:id',getProductById)
router.get('/news',getNewsrooms)
router.get('/market/:id',getMarketById)

router.get('/featured-product',getFeaturedProduct)
router.delete('/delete-Market/:id',deletedMarkets) 
router.post('/createCategory',createCategory) 
router.get('/category',getCategories)
router.get('/get-category/:id',getCategoryById)
router.post('/createSubcategory',createSubcategory)
router.get('/subcategory',getSubcategories)
router.get('/get-subcategory/:id',getSubcategoryById)
router.post('/createSubSubcategory',createSubSubcategory)
router.get('/subSubcategory',getSubSubcategories)
router.get('/get-subSubcategory/:id',getSubSubcategoryById)
router.get('/marketAndCategories/:marketId',getMarketAndCategories)
router.put('/updateProduct/:id' , updateProduct)
router.get('/search',search)

module.exports = router ;