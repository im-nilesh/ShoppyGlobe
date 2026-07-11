import { useEffect, useState } from "react";
import api from "../services/api";
function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Custom hook for fetching product data
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch products from DummyJSON API
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        // Handle API errors
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;
