import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import WhangSaff from "../pages/WhangSaff";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/whangsaff",
    element: <WhangSaff />,
  },
]);
