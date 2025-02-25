import { MdInsertPhoto } from "react-icons/md";
import { BsFillEmojiAngryFill } from "react-icons/bs";
import { BsFillSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { sendMessage } from "../../../service/userService";
import { useSelector } from "react-redux";
import { ImCancelCircle } from "react-icons/im";

export default function ChatsInput() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: null,
  });

  const handleSendMessage = async () => {
    if (message.trim() !== "" || img.file !== null) {
      await sendMessage(
        currentUser.uid,
        currentRoom.roomId,
        message.trim(),
        img.file
      );
      setMessage("");
      setImg({ file: null, url: null });
    }
  };
  const handleEmoji = (emoji) => {
    setMessage(message + emoji.emoji);
    setOpen(false);
  };

  const handleSendImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImg({ file, url });
    }
  };
  return (
    <section className="relative z-20 flex items-center gap-2 px-1 py-2 rounded-full bg-canvas/10 lg:pb-1 backdrop-blur-xl backdrop-brightness-75">
      {/* nampilin img */}
      {img.file !== null && (
        <div className="absolute flex flex-row-reverse justify-end gap-3 px-3 py-2 rounded-lg w-fit bg-secondarydark bottom-14 backdrop-blur-lg shadow-lightBlueShadow shadow-sky-500/50 left-32">
          <button className="cursor-pointer h-fit">
            <ImCancelCircle
              className="text-2xl text-white"
              onClick={() => setImg({ file: null, url: null })}
            />
          </button>
          <label
            htmlFor=""
            className="px-2 py-1 text-white rounded-md h-fit bg-primarydark"
          >
            {img.file.name}
          </label>
          <img
            src={img.url}
            alt=""
            className="object-cover rounded-md max-w-32 aspect-1/1"
          />
        </div>
      )}
      {/* upload img*/}
      <label className="p-2 rounded-md cursor-pointer hover:bg-secondarylight">
        <MdInsertPhoto className="text-2xl text-white lg:text-2xl" />
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          hidden
          onChange={handleSendImg}
        />
      </label>
      {/* emoji */}
      <button
        className="p-2 rounded-md hover:bg-secondarylight"
        onClick={() => setOpen(!open)}
      >
        <BsFillEmojiAngryFill className="text-xl text-white lg:text-xl" />
      </button>
      {/* input message */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center w-full "
      >
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-5 py-2 text-sm tracking-wide text-white rounded-full outline-hidden md:text-lg md:py-3 lg:text-sm lg:py-2 placeholder:text-white/50 bg-white/10 focus:ring-1 focus:ring-primarylight "
        />
        {/* send message */}
        <button
          type="submit"
          className="p-2 rounded-md cursor-pointer hover:bg-secondarylight"
        >
          <BsFillSendFill className="text-3xl text-white md:text-2xl " />
        </button>
      </form>
      {/* emoji picker */}
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
