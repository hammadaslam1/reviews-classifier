import Products from "../models/categoryModel.js";
import mongoose from "mongoose";

export const getCategories = (req, res, next) => {
  console.log("Getting categories...");
  Products.find()
    .then((category) => res.status(200).json(category))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "item not found!" });
  }
  const category = await Products.findById(id);
  if (!category) {
    return res.status(404).json({ error: "item not found!" });
  }
  res.status(200).json(category);
};
