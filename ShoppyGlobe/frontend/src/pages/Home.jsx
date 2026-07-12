import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { useSelector } from "react-redux";

function Home() {
  const searchTerm = useSelector((state) => state.search);

  const { products, loading, error } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="glass px-8 py-6">
          <p className="text-slate-300 text-lg">Loading Products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="glass px-8 py-6 border border-red-500/30">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto">
      {/* Hero */}
      <div className="mb-12">
        <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-2">
          Welcome to
        </p>

        <h1 className="text-5xl font-bold text-white">
          Shoppy<span className="text-blue-500">Globe</span>
        </h1>

        <p className="text-slate-400 mt-4 max-w-2xl">
          Discover premium products with a clean shopping experience.
        </p>
      </div>

      {/* Products */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Home;
