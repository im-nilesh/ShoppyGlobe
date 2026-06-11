import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { useSelector } from "react-redux";

function Home() {
  const searchTerm = useSelector((state) => state.search);
  const { products, loading, error } = useProducts();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }
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
