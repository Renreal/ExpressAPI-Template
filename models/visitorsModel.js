const pool = require("../config/db");

const getCount = async () => {
  const result = await pool.query("SELECT count FROM visitors WHERE id = 1");
  return result.rows[0];
};

const incrementCount = async () => {
  const result = await pool.query(
    "UPDATE visitors SET count = count + 1 WHERE id = 1 RETURNING count"
  );
  return result.rows[0];
};

module.exports = { getCount, incrementCount };
