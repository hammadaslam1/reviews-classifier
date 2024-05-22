import mongoose from "mongoose";
import getProductModel from "../models/categoryModel.js";

export const getCategories = async (req, res, next) => {
  try {
    const { category } = req.params;
    const ProductModel = getProductModel(category);
    const categories = await ProductModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategory = async (req, res) => {
  const { id, category } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Item not found!" });
  }
  try {
    const ProductModel = getProductModel(category);
    const categoryItem = await ProductModel.findById(id);
    if (!categoryItem) {
      return res.status(404).json({ error: "Item not found!" });
    }
    res.status(200).json(categoryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
