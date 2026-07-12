import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Extract product ID from URL parameters
  const { id } = useParams();
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

  // Fetch individual product details whenever ID changes
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        // Call DummyJSON API to get product details
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [id]);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Product Image */}
        <div className="glass rounded-3xl p-10 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full max-w-md object-contain transition duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="glass rounded-3xl p-10">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-500/15 text-blue-400 text-sm font-medium">
            Premium Product
          </span>

          <h1 className="text-5xl font-bold text-white mt-5">{product.name}</h1>

          <p className="mt-6 text-slate-400 leading-8">{product.description}</p>

          <div className="mt-8 flex items-center gap-6">
            <h2 className="text-4xl font-bold text-blue-400">
              ₹{product.price}
            </h2>

            <span className="px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-400 text-sm">
              {product.stockQuantity} In Stock
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="
            mt-10
            px-8
            py-4
            rounded-2xl
            bg-blue-600
            hover:bg-blue-500
            transition
            font-semibold
            text-white
            cursor-pointer
            shadow-lg
        "
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
