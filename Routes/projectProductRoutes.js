const express = require('express');
const {
  createProjectProduct,
  getAllProjectProducts,
  getProjectProductById,
  updateProjectProduct,
  deleteProjectProduct ,
  getProjectWithGalleriesAndProducts
} = require('../Controller/projectProduct');

const router = express.Router();

router.post('/', createProjectProduct);
router.get('/', getAllProjectProducts);
router.get('/:id', getProjectProductById);
router.put('/:id', updateProjectProduct);
router.delete('/:id', deleteProjectProduct);
router.get('/projectbyId/:id', getProjectWithGalleriesAndProducts);

module.exports = router;
