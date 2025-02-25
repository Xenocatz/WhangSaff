import { useSelector } from "react-redux";
import { MdAccountCircle } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { auth } from "../../Config/firebase";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/userProfileIMG/blank-image.png";
import { toast } from "react-toastify";

export default function Settings() {
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);
  const handleLogout = () => {
    auth.signOut();
    if (currentRoom) {
      currentRoom = null;
    }
  };
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <section className="absolute top-0 right-0 z-10 w-full h-full text-white bg-darkbg">
      <div className="w-full p-6 ">
        <h1 className="text-2xl font-semibold select-none">Settings</h1>
      </div>

      {/* <SettingsComponent
        header="Account"
        children={<MdAccountCircle className="text-3xl " />}
      /> */}
      <SettingsComponent
        header="Color Theme"
        onclick={() => {
          toast.info("Fitur sedang dalam pengembangan");
        }}
        children={<IoIosColorPalette className="text-3xl " />}
      />
      <Link to="/login">
        <SettingsComponent
          header="Logout"
          onclick={handleLogout}
          children={<RiLogoutBoxRLine className="text-3xl text-red-500" />}
        />
      </Link>
    </section>
  );
}

const SettingsComponent = ({ children, header, onclick }) => {
  return (
    <div className="cursor-pointer hover:bg-secondarydark" onClick={onclick}>
      <div className="flex items-center w-full gap-3 rounded-md ">
        <div className="p-5">{children}</div>
        <div className="flex flex-col w-full h-full py-5 border-b border-b-slate-500/40">
          <p
            className={`text-base select-none ${
              header === "Logout" && "text-red-500"
            }`}
          >
            {header}
          </p>
        </div>
      </div>
    </div>
  );
};
