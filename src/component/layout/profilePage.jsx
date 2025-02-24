import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/userProfileIMG/blank-image.png";

export default function ProfilePage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <section className="absolute top-0 right-0 z-10 w-full h-full text-white bg-darkbg">
      <div className="w-full p-6 ">
        <h1 className="text-2xl font-semibold select-none">Profile</h1>
      </div>
      <div className="py-5">
        <div className="px-3">
          <div className="p-1 rounded-full bg-secondarylight w-fit ">
            <img
              src={currentUser?.avatar || defaultAvatar}
              alt=""
              className="object-cover w-40 h-40 rounded-full select-none"
            />
          </div>
          <h3 className="mt-10 font-bold select-none text-white/65">
            Username
          </h3>
          <p className="text-base ">{currentUser.username}</p>
          <hr className="mt-3 border-red-900" />

          <h3 className="mt-6 font-bold select-none text-white/65">Email</h3>
          <p>{currentUser.email}</p>
          <hr className="mt-3 border-red-900" />

          <h3 className="mt-6 font-bold select-none text-white/65">
            Description
          </h3>
          <p>{currentUser.description}</p>
          <hr className="mt-3 border-red-900" />
        </div>
      </div>
    </section>
  );
}
