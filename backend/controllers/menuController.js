const Menu = require("../models/Menu");

// Add menu (Admin)
const addMenu = async (req, res) => {
  try {
    const { date, breakfast, lunch, dinner } = req.body;

    const menu = await Menu.create({
      date,
      breakfast,
      lunch,
      dinner,
    });

    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all menus (Everyone)
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ date: -1 });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE MENU
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE MENU
const deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMenu, getMenus, updateMenu, deleteMenu };