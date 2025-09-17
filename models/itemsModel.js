const pool = require("../config/db");

const getAllItems = async () => {
  const result = await pool.query("SELECT * FROM items");
  return result.rows;
};

const createItem = async (name, description) => {
  const result = await pool.query(
    "INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *",
    [name, description]
  );
  return result.rows[0];
};

module.exports = { getAllItems, createItem };
//   Database interaction functions for 'items' table