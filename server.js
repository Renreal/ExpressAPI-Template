const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// get and create data to items table
const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

// keeps track of visitors
const visitorsRouter = require("./routes/visitors");
app.use("/visitors", visitorsRouter);

// crud example for user-specific data
const userDataRouter = require("./routes/userData");
app.use("/users", userDataRouter);


// Only listen when running locally
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

// Export for Vercel
module.exports = app;
