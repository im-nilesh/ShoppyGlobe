import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// POST /api/payment/create-order
const createPaymentOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    for (const item of cartItems) {
      totalAmount += item.product.price * item.quantity;
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Razorpay accepts paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      razorpayOrder,
      totalAmount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/payment/verify
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cartItems) {
      const product = item.product;

      if (item.quantity > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;

      product.stockQuantity -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,

      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,

      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      orderStatus: "Processing",
    });

    await Cart.deleteMany({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Payment Successful",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createPaymentOrder, verifyPayment };
