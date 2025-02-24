import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import App from "../App";
import WhangSaff from "../pages/WhangSaff";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatsSection from "../component/layout/chatsSection";
import WelcomePage from "../component/layout/welcomePage";
import { auth } from "../Config/firebase";

import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={location.pathname}>
        <Routes location={location}>
          <Route index element={<App />} />
          <Route
            path="whangsaff"
            element={
              <ProtectedRoute>
                <WhangSaff />
              </ProtectedRoute>
            }
          >
            <Route index element={<WelcomePage />} />
            <Route path="chats/:username" element={<ChatsSection />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppRoutes;
