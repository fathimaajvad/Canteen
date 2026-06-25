const express = require("express");

const upload = require("../config/multer");

const {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const router = express.Router();

// GET
router.get("/", getAllFoods);

// GET BY ID
router.get("/:id", getFoodById);

// CREATE FOOD WITH IMAGE
router.post(
  "/",
  upload.single("image"),
  createFood
);

// UPDATE FOOD
router.put(
  "/:id",
  upload.single("image"),
  updateFood
);

// DELETE FOOD
router.delete("/:id", deleteFood);

module.exports = router;