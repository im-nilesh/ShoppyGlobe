import { useEffect, useState } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Custom hook for fetching product data
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Fetch products from DummyJSON API
        const response = await fetch("https://dummyjson.com/products");

        const data = await response.json();
        // Update products state with API response
        setProducts(data.products);
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
