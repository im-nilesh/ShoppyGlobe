import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const reponse = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await reponse.json();
        setProduct(data);
        console.log(data);
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
    <>
      <h1>Product Details</h1>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt="" />
      <h3>{product.description}</h3>
      <h2>{product.price}</h2>
    </>
  );
}
export default ProductDetails;
