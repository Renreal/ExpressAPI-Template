const Item = require("../models/itemsModel");

const getItems = async (req, res) => {
  try {
    const items = await Item.getAllItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

const addItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = await Item.createItem(name, description);
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = { getItems, addItem };
//   Controller functions for handling item-related requests