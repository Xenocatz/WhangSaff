import { useEffect, useRef, useState } from "react";
import avatar from "../../../assets/userProfileIMG/kaoruko.jpeg";
import CurrentChatsProfiles from "../../layout/profiles";
import { CiLight } from "react-icons/ci";

export default function ChatsHeader() {
  const [userDetailVisible, setUserDetailVisible] = useState(false);
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

  const handleUserDetail = (e) => {
    e.stopPropagation();
    setUserDetailVisible(!userDetailVisible);
    console.log("click");
  };

  return (
    <div
      className="relative z-50 flex items-center justify-between h-16 px-5 shadow-2xl shadow-black/50 bg-canvas/10 backdrop-brightness-75 backdrop-blur-xl"
      onClick={handleUserDetail}
    >
      {userDetailVisible && <CurrentChatsProfiles ref={userDetailRef} />}
      <ContactProfile />
    </div>
  );
}

const ContactProfile = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-3 ">
      <img
        src={avatar}
        alt=""
        className="object-cover rounded-full shadow-2xl w-14 h-14 "
      />
      <div>
        <h2 className="text-xl font-bold text-white select-none lg:text-lg lg:font-semibold font-poppins">
          Kaoruko Waguri
        </h2>
        <p className="text-sm text-white/75 ">Online</p>
      </div>
    </div>
  );
};
