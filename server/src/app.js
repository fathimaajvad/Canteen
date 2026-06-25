const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");

const app = express();

// ===============================
// Middlewares
// ===============================

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ===============================
// Serve Uploaded Images
// ===============================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.send("Campus Bites Backend Running");
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/foods", foodRoutes);

// ===============================

module.exports = app;