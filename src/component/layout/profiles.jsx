import { ImProfile } from "react-icons/im";
import { MdPermMedia } from "react-icons/md";
import { FiPhone, FiVideo } from "react-icons/fi";
import { forwardRef } from "react";
import { motion } from "framer-motion";

const CurrentChatsProfiles = forwardRef(({ props }, ref) => {
  return (
    <motion.div
      initial={{ y: -450 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, type: "spring", damping: 15 }}
      className="absolute z-50 flex bg-transparent w-[450px] max-h-96 border-lightBlue rounded-xl left-2 top-1 shadow-xl shadow-black/50 overflow-hidden"
      ref={ref}
      onClick={(e) => e.stopPropagation()}
    >
      {/* kiri */}
      <div className="px-1 py-3 text-white bg-canvas shadow-lightBlue">
        <ul className="space-y-3 ">
          <li className="flex gap-2 px-5 py-2 text-sm duration-150 rounded-md hover:bg-lightBlueHover/50">
            <ImProfile className="mr-2 text-lg" />
            Overview
          </li>
          <li className="flex gap-2 px-5 py-2 text-sm duration-150 rounded-md hover:bg-lightBlueHover/50">
            <MdPermMedia className="mr-2 text-lg" />
            Media
          </li>
        </ul>
      </div>
      {/* =========== kanan ============== */}
      <div className="flex flex-1 pr-1 bg-surfaces">
        <div className="flex flex-col items-center px-3 py-3 overflow-y-auto scrollbar ">
          <img
            src="/src/assets/userProfileIMG/kaoruko.jpeg"
            alt=""
            className="object-cover w-16 h-16 rounded-full shadow-2xl "
          />
          <h2 className="mt-3 text-sm font-semibold tracking-wide text-white">
            Kouruko Waguri
          </h2>
          {/* button VC / TLPN */}
          <div className="flex w-full gap-3 px-5">
            <button className="flex flex-col items-center w-full gap-1 px-3 py-2 mt-3 rounded-md bg-canvas-600 hover:bg-canvas-600/50">
              <FiVideo className="text-xl text-white" />
              <span className="text-sm text-white">Video</span>
            </button>
            <button className="flex flex-col items-center w-full gap-1 px-3 py-2 mt-3 rounded-md bg-canvas-600 hover:bg-canvas-600/50">
              <FiPhone className="text-xl text-white" />
              <span className="text-sm text-white">Voice</span>
            </button>
            {/* last seen */}
          </div>
          <div className="flex flex-col items-start self-start mt-3">
            <p className="mt-3 text-sm text-white/65">Last seen</p>
            <p className="text-xs text-white">Today, 10:30 PM</p>
          </div>
          {/* description */}
          <div className="flex flex-col items-start self-start mt-1">
            <p className="mt-3 text-sm text-white/65">Description</p>
            <p className="text-xs text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              euismod ipsum et dui rhoncus, nec lacinia ipsum volutpat.
            </p>
          </div>
          {/* Phone number */}
          <div className="flex flex-col items-start self-start mt-1">
            <p className="mt-3 text-sm text-white/65">Phone number</p>
            <p className="text-xs text-white">+62 812-3456-7890</p>
          </div>
          {/* add to favorite */}
          <hr className="w-full mt-5 border-b border-lightBlue/20" />
          <button className="self-start px-3 py-2 mt-3 text-xs text-white rounded-md bg-canvas-600 hover:bg-canvas-600/50">
            Add to favorites
          </button>
          {/* report and block */}
          <div className="flex w-full gap-2 mt-3">
            <button className="self-start w-full px-3 py-2 mt-3 text-xs font-semibold text-white rounded-md bg-canvas-600 hover:bg-canvas-600/50">
              Block
            </button>
            <button className="self-start w-full px-3 py-2 mt-3 mb-2 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
              Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default CurrentChatsProfiles;
