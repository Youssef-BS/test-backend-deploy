const express  = require('express')
const { updateProductQuantity,addProductToWishlist,removeProductFromWishlist,getWishlistsByUser, getCart }  =require('../Controller/WishlistCtrl');

const router = express.Router();


// Get all products from a specific market
router.post('/add', addProductToWishlist);

router.get('/user/:userId',getWishlistsByUser)
router.post('/update',updateProductQuantity)

router.post('/remove',removeProductFromWishlist)


module.exports = router