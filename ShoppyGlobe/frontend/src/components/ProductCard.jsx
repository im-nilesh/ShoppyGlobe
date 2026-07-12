import { Link } from "react-router-dom";
import { addToCart } from "../services/cartServices";

function ProductCard({ product }) {
  async function handleAddToCart() {
    try {
      await addToCart(product._id, 1);

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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
      <Link to={`/product/${product._id}`} className="flex flex-col grow">
        <img
          src="https://placehold.co/300x250?text=Product"
          alt={product.name}
          loading="lazy"
          className="w-full h-52 object-contain p-6"
        />

        <div className="p-4 grow">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {product.description}
          </p>

          <h3 className="text-2xl font-bold text-blue-600 mt-3">
            ₹{product.price}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Stock: {product.stockQuantity}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
