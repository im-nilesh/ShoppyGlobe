import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { useSelector } from "react-redux";

// Main page of the app where all the products are being listed

function Home() {
  // Get search term from Redux store
  const searchTerm = useSelector((state) => state.search);

  // Fetch products using custom hook
  const { products, loading, error } = useProducts();

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Display loading state while fetching products
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Display error message if API call fails
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-8">Home Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
export default Home;
