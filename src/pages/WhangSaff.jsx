import { useDispatch } from "react-redux";
import ChatsSection from "../component/layout/chatsSection";
import ContactsSection from "../component/layout/contacts";
import { useEffect } from "react";
import { listenToAuthChanges } from "../redux/userSlice";
import { Outlet } from "react-router-dom";

export default function WhangSaff() {
  const dispatch = useDispatch();

  // dapetin currentUser
  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  const isMobile = window.innerWidth < 1024;
  return (
    <div className="flex h-screen font-poppins">
      <ContactsSection />
      <Outlet />
    </div>
  );
}
