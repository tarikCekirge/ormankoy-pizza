import { createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder, { action as createOrderAction } from "./features/order/CreateOrder";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

export const router = createBrowserRouter(
  [

    {
      element: <AppLayout />,
      path: "/",
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
          errorElement: <Error />,
          loader: menuLoader
        },
        {
          path: "/odeme",
          element: <Cart />,
        },
        {
          path: "/siparis/yeni",
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: "/siparis/:orderId",
          element: <Order />,
          loader: orderLoader,
          errorElement: <Error />,
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
