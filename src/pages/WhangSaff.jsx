import ChatsSection from "../component/layout/chatsSection";
import ContactsSection from "../component/layout/contacts";

export default function WhangSaff() {
  const isMobile = window.innerWidth < 1024;
  return (
    <div className="flex h-screen font-poppins">
      <ContactsSection />
      <ChatsSection />
    </div>
  );
}
