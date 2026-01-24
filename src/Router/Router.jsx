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
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
    ],
  },
]);

export default router;
