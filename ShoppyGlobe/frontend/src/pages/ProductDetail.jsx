import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Extract product ID from URL parameters
  const { id } = useParams();

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center">
          <img
            src="https://placehold.co/500x500?text=Product"
            alt={product.name}
            loading="lazy"
            className="w-full h-96 object-contain p-8"
          />
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <h2 className="text-3xl font-bold text-blue-600 mb-6">
            ₹{product.price}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <p className="text-gray-500 mb-6">
            Stock Available : {product.stockQuantity}
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-fit">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;
