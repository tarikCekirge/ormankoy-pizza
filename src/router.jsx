import { createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";

export const router = createBrowserRouter(
  [

    {
      element: <AppLayout />,
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/odeme",
          element: <Cart />,
        },
        {
          path: "/siparis-ver",
          element: <CreateOrder />,
        },
        {
          path: "/siparis/:orderId",
          element: <Order />,
        },
      ]

    }

  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);
