import ChatsHeader from "../group/chats/chatsHeader";
import ChatsInput from "../group/chats/chatsInput";
import ChatsMain from "../group/chats/chatsMain";
import bgChat from "../../assets/bgChats/bg1.jpg";

export default function ChatsSection() {
  return (
    <section
      className="absolute top-0 right-0 flex flex-col w-full h-screen bg-no-repeat bg-cover lg:relative lg:flex-1 "
      style={{
        backgroundImage: `url(${bgChat})`,
      }}
    >
      <ChatsHeader />
      <ChatsMain />
      <ChatsInput />
    </section>
  );
}
