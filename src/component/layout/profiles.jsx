import { ImProfile } from "react-icons/im";
import { MdPermMedia } from "react-icons/md";
import { useSelector } from "react-redux";
import Overview from "../group/contact/Overview";
import { forwardRef, useEffect, useState } from "react";
import Media from "../group/contact/Media";
import { listenToMedia } from "../../service/userService";

const CurrentChatsProfiles = forwardRef((props, ref) => {
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  const [toggle, setToggle] = useState("overview");
  const [media, setMedia] = useState([]);

  useEffect(() => {
    // if (media.length === 0) return;
    const unsubscribe = listenToMedia(currentRoom.roomId, (media) => {
      setMedia(media);
    });
    console.log("listen to media ; ", media);
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [media, currentRoom]);

  const handleToggleOverview = () => {
    if (toggle === "overview") return;
    setToggle("overview");
  };
  const handleToggleMedia = () => {
    if (toggle === "media") return;
    setToggle("media");
  };

  return (
    <div
      className="absolute z-50 flex bg-transparent w-96 md:w-[450px]
       md:max-h-96 h-[700px] border-lightBlue rounded-xl left-2 top-1 shadow-xl shadow-black/50 overflow-hidden"
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      {/* kiri */}
      <div className="px-1 py-3 text-white bg-primarydark shadow-lightBlue">
        <ul className="space-y-3 ">
          <li>
            <button
              onClick={handleToggleOverview}
              className={`flex w-full gap-2 px-1 py-2 text-sm duration-150 rounded-md md:px-5  cursor-pointer ${
                toggle === "overview" && "bg-secondarylight"
              }`}
            >
              <ImProfile className="mr-2 text-md md:text-lg" />
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={handleToggleMedia}
              className={`flex w-full gap-2 px-1 py-2 text-sm duration-150 rounded-md md:px-5 cursor-pointer ${
                toggle === "media" && "bg-secondarylight"
              }`}
            >
              <MdPermMedia className="mr-2 text-md md:text-lg" />
              Media
            </button>
          </li>
        </ul>
      </div>
      {/* =========== kanan ============== */}
      {toggle === "overview" && <Overview currentRoom={currentRoom} />}
      {toggle === "media" && <Media media={media} />}
    </div>
  );
});

export default CurrentChatsProfiles;
