const express = require('express');
const router = express.Router();
const {
  createNewsroom,
  getAllNewsrooms,
  getNewsroomById,
  updateNewsroom,
  deleteNewsroom
} = require('../Controller/NewsroomController');

// Route to create a new newsroom
router.post('/', createNewsroom);

// Route to get all newsrooms
router.get('/', getAllNewsrooms);

// Route to get a newsroom by ID
router.get('/:id', getNewsroomById);

// Route to update a newsroom by ID
router.put('/:id', updateNewsroom);

// Route to delete a newsroom by ID
router.delete('/:id', deleteNewsroom);

module.exports = router;
