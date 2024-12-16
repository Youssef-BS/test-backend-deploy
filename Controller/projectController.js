const Project = require('../Models/Project');
const Gallery = require('../Models/Gallery');

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, image, gallery } = req.body;

    if (!title || !image || !gallery || !gallery.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const project = await Project.create({
      title,
      description,
      image,
      galleries: gallery.map(item => ({ url: item.url }))
    }, {
      include: [{ model: Gallery, as: 'galleries' }]
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: Gallery, as: 'galleries' }]
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, {
      include: [{ model: Gallery, as: 'galleries' }]
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, galleries } = req.body;

    const project = await Project.findByPk(id, {
      include: [{ model: Gallery, as: 'galleries' }]
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project details
    await project.update({ title, description, image });

    if (galleries && Array.isArray(galleries)) {
      // Remove existing galleries
      await Gallery.destroy({ where: { ProjectId: id } });

      // Add new gallery items
      const galleryInstances = galleries.map(item => ({ url: item.url, ProjectId: id }));
      await Gallery.bulkCreate(galleryInstances);
    }

    // Fetch the updated project with new galleries
    const updatedProject = await Project.findByPk(id, {
      include: [{ model: Gallery, as: 'galleries' }]
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Failed to update project" });
  }
};


const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
