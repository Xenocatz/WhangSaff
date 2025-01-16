export default function MyChats({ img = "", text = "", time = "" }) {
  return (
    <div className="w-full ">
      <section className="flex flex-row-reverse items-end w-full gap-2 ">
        <div className="flex flex-col  mt-1 max-w-[70%] bg-chatBg/75 rounded-lg  shadow-lg">
          {img && (
            <img
              src={img}
              alt=""
              className="self-center object-cover max-w-full shadow-chatShadow rounded-md aspect-[1/1] "
            />
          )}
          <p className="max-w-full px-2 py-2 text-sm font-medium break-words rounded-lg p- text-textForDarkBlue ">
            {text}
          </p>
        </div>
        <p className="py-1 text-xs text-textForTime">{time}</p>
      </section>
    </div>
  );
}
