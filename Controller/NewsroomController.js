// NewsroomController.js
const Newsroom = require('../Models/Newsroom');
const Product = require('../Models/Products');

// Create a new newsroom
const createNewsroom = async (req, res) => {
  try {
    const { name, productId } = req.body;

    if (!name || !productId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newsroom = await Newsroom.create({
      name,
      ProductId: productId
    });

    res.status(201).json(newsroom);
  } catch (error) {
    console.error("Error creating newsroom:", error);
    res.status(500).json({ message: "Failed to create newsroom" });
  }
};

// Get all newsrooms
const getAllNewsrooms = async (req, res) => {
  try {
    const newsrooms = await Newsroom.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(newsrooms);
  } catch (error) {
    console.error("Error fetching newsrooms:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a newsroom by ID
const getNewsroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsroom = await Newsroom.findByPk(id, {
      include: [{ model: Product }]
    });

    if (!newsroom) {
      return res.status(404).json({ message: 'Newsroom not found' });
    }

    res.status(200).json(newsroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a newsroom
const updateNewsroom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, productId } = req.body;

    const newsroom = await Newsroom.findByPk(id);

    if (!newsroom) {
      return res.status(404).json({ message: 'Newsroom not found' });
    }

    await newsroom.update({ name, ProductId: productId });

    res.status(200).json(newsroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a newsroom
const deleteNewsroom = async (req, res) => {
  try {
    const { id } = req.params;

    const newsroom = await Newsroom.findByPk(id);

    if (!newsroom) {
      return res.status(404).json({ message: 'Newsroom not found' });
    }

    await newsroom.destroy();

    res.status(200).json({ message: 'Newsroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewsroom,
  getAllNewsrooms,
  getNewsroomById,
  updateNewsroom,
  deleteNewsroom,
};
