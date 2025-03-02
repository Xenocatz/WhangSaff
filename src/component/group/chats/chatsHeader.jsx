import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";
import { database } from "../../../Config/firebase";
import CurrentChatsProfiles from "../../layout/profiles";
import defaultAvatar from "../../../assets/userProfileIMG/blank-image.png";
export default function ChatsHeader() {
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  const [userDetailVisible, setUserDetailVisible] = useState(false);
  const [status, setStatus] = useState(null);
  const userDetailRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDetailRef.current && !userDetailRef.current.contains(e.target)) {
        setUserDetailVisible(false);
        console.log("click outside");
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const formattedDate = (dates) => {
    const date = new Date(dates);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month} ${hour}:${minute}`;
  };
  useEffect(() => {
    if (!currentRoom?.friendId) return;

    const statusRef = ref(database, `status/${currentRoom.friendId}`);

    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      setStatus((prevStatus) => {
        if (
          prevStatus?.online === data.online &&
          prevStatus.lastSeen === formattedDate(data.lastSeen)
        ) {
          return prevStatus;
        }

        return {
          online: data.online,
          lastSeen: formattedDate(data.lastSeen),
        };
      });
    });

    return () => unsubscribe();
  }, [currentRoom]);

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
      <div>
        <h2 className="text-xl font-bold text-white select-none lg:text-lg lg:font-semibold font-poppins">
          {name}
        </h2>
        <div className="flex items-end justify-center gap-2">
          {status?.online !== null && (
            <p className="text-sm text-white/75 ">
              {status?.online ? "Online" : `Offline `}
            </p>
          )}
          {status?.online === false && status?.lastSeen && (
            <p className="text-xs text-white/75 ">
              last seen at {status.lastSeen}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
