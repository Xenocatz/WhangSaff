import { MdOutlinePersonSearch } from "react-icons/md";
const SearchBar = ({ onclick }) => {
  return (
    <div className="relative flex ">
      <form className="flex items-center justify-start w-full overflow-hidden rounded-lg shadow-lg lg:pr-4 lg:text-sm focus:outline-hidden focus:ring-2 focus:ring-secondarylight bg-primarylight">
        <button
          className="p-2 pl-4 cursor-pointer hover:bg-secondarydark"
          onClick={onclick}
        >
          <MdOutlinePersonSearch className="text-2xl text-white" />
        </button>
        <input
          type="text"
          placeholder="Search"
          className="w-full px-5 py-2 text-base tracking-wider text-white bg-transparent placeholder:text-white/50 focus:outline-none "
        />
      </form>
    </div>
  );
};

export default SearchBar;
