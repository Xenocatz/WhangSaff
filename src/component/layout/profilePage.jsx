import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../assets/userProfileIMG/blank-image.png";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useRef, useState } from "react";
import { updateProfile } from "../../service/userService";
import { setUser } from "../../redux/userSlice";

export default function ProfilePage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <section className="absolute top-0 right-0 z-10 w-full h-full text-white bg-darkbg">
      <div className="w-full p-6 ">
        <h1 className="text-2xl font-semibold select-none">Profile</h1>
      </div>
      <div className="py-5">
        <div className="px-3">
          {/* avatar */}
          <div className="p-1 rounded-full bg-secondarylight w-fit ">
            <img
              src={currentUser?.avatar || defaultAvatar}
              alt=""
              className="object-cover w-40 h-40 rounded-full select-none"
            />
          </div>

          {/* bio */}
          <ProfileComponent
            header="Username"
            value={currentUser.username || ""}
            user={currentUser}
            max={24}
          />
          <ProfileComponent
            header="Email"
            value={currentUser.email || ""}
            disabled
          />
          <ProfileComponent
            header="Description"
            value={currentUser.description || ""}
            user={currentUser}
            max={90}
          />
        </div>
      </div>
    </section>
  );
}

const ProfileComponent = ({ value, header, disabled = false, user, max }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(value);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const handleEdit = (e) => {
    e.preventDefault();
    if (edit === true) {
      if (inputValue.trim() === value.trim())
        return setEdit(false), setInputValue(value);
      updateProfile(user.uid, { [header.toLowerCase()]: inputValue.trim() });
      dispatch(setUser({ ...user, [header.toLowerCase()]: inputValue.trim() }));
    }
    setEdit(!edit);
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  return (
    <div>
      <h3 className="font-bold select-none mt-7 text-white/65">{header}</h3>
      <div className="relative">
        <form onSubmit={handleEdit}>
          {header === "Description" ? (
            <textarea
              className="w-[90%] py-3 overflow-hidden text-base bg-transparent border-b border-red-900 resize-none focus:outline-none focus:border-red-500"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              disabled={disabled || !edit}
              maxLength={max}
              rows={3}
            />
          ) : (
            <input
              className="w-full h-full py-3 text-base bg-transparent border-b border-red-900 focus:outline-none focus:border-red-500"
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={disabled || !edit}
              maxLength={max}
            />
          )}
          {header !== "Email" && (
            <button className="absolute right-0 p-1 rounded-full cursor-pointer bottom-3 active:bg-secondarydark">
              {edit ? (
                <FaCheck className="text-2xl text-white/65" />
              ) : (
                <MdEdit className="text-2xl text-white/65" />
              )}
            </button>
          )}
          {edit && (
            <p className="absolute text-sm select-none right-3 bottom-10 text-white/65">
              {max - inputValue.length}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
