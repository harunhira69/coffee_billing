import { createBrowserRouter } from "react-router";

// Layouts
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Route Guards
import PrivateRoute from "../components/RouteGuards/PrivateRoute";
import PublicRoute from "../components/RouteGuards/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "order-success",
        element: (
          <PrivateRoute>
            <OrderSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
