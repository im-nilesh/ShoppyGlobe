import express from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCartItems);
router.post("/", protect, addToCart);
router.put("/:id", protect, updateCartItem);
router.delete("/:id", protect, deleteCartItem);

export default router;
