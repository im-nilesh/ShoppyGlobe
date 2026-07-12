import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));
const ProtectedRoute = lazy(() => import("../components/ProtectedRoutes"));

import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/product/:id",
        element: <ProductDetail />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/checkout",
            element: <Checkout />,
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
