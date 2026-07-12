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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows="5"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id} className="border-b py-3">
              <h3 className="font-semibold">{item.product.name}</h3>

              <p>₹{item.product.price}</p>

              <p>Qty : {item.quantity}</p>

              <p>₹{item.product.price * item.quantity}</p>
            </div>
          ))}

          <div className="flex justify-between mt-6 text-2xl font-bold">
            <span>Total</span>

            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={placing || cartItems.length === 0}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {placing ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
