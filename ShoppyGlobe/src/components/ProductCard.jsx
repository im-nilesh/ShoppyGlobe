import "../components/ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt="product-image" />
      <h3>{product.price}</h3>
    </div>
  );
}
export default ProductCard;
