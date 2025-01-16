import FriendChats from "./friendChats";
import MyChats from "./myChats";
import waguri from "../../../assets/userProfileIMG/kaoruko.jpeg";
import wuwa from "../../../assets/bgChats/bg.jpg";
import { useEffect, useRef } from "react";

export default function ChatsMain() {
  const endaRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  });
  const scrollToBottom = () => {
    endaRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="z-10 flex-1 overflow-y-auto backdrop-blur-xl bg-canvas/10 backdrop-brightness-75 chat-scrollbar">
      <div className="flex flex-col px-2 py-2 lg:px-10 ">
        <FriendChats text="Halo anata, apa kabar?" time="06:00" />
        <MyChats text="baik ko, klo kamu?" time="06:10" />
        <FriendChats text="baik juga" time="06:20" />
        <FriendChats
          text="Semangat yaa kuliahnya ❤️>_<"
          img={waguri}
          time="06:20"
        />
        <FriendChats text="hihi" time="06:20" />
        <MyChats text="Makasihh😍" time="06:21" />
        <MyChats img={wuwa} text="keren ga?" time="06:22" />
        <div ref={endaRef} />
      </div>
    </div>
  );
}
