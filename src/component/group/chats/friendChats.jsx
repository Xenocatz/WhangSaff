import React from "react";
export default React.memo(function FriendChats({
  img = "",
  text = "",
  time = "",
}) {
  return (
    <div className="w-full ">
      <section className="flex items-end w-full gap-2 ">
        <div className="flex flex-col mt-1 max-w-[50%] bg-white/10 shadow-lg backdrop-blur-xl rounded-lg ">
          {img && (
            <img
              src={img}
              alt=""
              className="object-contain max-w-full bg-contain rounded-md shadow-chatShadow"
            />
          )}
          <p className="max-w-full p-2 text-sm font-medium rounded-lg text-textForGrey text-wrap ">
            {text}
          </p>
        </div>
        <p className="py-1 text-xs select-none text-textForTime">{time}</p>
      </section>
    </div>
  );
});
