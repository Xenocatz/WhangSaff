import { auth } from "../Config/firebase";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import WhangSaff from "../pages/WhangSaff";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatsSection from "../component/layout/chatsSection";
import WelcomePage from "../component/layout/welcomePage";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user ? true : false);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <motion.div key={location.pathname}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location}>
          <Route
            path="/"
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
      </AnimatePresence>
    </motion.div>
  );
};

export default AppRoutes;
