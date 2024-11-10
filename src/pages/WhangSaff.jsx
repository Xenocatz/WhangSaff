import ChatsSection from "../component/layout/chatsSection";
import ContactsSection from "../component/layout/contact";

export default function WhangSaff() {
  const isMobile = window.innerWidth < 1024;
  return (
    <div className="h-screen font-poppins lg:flex">
      <ContactsSection />
      <ChatsSection />
    </div>
  );
}
