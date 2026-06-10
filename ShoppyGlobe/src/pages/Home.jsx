import "../pages/Home.css";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

function Home() {
  const { products, loading, error } = useProducts();
  console.log(products);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <h1>Home Page</h1>

      <div className="product-container">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </>
  );
}
export default Home;
