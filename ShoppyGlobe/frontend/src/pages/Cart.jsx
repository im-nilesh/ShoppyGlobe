import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, loading, fetchCart } = useCart();

  const total = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 flex justify-center">
        <div className="glass px-8 py-6">
          <h1 className="text-slate-300 text-xl">Loading Cart...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-white">Shopping Cart</h1>

        <p className="text-slate-400 mt-2">
          Review your selected products before checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="glass rounded-3xl p-16 text-center">
          <h2 className="text-3xl font-semibold text-white">
            Your cart is empty
          </h2>

          <p className="text-slate-400 mt-3">
            Looks like you haven't added anything yet.
          </p>

          <Link to="/">
            <button className="mt-8 btn-primary">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}

          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} fetchCart={fetchCart} />
            ))}
          </div>

          {/* Summary */}

          <div className="glass rounded-3xl p-8 h-fit sticky top-28">
            <h2 className="text-2xl font-bold text-white mb-8">
              Order Summary
            </h2>

            <div className="flex justify-between text-slate-400 mb-5">
              <span>Total Products</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="border-t border-white/10 pt-6 flex justify-between items-center">
              <span className="text-xl font-semibold text-white">Total</span>

              <span className="text-3xl font-bold text-blue-400">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <Link to="/checkout">
              <button className="btn-primary w-full mt-8 py-3">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
