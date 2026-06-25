const Food = require("../models/Food");
const Category = require("../models/Category");

// ===============================
// GET ALL FOODS
// ===============================

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// GET SINGLE FOOD
// ===============================

const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate("category");

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// CREATE FOOD
// ===============================

const createFood = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      isVeg,
      isAvailable,
      isTodaySpecial,
      preparationTime,
    } = req.body;

    const image = req.file
      ? `/uploads/foods/${req.file.filename}`
      : "";

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image,
      isVeg,
      isAvailable,
      isTodaySpecial,
      preparationTime,
    });

    res.status(201).json({
      success: true,
      message: "Food created successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// UPDATE FOOD
// ===============================

const updateFood = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = `/uploads/foods/${req.file.filename}`;
    }

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// DELETE FOOD
// ===============================

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    await Food.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};