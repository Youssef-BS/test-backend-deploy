const express = require('express');
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../Controller/projectController');

const router = express.Router();

router.post('/create', createProject);
router.get('/getAllProject', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);


module.exports = router;
