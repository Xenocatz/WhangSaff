import { useEffect, useState } from "react";
import Contact from "../element/contact";
import ContactAtas from "../group/contact/contactAtas";
import SearchAndAdd from "../group/contact/searchAndAdd";
import AddFriends from "./addFriends";
import { useDispatch, useSelector } from "react-redux";
import { getFriendList } from "../../redux/friendSlice";
import { getCurrentChatRoom } from "../../service/userService";
import { setCurrentRoom } from "../../redux/currentRoomSlice";
import { useNavigate } from "react-router-dom";

export default function ContactsSection() {
  const [addFriends, setAddFriends] = useState(false);
  // selsctor
  const currentUser = useSelector((state) => state.user.currentUser);
  const friends = useSelector((state) => state.friend.friends);

  const dispatch = useDispatch(); // dispatch
  const navigate = useNavigate(); // navigate

  const handleAddFriend = () => {
    setAddFriends(!addFriends);
  };

  const handleCurrentChatRoom = async (friendId, friendName, roomId) => {
    const currentChatRoom = await getCurrentChatRoom(roomId, friendId);
    dispatch(setCurrentRoom(currentChatRoom));

    navigate(`/whangsaff/chats/${friendName}`);
  };

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = dispatch(getFriendList(currentUser.uid));
      return () => unsubscribe;
    }
  }, [dispatch, currentUser]);

  return (
    <div className="relative flex flex-col h-full border-r shadow-2xl border-r-lightBlue/25 bg-canvas lg:w-80">
      {/* Profile */}
      <div className="flex flex-col gap-2 px-5 py-3 lg:gap-1 ">
        <ContactAtas nama={currentUser.username} avatar={currentUser.avatar} />
        <SearchAndAdd onclick={handleAddFriend} addFriend={addFriends} />
      </div>

      {/* Add Friend */}
      {addFriends && (
        <AddFriends
          currentUser={currentUser}
          setAddFriends={setAddFriends}
          addFriends={addFriends}
        />
      )}
      {/* Friend List */}
      <ul className="flex flex-col flex-1 gap-3 px-3 py-2 overflow-y-auto">
        {friends.map((friend) => (
          <li key={friend.id}>
            <Contact
              nama={friend.username}
              avatar={friend.avatar}
              chats={friend.lastMessage}
              lastMessageTimeStamp={friend.lastMessageTimestamp}
              onclick={() =>
                handleCurrentChatRoom(friend.id, friend.username, friend.roomId)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
