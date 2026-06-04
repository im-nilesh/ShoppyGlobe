import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import ProductDetails from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
