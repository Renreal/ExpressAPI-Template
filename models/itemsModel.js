const pool = require("../config/db");

const getAllItems = async () => {
  const result = await pool.query("SELECT * FROM items");
  return result.rows;
};

const createItem = async (name, address, message, imageUrl) => {
  const result = await pool.query(
    "INSERT INTO items (name, address, message, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, address, message, imageUrl]
  );
  return result.rows[0];
};

module.exports = { getAllItems, createItem };
//   Model functions for interacting with the items table