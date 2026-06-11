import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartSlice";

function CartItem({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 flex flex-col md:flex-row items-center gap-6">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-32 h-32 object-contain"
        loading="lazy"
      />
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>

        <h3 className="text-blue-600 font-bold text-lg mt-2">
          ₹{product.price}
        </h3>

        <p className="text-gray-500 mt-1">
          Subtotal: ₹{product.price * product.quantity}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* // Decrease quantity of selected product */}
        <button
          onClick={() => {
            dispatch(decrementQuantity(product.id));
          }}
          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
        >
          -
        </button>
        <span className="text-lg font-semibold min-w-[30px] text-center">
          {product.quantity}
        </span>
        {/* // Increase quantity of selected product */}
        <button
          onClick={() => {
            dispatch(incrementQuantity(product.id));
          }}
          className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
        >
          +
        </button>
      </div>
      {/* // Remove product from cart */}
      <button
        onClick={() => {
          dispatch(removeFromCart(product.id));
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
}
export default CartItem;
