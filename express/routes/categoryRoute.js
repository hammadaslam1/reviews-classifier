import express from "express";
import {
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";
const router = express.Router();

router.get("/:category", getCategories);

router.get("/:category/:id", getCategory);

export default router;
