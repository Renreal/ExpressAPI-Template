const pool = require("../config/db");


const getUserDataByUserId = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM userdata WHERE user_id = $1 ORDER BY timestamp DESC",
    [user_id]
  );
  return result.rows;
};

const createuserData = async (
  user_id,
  timestamp,
  position,
  date,
  platform,
  status,
  location,
  company
) => {
  const result = await pool.query(
    `INSERT INTO userdata (user_id, timestamp, position, date, platform, status, location, company)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
   RETURNING *`,
    [user_id, timestamp, position, date, platform, status, location, company]
  );

  return result.rows[0];
};

const updateUserData = async (user_id, record_id, updates) => {
  const { timestamp, position, date, platform, status, location, company } =
    updates;

  const result = await pool.query(
    `UPDATE userdata
     SET timestamp = $1,
         position = $2,
         date = $3,
         platform = $4,
         status = $5,
         location = $6,
         company = $7
     WHERE id = $8 AND user_id = $9
     RETURNING *`,
    [
      timestamp,
      position,
      date,
      platform,
      status,
      location,
      company,
      record_id,
      user_id,
    ]
  );

  return result.rows[0];
};

const deleteUserData = async (user_id, record_id) => {
  const result = await pool.query(
    `DELETE FROM userdata
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [record_id, user_id]
  );

  return result.rows[0]; 
};

module.exports = {
  getUserDataByUserId,
  createuserData,
  updateUserData,
  deleteUserData,
};
//   Model functions for interacting with the userData table
