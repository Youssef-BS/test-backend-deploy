const ProjectProduct = require('../Models/projectProduct');
const Project = require('../Models/Project');
const Product = require('../Models/Products');
const Gallery = require('../Models/Gallery');

// Create a new ProjectProduct association
const createProjectProduct = async (req, res) => {
  try {
    const { projectId, productId } = req.body;
    const projectProduct = await ProjectProduct.create({ projectId, productId });
    res.status(201).json(projectProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all ProjectProduct associations
const getAllProjectProducts = async (req, res) => {
    try {
      const projectProducts = await ProjectProduct.findAll({
        include: [
          {
            model: Project,
            include: [
              {
                model: Gallery,
                as: 'galleries',
              },
            ],
          },
          {
            model: Product,
          },
        ],
      });
      res.status(200).json(projectProducts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Get a single ProjectProduct association by ID
const getProjectProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const projectProduct = await ProjectProduct.findByPk(id, {
        include: [
            {
              model: Project,
              include: [
                {
                  model: Gallery,
                  as: 'galleries',
                },
              ],
            },
            {
              model: Product,
            },
          ],
      });
  
      if (!projectProduct) {
        return res.status(404).json({ error: 'ProjectProduct not found' });
      }
  
      res.status(200).json(projectProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Update a ProjectProduct association
const updateProjectProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId, productId } = req.body;
    const projectProduct = await ProjectProduct.findByPk(id);
    if (!projectProduct) {
      return res.status(404).json({ error: 'ProjectProduct not found' });
    }
    projectProduct.projectId = projectId;
    projectProduct.productId = productId;
    await projectProduct.save();
    res.status(200).json(projectProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ProjectProduct association
const deleteProjectProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const projectProduct = await ProjectProduct.findByPk(id);
    if (!projectProduct) {
      return res.status(404).json({ error: 'ProjectProduct not found' });
    }
    await projectProduct.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjectWithGalleriesAndProducts = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the project by its ID, including galleries
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Gallery,
          as: 'galleries',
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Find all ProjectProducts for the project
    const projectProducts = await ProjectProduct.findAll({
      where: { projectId: id },
      include: [
        {
          model: Product,
        },
      ],
    });

    // Extract products from projectProducts
    const products = projectProducts.map(pp => pp.Product);

    // Add products array to the project object
    project.dataValues.products = products;

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProjectProduct,
  getAllProjectProducts,
  getProjectProductById,
  updateProjectProduct,
  deleteProjectProduct ,
  getProjectWithGalleriesAndProducts
};
