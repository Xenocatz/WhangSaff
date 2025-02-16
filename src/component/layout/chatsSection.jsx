import ChatsHeader from "../group/chats/chatsHeader";
import ChatsRoom from "../group/chats/chatsRoom";
import bgChat from "../../assets/bgChats/bg1.jpg";

export default function ChatsSection() {
  return (
    <section
      className="relative top-0 right-0 z-10 flex flex-col w-full h-screen bg-no-repeat bg-cover lg:relative lg:flex-1 "
      style={{
        backgroundImage: `url(${bgChat})`,
      }}
    >
      <ChatsHeader />
      <ChatsRoom />
    </section>
  );
}
