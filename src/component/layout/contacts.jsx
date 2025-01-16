import Contact from "../element/contact";
import ContactAtas from "../group/contact/contactAtas";
import SearchAndAdd from "../group/contact/searchAndAdd";

export default function ContactsSection() {
  return (
    <div className="flex flex-col h-full border-r shadow-2xl border-r-lightBlue/25 bg-canvas lg:w-80">
      {/* atas */}
      <div className="flex flex-col gap-2 px-5 py-3 lg:gap-1 ">
        <ContactAtas />
        <SearchAndAdd />
      </div>
      {/* bawah */}
      <div className="flex flex-col flex-1 gap-3 px-3 py-2 overflow-y-auto">
        <Contact
          nama={"Kaoruko Waguri"}
          chats={"Halo Faiz:)"}
          lastMessage={"06:00"}
          chatList={true}
        />
        <Contact
          nama={"LoneCatz dawdwadawdwda"}
          chats={"Hadwdwadwdwdawdwlowdwaddwadawd "}
          chatList={true}
          lastMessage={"20:00"}
        />
      </div>
    </div>
  );
}
