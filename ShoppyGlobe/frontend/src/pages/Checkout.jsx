import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/orderServices";

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

  async function handleOrder() {
    if (!name.trim() || !email.trim() || !address.trim()) {
      return alert("Please fill all the fields");
    }

    try {
      setPlacing(true);

      const shippingAddress = `${name} (${email})\n${address}`;
      const response = await placeOrder(shippingAddress);

      alert(response.message || "Order Placed");

      // Cart is cleared server-side once the order is placed;
      // refresh local cart state so the header badge updates too.
      await fetchCart();

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order",
      );
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Details */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="5"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {cartItems.length === 0 ? (
            <h3 className="text-gray-500">Your Cart is Empty</h3>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="border-b pb-4">
                  <h4 className="font-semibold">{item.product.name}</h4>

                  <p className="text-gray-600">Price: ₹{item.product.price}</p>

                  <p className="text-gray-600">Quantity: {item.quantity}</p>

                  <p className="font-medium">
                    Subtotal: ₹{item.product.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t mt-6 pt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total</h2>

            <h2 className="text-3xl font-bold text-blue-600">
              ₹{total.toFixed(2)}
            </h2>
          </div>

          <button
            onClick={handleOrder}
            disabled={cartItems.length === 0 || placing}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 cursor-pointer"
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
