import { auth } from "../Config/firebase";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import WhangSaff from "../pages/WhangSaff";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ChatsSection from "../component/layout/chatsSection";
import WelcomePage from "../component/layout/welcomePage";
import GeminiRoom from "../component/layout/GeminiRoom";

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
          <Route path="gemini" element={<GeminiRoom />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
