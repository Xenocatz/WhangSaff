import { MdInsertPhoto } from "react-icons/md";
import { BsFillEmojiAngryFill } from "react-icons/bs";
import { BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
export default function ChatsInput() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const handleEmoji = (emoji) => {
    setValue(value + emoji.emoji);
    setOpen(false);
  };
  return (
    <div>
      <section className="flex items-center gap-2 px-3 py-2 rounded-full lg:py-1 bg-canvas/10 backdrop-blur-xl backdrop-brightness-75">
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
          className="w-full px-5 py-3 text-lg tracking-wide text-white rounded-full outline-none lg:text-sm lg:py-1 placeholder:text-white/50 bg-white/10 focus:ring-1 focus:ring-lightBlue"
        />
        <button className="">
          <BsFillSendFill className="text-3xl text-white lg:text-2xl " />
        </button>
        <div className="absolute bottom-10">
          <EmojiPicker
            open={open}
            onEmojiClick={handleEmoji}
            theme="dark"
            width="300px"
            height="400px"
          />
        </div>
      </section>
    </div>
  );
}
