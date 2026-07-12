import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  async function handleAddToCart() {
    try {
      await addToCart(product._id);
      alert("Product added to cart");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product",
      );
    }
  }

  return (
    <div
      className="
        group
        rounded-3xl
        overflow-hidden
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        hover:border-blue-500/40
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-[0_20px_50px_rgba(59,130,246,.15)]
      "
    >
      <Link to={`/product/${product._id}`}>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-48 object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h2 className="text-lg font-semibold text-white line-clamp-2">
            {product.name}
          </h2>

          <p className="mt-3 text-sm text-slate-400 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-400">
              ₹{product.price}
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400">
              {product.stockQuantity} in stock
            </span>
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCart}
          className="
            w-full
            py-3
            rounded-xl
            font-semibold
            bg-blue-600
            hover:bg-blue-500
            text-white
            transition
            cursor-pointer
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
