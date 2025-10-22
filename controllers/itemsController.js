const Item = require("../models/itemsModel");
const supabase = require("../config/supabaseClient");
const { randomUUID } = require("crypto");

const getItems = async (req, res) => {
  try {
    const items = await Item.getAllItems();

    const { data: defaultImageData } = supabase.storage
      .from("testimonials")
      .getPublicUrl("witnesses/incognito-icon.png");

    const defaultImage = defaultImageData.publicUrl;

    const itemsWithFallback = items.map((item) => ({
      ...item,
      image_url: item.image_url || defaultImage,
    }));

    res.json(itemsWithFallback);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, address, message } = req.body;
    const file = req.file;

    let imageUrl = null;

    if (file) {
      try {
        const fileName = `witnesses/${randomUUID()}-${file.originalname}`;

        const { error: uploadError } = await supabase.storage
          .from("testimonials")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("testimonials")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      } catch (uploadErr) {
        console.error("Supabase upload failed:", uploadErr);
        imageUrl = null;
      }
    }

    const newItem = await Item.createItem(name, address, message, imageUrl);

    const { data: defaultImageData } = supabase.storage
      .from("testimonials")
      .getPublicUrl("witnesses/incognito-icon.png");

    res.status(201).json({
      ...newItem,
      image_url: newItem.image_url || defaultImageData.publicUrl,
    });
  } catch (err) {
    console.error("UPLOAD/DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getItems, addItem };
