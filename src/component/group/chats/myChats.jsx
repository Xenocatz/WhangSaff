import React from "react";

export default React.memo(function MyChats({ img = "", text = "", time = "" }) {
  return (
    <div className="w-full ">
      <section className="flex flex-row-reverse items-end w-full gap-2 ">
        <div className="flex flex-col mt-1 max-w-[50%] bg-secondarylight rounded-lg shadow-lg">
          {img && (
            <img
              src={img}
              alt=""
              className="object-contain max-w-full bg-contain rounded-md shadow-chatShadow"
            />
          )}
          {text && (
            <p className="max-w-full px-2 py-2 text-sm font-medium break-words rounded-lg text-textForDarkBlue ">
              {text}
            </p>
          )}
        </div>
        <p className="py-1 text-xs select-none text-textForTime">{time}</p>
      </section>
    </div>
  );
});
