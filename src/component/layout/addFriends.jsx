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
    <section className="absolute top-0 flex flex-col w-full h-full py-2 z-99 -right-0 shadow-lightBlueShadow shadow-sky-500/40 rounded-xl bg-darkbg">
      {/* input email */}
      <div className="w-full p-5 ">
        <h1 className="text-2xl font-semibold text-white">Temukan Teman</h1>
      </div>
      <div className="flex justify-center px-2 ">
        <div className="flex w-full overflow-hidden rounded-sm bg-primarylight">
          <input
            ref={ref}
            type="email"
            placeholder="Masukan Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="w-full px-2 text-sm text-white bg-transparent outline-hidden "
            onKeyDown={(e) => e.key === "Enter" && handleSearchUser()}
          />
          <button
            type="button"
            onClick={handleSearchUser}
            className="p-2 cursor-pointer hover:bg-secondarydark"
          >
            <MdPersonSearch className="text-2xl text-white" />
          </button>
        </div>
      </div>

      {display && friend && (
        <div className="flex flex-col items-center px-3 py-5">
          {/* Profile */}
          <div className="relative p-0 mb-2 rounded-full w-25 h-25 bg-secondarylight/50">
            <img
              className="absolute object-cover mb-3 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-22 h-22"
              src={friend.avatar}
              alt=""
            />
          </div>
          <h1 className="text-lg text-white">{friend.username}</h1>
          <h2 className="text-sky-500">{friend.email}</h2>

          {/* button */}
          <div className="flex w-full gap-3 mt-5">
            {/* cancel */}
            <button
              onClick={handleCancel}
              className="w-full p-3 text-white rounded-xl bg-secondarydark hover:bg-secondarydark/50"
            >
              Gajadi
            </button>

            {/* add */}
            <button
              onClick={handleAddFriends}
              className="w-full p-3 text-white rounded-xl bg-primarylight hover:bg-secondarylight"
            >
              Tambahkan
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
