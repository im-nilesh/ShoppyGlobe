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
    if (quantity === 1) {
      return;
    }

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
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 flex flex-col md:flex-row items-center gap-6">
      <img
        src="https://placehold.co/150x150?text=Product"
        alt={product.name}
        className="w-32 h-32 object-contain"
      />

      <div className="flex-1">
        <h2 className="text-xl font-semibold">{product.name}</h2>

        <p className="text-gray-500 mt-2">{product.description}</p>

        <h3 className="text-blue-600 font-bold text-lg mt-3">
          ₹{product.price}
        </h3>

        <p className="text-gray-500 mt-2">
          Subtotal ₹{product.price * quantity}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          -
        </button>

        <span className="text-lg font-semibold w-8 text-center">
          {quantity}
        </span>

        <button
          onClick={handleIncrement}
          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
