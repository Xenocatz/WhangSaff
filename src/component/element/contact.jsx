import avatar from "../../assets/userProfileIMG/blank-image.png";
const Contact = ({ nama, chats, chatList, lastMessage }) => {
  return (
    <div
      className={`flex gap-2 items-start justify-between px-2 py-3 rounded-xl  ${
        chatList
          ? "lg:hover:bg-lightBlue/5 hover:scale-105 group duration-300"
          : ""
      }`}
    >
      <div className="flex items-center gap-3 ">
        <img
          src={avatar}
          alt=""
          className="object-cover rounded-full h-14 w-14 lg:w-12 lg:h-12"
        />
        <span className="lg:max-w-48 max-w-60 ">
          <h2 className="w-full text-xl font-bold text-white truncate select-none lg:text-lg lg:font-semibold font-poppins">
            {nama}
          </h2>
          <p className="text-sm truncate select-none text-white/75 ">{chats}</p>
        </span>
      </div>
      <p className="text-xs select-none text-white/75 lg:text-xs">
        {lastMessage}
      </p>
    </div>
  );
};

export default Contact;
