import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendList } from "../../redux/friendSlice";
import { getCurrentChatRoom } from "../../service/userService";
import { setCurrentRoom } from "../../redux/currentRoomSlice";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import SearchBar from "../group/contact/searchAndAdd";
import AddFriends from "./addFriends";
import Contact from "../element/contact";
import Settings from "./setting";
import defaultAvatar from "../../assets/userProfileIMG/blank-image.png";
import ProfilePage from "./profilePage";
import WhangSaffIcon from "../../assets/png/bubleChat.png";
import GeminiIcon from "../../assets/png/BrandLogo.org-Gemini-Icon.png";

export default function ContactsSection() {
  const [viewMode, setViewMode] = useState("message");

  const currentUser = useSelector((state) => state.user.currentUser);
  const friends = useSelector((state) => state.friend.friends);
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);

  const dispatch = useDispatch();
  const { username } = useParams();

  const handleCurrentChatRoom = useCallback(
    async (friendId, roomId) => {
      if (!roomId || !friendId) return;
      const currentChatRoom = await getCurrentChatRoom(roomId, friendId);
      dispatch(setCurrentRoom(currentChatRoom));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsubscribe = dispatch(getFriendList(currentUser.uid));

    return typeof unsubscribe === "function" ? () => unsubscribe() : undefined;
  }, [currentUser?.uid, dispatch]);

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
  }, [friends, currentRoom, username, handleCurrentChatRoom]);

  const handleUndevelopmentFitur = (e) => {
    e.preventDefault();
    toast.info("Fitur sedang dalam pengembangan");
  };

  return (
    <aside className="flex w-150">
      <div className="flex flex-col justify-between px-2 py-9 bg-secondarydarkbg">
        <div className="flex flex-col items-center gap-5">
          <img src={WhangSaffIcon} alt="" className="w-10 select-none" />

          <button
            type="button"
            title="message"
            className={`p-2 text-2xl text-white rounded-lg shadow-lg cursor-pointer duration-200 ${
              viewMode === "message" && "bg-secondarylight"
            }`}
            onClick={() => setViewMode("message")}
          >
            <BiMessageDetail />
          </button>

          <button
            type="button"
            title="add friend"
            className={`p-2 text-2xl text-white rounded-lg shadow-lg cursor-pointer duration-200 ${
              viewMode === "addFriends" && "bg-secondarylight"
            }`}
            onClick={() => setViewMode("addFriends")}
          >
            <IoMdPersonAdd />
          </button>

          <Link to="gemini" className="cursor-pointer select-none w-9">
            <img src={GeminiIcon} alt="" />
          </Link>
        </div>

        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={() => setViewMode("settings")}
            title="settings"
            className={`p-1 text-2xl text-white rounded-lg shadow-lg cursor-pointer duration-200 ${
              viewMode === "settings" && "bg-secondarylight"
            }`}
          >
            <MdOutlineSettings className="text-3xl text-white" />
          </button>

          <button
            type="button"
            onClick={() => setViewMode("profile")}
            title="profile"
            className={`p-1 text-2xl text-white rounded-full shadow-lg cursor-pointer duration-200 select-none ${
              viewMode === "profile" && "bg-secondarylight"
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
        {viewMode === "addFriends" && (
          <AddFriends currentUser={currentUser} setViewMode={setViewMode} />
        )}
        {viewMode === "settings" && <Settings />}
        {viewMode === "profile" && <ProfilePage />}

        <div className="w-full px-6 py-2">
          <h1 className="text-2xl font-semibold text-white select-none">
            Chat
          </h1>
        </div>

        <div className="px-5 py-3 ">
          <SearchBar
            addFriend={viewMode === "addFriends"}
            onclick={handleUndevelopmentFitur}
          />
        </div>

        <ul className="flex flex-col flex-1 gap-3 px-3 py-2 overflow-y-auto">
          {memoizedFriends}
        </ul>
      </div>
    </aside>
  );
}
