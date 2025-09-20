const pool = require("../config/db");

const getAllItems = async () => {
  const result = await pool.query("SELECT * FROM items");
  return result.rows;
};

const createItem = async (name, address, message) => {
  const result = await pool.query(
    "INSERT INTO items (name, address, message) VALUES ($1, $2, $3) RETURNING *",
    [name, address, message]
  );
  return result.rows[0];
};

module.exports = { getAllItems, createItem };
//   Database interaction functions for 'items' table