const Item = require("../models/itemsModel");
const supabase = require("../config/supabaseClient");
const { randomUUID } = require("crypto");

const getItems = async (req, res) => {
  try {
    const items = await Item.getAllItems();

    // Get default incognito icon public URL
    const { data: defaultImageData } = supabase.storage
      .from("testimonials")
      .getPublicUrl("witnesses/incognito-icon.png");

    const defaultImage = defaultImageData.publicUrl;

    // Replace null image_url with fallback
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
    const file = req.file; // multer puts uploaded file here

    let imageUrl = null;

    if (file) {
      try {
        // Generate unique filename inside witnesses/ folder
        const fileName = `witnesses/${randomUUID()}-${file.originalname}`;

        // Upload file to Supabase
        const { error: uploadError } = await supabase.storage
          .from("testimonials")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data } = supabase.storage
          .from("testimonials")
          .getPublicUrl(fileName);

        imageUrl = data.publicUrl;
      } catch (uploadErr) {
        console.error("Supabase upload failed:", uploadErr);
        imageUrl = null; // fallback handled in GET
      }
    }

    // Insert into DB (works even if imageUrl = null)
    const newItem = await Item.createItem(name, address, message, imageUrl);

    // Apply fallback immediately in the response
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
