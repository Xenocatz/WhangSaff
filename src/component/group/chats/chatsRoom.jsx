import FriendChats from "./friendChats";
import { useEffect, useRef, useState } from "react";
import ChatsInput from "./chatsInput";
import { listenToMessages } from "../../../service/userService";
import { useSelector } from "react-redux";
import MyChats from "./myChats";

export default function ChatsRoom() {
  const [messages, setMessages] = useState(null);
  const currentChatRoom = useSelector((state) => state.currentRoom.currentRoom);
  const currentUser = useSelector((state) => state.user.currentUser);
  const endaRef = useRef(null);

  const scrollToBottom = () => {
    endaRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (!currentChatRoom) return;
    const unsubscribe = listenToMessages(currentChatRoom.id, setMessages);

    return () => unsubscribe();
  }, [currentChatRoom]);

  useEffect(() => {
    scrollToBottom();
  }, [currentChatRoom, messages]);
  return (
    <div className="z-10 flex flex-col flex-1 overflow-y-hidden backdrop-blur-xl bg-canvas/10 backdrop-brightness-75 ">
      <div className="flex flex-col h-full px-2 py-2 overflow-y-auto lg:px-10 chat-scrollbar">
        {messages !== null &&
          messages.map((m) =>
            m.senderId === currentUser?.uid ? (
              <MyChats
                key={m.id}
                text={m.message}
                img={m.image}
                time={m.timestamp}
              />
            ) : (
              <FriendChats
                key={m.id}
                text={m.message}
                img={m.image}
                time={m.timestamp}
              />
            )
          )}

        <div ref={endaRef} />
      </div>
      <ChatsInput />
    </div>
  );
}
