const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const item = require("./routes/api/items");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json());
// Body parser middleware to parse JSON requests
app.use(bodyParser.urlencoded({ extended: false }));
// CORS middleware to allow cross-origin requests

// Routes
app.use("/api/items", item);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DB config
const db = require("./config/keys").db;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
