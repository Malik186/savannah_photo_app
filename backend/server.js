require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json()); // Parses JSON requests
app.use(cors()); // Enables CORS
app.use(morgan("dev")); // Logs HTTP requests

//User routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

// Album routes
const albumRoutes = require("./src/routes/albumRoutes");
app.use("/api/albums", albumRoutes);

// Photo routes
const photoRoutes = require("./src/routes/photoRoutes");
app.use("/api/photos", photoRoutes);

// Comment routes
const commentRoutes = require("./src/routes/commentRoutes");
app.use("/api/comments", commentRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
