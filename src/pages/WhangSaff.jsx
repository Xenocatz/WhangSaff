import { useDispatch } from "react-redux";
import ContactsSection from "../component/layout/contacts";
import { useEffect } from "react";
import { listenToAuthChanges } from "../redux/userSlice";
import { Outlet } from "react-router-dom";

export default function WhangSaff() {
  const dispatch = useDispatch();

  // dapetin currentUser
  useEffect(() => {
    const unsubscribe = dispatch(listenToAuthChanges());

    if (unsubscribe && typeof unsubscribe === "function")
      return () => unsubscribe();
  }, []);

  const isMobile = window.innerWidth < 1024;
  return (
    <div className="flex h-screen font-poppins">
      <ContactsSection />
      <Outlet />
    </div>
  );
}
