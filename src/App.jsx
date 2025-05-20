import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const App = () => {
  return <RouterProvider router={router} future={router.future} />;
};

export default App;
