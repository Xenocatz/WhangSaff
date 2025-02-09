import { useRef, useState, useEffect } from "react";
import { MdPersonSearch } from "react-icons/md";
import { createChatRoom, findUserByEmail } from "../../service/userService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddFriends({ currentUser, setAddFriends, addFriends }) {
  const [inputEmail, setInputEmail] = useState("");
  const [friend, setFriend] = useState({
    avatar: "",
    name: "",
    email: "",
  });
  const [display, setDisplay] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    if (addFriends) {
      ref.current.focus();
    }
  }, [addFriends]);
  const handleSearchUser = async () => {
    if (inputEmail !== "") {
      const user = await findUserByEmail(inputEmail);
      if (user === null) {
        setInputEmail("");
        return;
      }
      setFriend(user);
      setDisplay(true);
    }
  };

  const handleCancel = () => {
    setInputEmail("");
    setFriend({});
    setDisplay(false);
  };

  const handleAddFriends = () => {
    try {
      createChatRoom(currentUser.uid, friend.id);

      setAddFriends(false);
      toast.success("Berhasil menambahkan teman");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      console.log(currentUser);
    }
  };
  return (
    <section className="z-[99] py-2 absolute top-[140px] -right-[225px] shadow-lightBlueShadow shadow-sky-500/40 rounded-xl flex flex-col w-full  bg-canvas">
      {/* input email */}
      <h1 className="px-3 mb-2 text-lg text-white">Temukan teman</h1>
      <div className="flex justify-center px-2 ">
        <div className="flex w-full py-1 overflow-hidden rounded bg-surfaces">
          <input
            ref={ref}
            type="email"
            placeholder="Masukan Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="w-full px-2 text-sm text-white bg-transparent border-r-2 outline-none border-sky-500"
            onKeyDown={(e) => e.key === "Enter" && handleSearchUser()}
          />
          <button
            type="button"
            onClick={handleSearchUser}
            className="px-2 text-2xl text-white bg-transparent hover:bg-slate-600/50"
          >
            <MdPersonSearch />
          </button>
        </div>
      </div>

      {display && friend && (
        <div className="flex flex-col items-center px-3 py-5">
          {/* Profile */}
          <img
            className="object-cover w-20 h-20 mb-3 rounded-full"
            src={friend.avatar}
            alt=""
          />
          <h1 className="text-lg text-white">{friend.username}</h1>
          <h2 className="text-sky-500">{friend.email}</h2>

          {/* button */}
          <div className="flex w-full gap-3 mt-5">
            {/* cancel */}
            <button
              onClick={handleCancel}
              className="w-full p-3 text-white rounded-xl bg-slate-500/75 hover:bg-slate-600/50"
            >
              Gajadi
            </button>

            {/* add */}
            <button
              onClick={handleAddFriends}
              className="w-full p-3 text-white rounded-xl bg-lightBlue/60 hover:bg-canvas-600/50"
            >
              Tambahkan
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
