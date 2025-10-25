const Users = require("../models/userDataModel");
const supabase = require("../config/supabaseClient");


const getUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Missing authorization token" });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user)
      return res.status(401).json({ error: "Invalid or expired token" });

    const userData = await Users.getUserDataByUserId(user.id);
    res.status(200).json(userData);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: err.message });
  }
};

const addUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Missing authorization token" });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user_id = user.id;
    const { timestamp, position, date, platform, status, location, company } =
      req.body;

    const newData = await Users.createuserData(
      user_id,
      timestamp,
      position,
      date,
      platform,
      status,
      location,
      company
    );
    res.status(201).json(newData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const updateUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Missing authorization token" });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user)
      return res.status(401).json({ error: "Invalid or expired token" });

    const record_id = req.params.id; // from /users/:id
    const updates = req.body;

    const updated = await Users.updateUserData(user.id, record_id, updates);
    if (!updated)
      return res
        .status(404)
        .json({ error: "Record not found or not authorized" });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ error: err.message });
  }
};

const deleteUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Missing authorization token" });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user)
      return res.status(401).json({ error: "Invalid or expired token" });

    const record_id = req.params.id;

    const deleted = await Users.deleteUserData(user.id, record_id);
    if (!deleted)
      return res
        .status(404)
        .json({ error: "Record not found or not authorized" });

    res.status(200).json({ message: "Record deleted successfully", deleted });
  } catch (err) {
    console.error("Error deleting user data:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getUserData,
  addUserData,
  updateUserData,
  deleteUserData,
};
