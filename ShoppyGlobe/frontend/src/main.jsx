import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<h1>Loading...</h1>}>
            <RouterProvider router={router} />
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
