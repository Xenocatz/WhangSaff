import { div } from "framer-motion/client";
import Contact from "../element/contact";
import ContactAtas from "../group/contactAtas";
import SearchAndAdd from "../group/searchAndAdd";

export default function ContactsSection() {
  return (
    <div className="flex flex-col h-full bg-darkbg">
      {/* atas */}
      <div className="flex flex-col gap-2 px-5 py-3 lg:gap-1 rounded-b-3xl bg-mediumDark">
        <ContactAtas />
        <SearchAndAdd />
      </div>
      {/* bawah */}
      <div className="flex flex-col flex-1 gap-3 px-3 py-2 overflow-y-scroll">
        <Contact
          nama={"Kaoruko Waguri"}
          chats={"pagi seng ku"}
          lastMessage={"06:00"}
          chatList={true}
        />
        <Contact
          nama={"LoneCatz dawdwadawdwda"}
          chats={"Hadwdwadwdwdawdwlowdwaddwadawd "}
          chatList={true}
          lastMessage={"20:00"}
        />
        <Contact nama={"LoneCatz"} chats={"Halo"} chatList={true} />
        <Contact nama={"LoneCatz"} chats={"Halo"} chatList={true} />
        <Contact nama={"LoneCatz"} chats={"Halo"} chatList={true} />
        <Contact nama={"LoneCatz"} chats={"Halo"} chatList={true} />
        <Contact nama={"LoneCatz"} chats={"Halo"} chatList={true} />
      </div>
    </div>
  );
}
