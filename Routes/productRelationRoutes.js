const express = require('express');
const router = express.Router();
const {
  createProductRelation,
  getProductRelations,

} = require('../Controller/ProductRelation');

// Define your routes
router.post('/', createProductRelation);
router.get('/:id', getProductRelations);


module.exports = router;
