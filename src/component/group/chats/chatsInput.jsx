import { MdInsertPhoto } from "react-icons/md";
import { BsFillEmojiAngryFill } from "react-icons/bs";
import { BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { sendMessage } from "../../../service/userService";
import { useSelector } from "react-redux";
export default function ChatsInput() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSendMessage = async () => {
    if (value.trim() !== "") {
      await sendMessage(currentUser.uid, currentRoom.id, value);
      setValue("");
      console.log(currentUser.uid);
      console.log(currentRoom.id);
    }
  };
  const handleEmoji = (emoji) => {
    setValue(value + emoji.emoji);
    setOpen(false);
  };
  return (
    <section className="relative z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-canvas/10 lg:pb-2 backdrop-blur-xl backdrop-brightness-75">
      <MdInsertPhoto className="text-5xl text-white cursor-pointer lg:text-4xl" />
      <BsFillEmojiAngryFill
        onClick={() => setOpen(!open)}
        className="text-4xl text-white cursor-pointer lg:text-3xl"
      />
      <input
        type="text"
        placeholder="Type a message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-5 py-2 text-sm tracking-wide text-white rounded-full outline-none md:text-lg md:py-3 lg:text-sm lg:py-2 placeholder:text-white/50 bg-white/10 focus:ring-1 focus:ring-lightBlue"
      />
      <button className="" onClick={handleSendMessage}>
        <BsFillSendFill className="text-3xl text-white md:text-2xl " />
      </button>
      <div className="absolute bottom-14 ">
        <EmojiPicker
          open={open}
          onEmojiClick={handleEmoji}
          theme="dark"
          width="300px"
          height="400px"
        />
      </div>
    </section>
  );
}
