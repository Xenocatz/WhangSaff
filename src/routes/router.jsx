import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "../App";
import WhangSaff from "../pages/WhangSaff";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { motion } from "framer-motion";

const Routes = () => {
  const location = useLocation();
  const routes = useRoutes([
    { path: "/", element: <App />, key: "home" },
    { path: "/whangsaff", element: <WhangSaff />, key: "whangsaff" },
    { path: "/login", element: <LoginPage />, key: "login" },
    { path: "/register", element: <RegisterPage />, key: "register" },
  ]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname}>{routes}</motion.div>
    </AnimatePresence>
  );
};

export default Routes;
