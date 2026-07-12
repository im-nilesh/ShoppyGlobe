import express from "express";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Razorpay Order
router.post("/create-order", protect, createPaymentOrder);

// Verify Payment
router.post("/verify", protect, verifyPayment);

export default router;
