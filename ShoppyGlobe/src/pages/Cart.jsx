import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

function Cart() {
  // Get cart items from Redux store
  const cart = useSelector((state) => state.cart);
  // console.log(cart);

  const dispatch = useDispatch();

  // Calculate total cart value
  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is empty
          </h2>

          <Link to="/">
            <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cart.map((product) => {
              return <CartItem key={product.id} product={product} />;
            })}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </div>
            // Clear all products from cart
            <button
              onClick={() => {
                dispatch(clearCart());
              }}
              className="w-full mt-6 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <Link to="/checkout">
              <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
