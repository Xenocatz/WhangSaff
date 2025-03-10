import { useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../../Config/firebase";
import CurrentChatsProfiles from "../../layout/profiles";
import defaultAvatar from "../../../assets/userProfileIMG/blank-image.png";
export default function ChatsHeader() {
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  const [userDetailVisible, setUserDetailVisible] = useState(false);
  const [status, setStatus] = useState({
    online: false,
    lastSeen: "",
  });
  const userDetailRef = useRef(null);

  const handleClickOutside = useCallback((e) => {
    if (userDetailRef.current && !userDetailRef.current.contains(e.target)) {
      setUserDetailVisible(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const formattedDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };
  useEffect(() => {
    if (!currentRoom?.friendId) return;

    const statusRef = ref(database, `status/${currentRoom?.friendId}`);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const lastSeenFormatted = formattedDate(data.lastSeen);

      setStatus((prevStatus) => {
        if (
          prevStatus?.online === data.online &&
          prevStatus.lastSeen === lastSeenFormatted
        ) {
          return prevStatus;
        }

        console.log("status updated:", {
          online: data.online,
          lastSeen: lastSeenFormatted,
        });

        return {
          online: data.online,
          lastSeen: lastSeenFormatted,
        };
      });
    });

    return () => unsubscribe();
  }, [currentRoom.friendId]);

  const handleUserDetail = (e) => {
    e.stopPropagation();
    setUserDetailVisible(!userDetailVisible);
    console.log("click");
  };

  return (
    <div
      className="relative z-50 flex items-center justify-between h-16 px-5 shadow-2xl select-none shadow-black/50 bg-darkbg"
      onClick={handleUserDetail}
    >
      {userDetailVisible && <CurrentChatsProfiles ref={userDetailRef} />}
      <ContactProfile
        name={currentRoom?.username}
        avatar={currentRoom?.avatar}
        status={status}
      />
    </div>
  );
}

const ContactProfile = ({ name, avatar, status }) => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 ">
      <img
        src={avatar ? avatar : defaultAvatar}
        alt=""
        className="object-cover rounded-full shadow-2xl w-14 h-14 "
      />
      <div className="flex flex-col items-start">
        <h2 className="text-xl font-bold text-white select-none lg:text-lg lg:font-semibold font-poppins">
          {name}
        </h2>
        <div className="flex items-end justify-center gap-2">
          {status?.online !== null && (
            <p className="text-sm text-white/75 ">
              {status?.online ? "Online" : `Offline `}
            </p>
          )}
          {status?.lastSeen && (
            <p className="text-xs text-white/75 ">
              last seen at {status.lastSeen}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
