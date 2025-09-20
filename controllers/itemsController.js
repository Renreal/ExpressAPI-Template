const Item = require("../models/itemsModel");

const getItems = async (req, res) => {
  try {
    const items = await Item.getAllItems();
    res.json(items);
  } catch (err) {
    console.error("DB ERROR:", err); // log full error in Vercel
    res.status(500).json({ error: err.message }); // send error reason
  }
};

const addItem = async (req, res) => {
  console.log("Incoming body:", req.body);

  const { name, address, message  } = req.body;
  try {
    const newItem = await Item.createItem(name, address, message);
    res.status(201).json(newItem);
  } catch (err) {
    console.error("DB ERROR:", err); // log full error in Vercel
    res.status(500).json({ error: err.message }); // send error reason
  }
};

module.exports = { getItems, addItem };
//   Controller functions for handling item-related requests
