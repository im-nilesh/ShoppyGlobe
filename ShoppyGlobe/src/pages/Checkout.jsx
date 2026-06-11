import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  function handleOrder() {
    alert("Order Placed");

    dispatch(clearCart());

    setTimeout(() => {
      navigate("/");
    }, 1000);
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

          {cart.length === 0 ? (
            <h3 className="text-gray-500">Your Cart is Empty</h3>
          ) : (
            <div className="space-y-4">
              {cart.map((product) => (
                <div key={product.id} className="border-b pb-4">
                  <h4 className="font-semibold">{product.title}</h4>

                  <p className="text-gray-600">Price: ₹{product.price}</p>

                  <p className="text-gray-600">Quantity: {product.quantity}</p>

                  <p className="font-medium">
                    Subtotal: ₹{product.price * product.quantity}
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
            disabled={cart.length === 0}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
