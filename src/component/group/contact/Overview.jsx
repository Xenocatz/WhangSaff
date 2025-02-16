import { FiPhone, FiVideo } from "react-icons/fi";

export default function Overview({ currentRoom }) {
  if (!currentRoom) return null;

  return (
    <div className="flex flex-1 pr-1 bg-surfaces">
      <div className="flex flex-col items-center w-full px-3 py-3 overflow-y-auto scrollbar">
        <img
          src={currentRoom.avatar}
          alt=""
          className="object-cover rounded-full shadow-2xl min-w-20 min-h-20 max-h-20 max-w-20 "
        />
        <h2 className="mt-3 text-sm font-semibold tracking-wide text-white">
          {currentRoom.username}
        </h2>
        {/* button VC / TLPN */}
        <div className="flex w-full gap-3 ">
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
          <p className="text-xs text-white">{currentRoom.description}</p>
        </div>
        {/* Phone number */}
        <div className="flex flex-col items-start self-start mt-1">
          <p className="mt-3 text-sm text-white/65">Email</p>
          <p className="text-xs text-white">{currentRoom.email}</p>
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
  );
}
