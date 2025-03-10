import FriendChats from "./friendChats";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatsInput from "./chatsInput";
import { useSelector } from "react-redux";
import MyChats from "./myChats";
import { listenToMessages } from "../../../service/userService";

export default function ChatsRoom() {
  // selector
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  // state
  const [messages, setMessages] = useState([]);
  // ref
  const endaRef = useRef(null);
  const userRef = useRef(null);
  userRef.current = currentUser;

  // ngisi messages
  useEffect(() => {
    let timeout;
    let unsubscribe;
    if (!currentRoom) return;
    unsubscribe = listenToMessages(currentRoom.roomId, (messages) => {
      timeout = setTimeout(() => {
        console.log("listen to messages ");
        setMessages(messages);
      });
    });
    return () => {
      if (unsubscribe) unsubscribe();
      clearTimeout(timeout);
    };
  }, [currentRoom]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const scrollToBottom = () => {
        endaRef.current?.scrollIntoView();
      };
      scrollToBottom();
    }, 300);
    return () => clearTimeout(timeout);
  }, [messages]);
  return (
    <div className="z-10 flex flex-col justify-between overflow-y-hidden grow-1 bg-canvas/10 backdrop-brightness-75 backdrop-blur-sm">
      <div className="flex flex-col flex-1 px-2 py-2 overflow-y-auto lg:px-10 chat-scrollbar">
        {messages?.length > 0 &&
          messages.map((m) =>
            m.senderId === userRef.current.uid ? (
              <MyChats
                key={m.id}
                text={m.message}
                img={m.image}
                time={m.timestamp || "N/A"}
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
