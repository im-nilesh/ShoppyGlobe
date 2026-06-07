import "../components/ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <>
      <Link to={`/product/${product.id}`}>
        <div className="product-card">
          <h2>{product.title}</h2>
          <img src={product.thumbnail} alt="product-image" />
          <h3>{product.price}</h3>
        </div>
      </Link>
    </>
  );
}
export default ProductCard;
