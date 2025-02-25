import { useCallback, useEffect, useMemo, useState } from "react";
import Contact from "../element/contact";
import defaultAvatar from "../../assets/userProfileIMG/blank-image.png";
import SearchBar from "../group/contact/searchAndAdd";
import AddFriends from "./addFriends";
import { useDispatch, useSelector } from "react-redux";
import { getFriendList } from "../../redux/friendSlice";
import { getCurrentChatRoom } from "../../service/userService";
import { setCurrentRoom } from "../../redux/currentRoomSlice";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { toast } from "react-toastify";
import { BiMessageDetail } from "react-icons/bi";
import Settings from "./setting";
import { useParams } from "react-router-dom";
import ProfilePage from "./profilePage";

export default function ContactsSection() {
  // state
  const [addFriends, setAddFriends] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  // selsctor
  const currentUser = useSelector((state) => state.user.currentUser);
  const friends = useSelector((state) => state.friend.friends);
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);

  // dispatch
  const dispatch = useDispatch();
  const { username } = useParams();

  const handleCurrentChatRoom = useCallback(
    async (friendId, roomId) => {
      if (roomId === currentRoom.roomId) return;
      const currentChatRoom = await getCurrentChatRoom(roomId, friendId);
      dispatch(setCurrentRoom(currentChatRoom));
    },
    [currentRoom]
  );

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser) {
      const unsubscribe = dispatch(getFriendList(currentUser.uid));

      // cleanup
      if (typeof unsubscribe === "function") return () => unsubscribe();
    }
  }, [currentUser?.uid]);

  const memoizedFriends = useMemo(() => {
    return friends.map((friend) => (
      <li key={friend.id}>
        <Contact
          nama={friend.username}
          avatar={friend.avatar || defaultAvatar}
          chats={friend.lastMessage}
          lastMessageTimeStamp={friend.lastMessageTimestamp}
          onclick={() => handleCurrentChatRoom(friend.id, friend.roomId)}
          isActive={
            friend?.roomId === currentRoom?.roomId &&
            username === friend?.username
          }
        />
      </li>
    ));
  }, [friends, handleCurrentChatRoom]);

  const handleUndevelopmentFitur = (e) => {
    e.preventDefault();
    toast.info("Fitur sedang dalam pengembangan");
  };

  // toggle handle
  const handleAddFriend = useCallback(() => {
    setToggleSettings(false);
    setToggleProfile(false);
    setAddFriends(true);
  }, [addFriends]);

  const handleSettings = useCallback(() => {
    setAddFriends(false);
    setToggleProfile(false);
    setToggleSettings(true);
  }, []);

  const handleProfile = useCallback(() => {
    setAddFriends(false);
    setToggleSettings(false);
    setToggleProfile(true);
  }, []);

  const handleMessage = () => {
    setAddFriends(false);
    setToggleSettings(false);
    setToggleProfile(false);
  };

  return (
    <aside className="flex w-150">
      {/* sidebar nav */}
      <div className="flex flex-col justify-between px-2 py-9 bg-secondarydarkbg">
        <div className="flex flex-col items-center gap-5">
          {/* logo */}
          <img
            src="/src/assets/png/bubleChat.png"
            alt=""
            className="w-10 select-none"
          />
          {/* message */}
          <button
            type="button"
            title="message"
            className={`p-2 text-2xl text-white rounded-lg shadow-lg cursor-pointer duration-200 ${
              !addFriends &&
              !toggleSettings &&
              !toggleProfile &&
              "bg-secondarylight"
            }`}
            onClick={handleMessage}
          >
            <BiMessageDetail />
          </button>
          {/* add friend */}
          <button
            type="button"
            title="add friend"
            className={`p-2 text-2xl text-white rounded-lg shadow-lg cursor-pointer  duration-200 ${
              addFriends && "bg-secondarylight"
            }`}
            onClick={handleAddFriend}
          >
            <IoMdPersonAdd />
          </button>
          {/* deepseek */}
          <button
            className="w-10 cursor-pointer select-none"
            onClick={handleUndevelopmentFitur}
          >
            <img src="/src/assets/svg icon/deepseek-logo-icon.svg" alt="" />
          </button>
        </div>
        <div className="flex flex-col items-center gap-5">
          {/* settings */}
          <button
            type="button"
            onClick={handleSettings}
            title="settings"
            className={`p-1 text-2xl text-white rounded-lg shadow-lg cursor-pointer duration-200 ${
              toggleSettings && "bg-secondarylight"
            }`}
          >
            <MdOutlineSettings className="text-3xl text-white" />
          </button>
          {/* avatar */}
          <button
            type="button"
            onClick={handleProfile}
            title="profile"
            className={`p-1 text-2xl text-white rounded-full shadow-lg cursor-pointer duration-200 select-none ${
              toggleProfile && "bg-secondarylight"
            }`}
          >
            <img
              src={currentUser?.avatar || defaultAvatar}
              alt=""
              referrerPolicy="no-referrer"
              className="object-cover rounded-full aspect-square w-11 h-11"
            />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex flex-col w-full pt-5 overflow-hidden shadow-2xl rounded-tl-3xl bg-darkbg lg:w-95">
        {/* Add Friend */}
        {addFriends && (
          <AddFriends
            currentUser={currentUser}
            setAddFriends={setAddFriends}
            addFriends={addFriends}
          />
        )}
        {/* Settings */}
        {toggleSettings && <Settings />}

        {/* profile */}
        {toggleProfile && <ProfilePage />}

        <div className="w-full px-6 py-2">
          <h1 className="text-2xl font-semibold text-white select-none">
            Chat
          </h1>
        </div>
        {/* Search  */}
        <div className="px-5 py-3 ">
          <SearchBar
            addFriend={addFriends}
            onclick={handleUndevelopmentFitur}
          />
        </div>
        {/* Friend List */}
        <ul className="flex flex-col flex-1 gap-3 px-3 py-2 overflow-y-auto">
          {memoizedFriends}
        </ul>
      </div>
    </aside>
  );
}
