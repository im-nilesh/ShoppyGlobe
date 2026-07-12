import { updateCartItem, deleteCartItem } from "../services/cartServices";

function CartItem({ item, fetchCart }) {
  const { product, quantity, _id } = item;

  async function handleIncrement() {
    try {
      await updateCartItem(_id, quantity + 1);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update cart");
    }
  }

  async function handleDecrement() {
    if (quantity === 1) return;

    try {
      await updateCartItem(_id, quantity - 1);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update cart");
    }
  }

  async function handleDelete() {
    try {
      await deleteCartItem(_id);
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove item");
    }
  }

  return (
    <div className="glass rounded-3xl p-6 flex flex-col lg:flex-row gap-6 items-center transition-all duration-300 hover:border-blue-500/30">
      {/* Image */}
      <div className="flex-shrink-0 bg-slate-900 rounded-2xl p-5">
        <img
          src="https://placehold.co/150x150?text=Product"
          alt={product.name}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold text-white">{product.name}</h2>

        <p className="text-slate-400 mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-wrap items-center gap-5 mt-5">
          <span className="text-2xl font-bold text-blue-400">
            ₹{product.price}
          </span>

          <span className="text-slate-500">Qty: {quantity}</span>

          <span className="text-emerald-400 font-medium">
            Subtotal ₹{(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center rounded-xl bg-white/5 border border-white/10 overflow-hidden">
          <button
            onClick={handleDecrement}
            className="w-11 h-11 text-xl text-white hover:bg-white/10 transition cursor-pointer"
          >
            −
          </button>

          <span className="w-12 text-center text-white font-semibold">
            {quantity}
          </span>

          <button
            onClick={handleIncrement}
            className="w-11 h-11 text-xl text-white hover:bg-white/10 transition cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="w-full rounded-xl bg-red-500/90 hover:bg-red-600 transition py-2 px-5 text-white font-medium cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
