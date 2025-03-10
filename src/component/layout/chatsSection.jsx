import ChatsHeader from "../group/chats/chatsHeader";
import ChatsRoom from "../group/chats/chatsRoom";

export default function ChatsSection() {
  return (
    <section className="container relative z-10 flex flex-col w-full h-full bg-no-repeat bg-cover bg-darkbg">
      <ChatsHeader />
      <ChatsRoom />
    </section>
  );
}
