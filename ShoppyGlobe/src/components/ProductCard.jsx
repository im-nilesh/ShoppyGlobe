import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="product-card">
        <Link to={`/product/${product.id}`}>
          <h2>{product.title}</h2>
          <img src={product.thumbnail} alt="product-image" loading="lazy" />
          <h3>{product.price}</h3>
        </Link>

        <button onClick={() => dispatch(addToCart(product))}>
          Add to cart
        </button>
      </div>
    </>
  );
}
export default ProductCard;
