const Visitors = require("../models/visitorsModel");

const getVisitors = async (req, res) => {
  try {
    let count;
    if (req.query.onlyCount === "true") {
      count = await Visitors.getCount();
    } else {
      count = await Visitors.incrementCount();
    }
    res.json(count);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getVisitors };
