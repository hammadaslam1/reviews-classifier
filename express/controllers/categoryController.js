import Product from '../models/categoryModel.js'
import mongoose from "mongoose";

export const getCategories = async (req, res, next) => {
  try {
    const category = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "item not found!" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "item not found!" });
  }
  res.status(200).json(workout);
};
