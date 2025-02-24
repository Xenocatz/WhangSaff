import { ImProfile } from "react-icons/im";
import { MdPermMedia } from "react-icons/md";
import { useSelector } from "react-redux";
import { Outlet, useOutletContext } from "react-router-dom";
import Overview from "../group/contact/Overview";
import { forwardRef } from "react";

const CurrentChatsProfiles = forwardRef((props, ref) => {
  const userDetailRef = useOutletContext();
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);

  return (
    <div
      className="absolute z-50 flex bg-transparent w-96 md:w-[450px] md:max-h-96 max-h-[700px] border-lightBlue rounded-xl left-2 top-1 shadow-xl shadow-black/50 overflow-hidden"
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      {/* kiri */}
      <div className="px-1 py-3 text-white bg-primarydark shadow-lightBlue">
        <ul className="space-y-3 ">
          <li className="flex gap-2 px-1 py-2 text-sm duration-150 rounded-md md:px-5 hover:bg-secondarylight">
            <ImProfile className="mr-2 text-md md:text-lg" />
            Overview
          </li>
          <li className="flex gap-2 px-1 py-2 text-sm duration-150 rounded-md md:px-5 hover:bg-secondarylight">
            <MdPermMedia className="mr-2 text-md md:text-lg" />
            Media
          </li>
        </ul>
      </div>
      {/* =========== kanan ============== */}
      <Overview currentRoom={currentRoom} />
    </div>
  );
});

export default CurrentChatsProfiles;
