import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/userProfileIMG/blank-image.png";
const Contact = React.memo(
  ({ nama, chats, isActive, lastMessageTimeStamp, avatar, onclick }) => {
    return (
      <Link
        to={`chats/${nama}`}
        className={`relative flex gap-2 items-start justify-between px-4 py-3 rounded-xl duration-200 hover:bg-secondarydark cursor-pointer  overflow-hidden ${
          isActive && "bg-secondarydark"
        }`}
        onClick={onclick}
      >
        {isActive && (
          <div className="absolute top-0 left-0 w-3 h-full rounded-full bg-secondarylight"></div>
        )}
        <div className="flex items-center gap-3 ">
          <img
            src={avatar || defaultAvatar}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="object-cover rounded-full select-none h-14 w-14 lg:w-12 lg:h-12"
          />
          <span className="lg:max-w-60 max-w-60 ">
            <h2 className="w-full text-xl font-bold text-white truncate select-none lg:text-lg lg:font-semibold font-poppins">
              {nama}
            </h2>
            <p className="text-sm truncate select-none text-white/75 ">
              {chats}
            </p>
          </span>
        </div>
        <p className="text-xs select-none text-white/75 lg:text-xs">
          {lastMessageTimeStamp}
        </p>
      </Link>
    );
  }
);

export default Contact;
