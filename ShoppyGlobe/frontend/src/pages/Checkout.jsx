import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createPaymentOrder, verifyPayment } from "../services/paymentServices";

function Checkout() {
  const { cartItems, fetchCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [placing, setPlacing] = useState(false);

  const total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  async function handlePayment() {
    if (!name.trim() || !email.trim() || !address.trim()) {
      return alert("Please fill all the fields");
    }

    try {
      setPlacing(true);

      const shippingAddress = `${name} (${email})\n${address}`;

      // Create Razorpay Order
      const orderResponse = await createPaymentOrder(shippingAddress);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: orderResponse.razorpayOrder.amount,

        currency: orderResponse.razorpayOrder.currency,

        name: "ShoppyGlobe",

        description: "Order Payment",

        order_id: orderResponse.razorpayOrder.id,

        prefill: {
          name,
          email,
        },

        theme: {
          color: "#2563EB",
        },

        handler: async function (response) {
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shippingAddress,
            });

            alert(verifyResponse.message);

            await fetchCart();

            navigate("/");
          } catch (error) {
            alert(
              error.response?.data?.message ||
                error.message ||
                "Payment Verification Failed",
            );
          }
        },

        modal: {
          ondismiss() {
            alert("Payment Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to initiate payment",
      );
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">Checkout</h1>

        <p className="text-slate-400 mt-2">
          Complete your purchase securely with Razorpay.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Details */}

        <div className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-8">
            Customer Details
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-dark"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark"
            />

            <textarea
              rows="6"
              placeholder="Shipping Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-dark resize-none"
            />
          </div>
        </div>

        {/* Summary */}

        <div className="glass rounded-3xl p-8 h-fit sticky top-28">
          <h2 className="text-2xl font-semibold text-white mb-8">
            Order Summary
          </h2>

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b border-white/10 pb-4"
              >
                <div>
                  <h3 className="text-white font-medium">
                    {item.product.name}
                  </h3>

                  <p className="text-slate-500 text-sm">Qty: {item.quantity}</p>
                </div>

                <span className="text-blue-400 font-semibold">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 flex justify-between items-center">
            <span className="text-xl text-white font-semibold">Total</span>

            <span className="text-3xl font-bold text-blue-400">
              ₹{total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handlePayment}
            disabled={placing || cartItems.length === 0}
            className="
            w-full
            mt-8
            py-4
            rounded-2xl
            bg-blue-600
            hover:bg-blue-500
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            font-semibold
            text-white
            cursor-pointer
          "
          >
            {placing ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
