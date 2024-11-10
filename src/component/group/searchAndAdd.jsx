import { IoMdPersonAdd } from "react-icons/io";
const SearchAndAdd = () => {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-5 py-0 text-lg tracking-wider text-white rounded-full lg:px-4 lg:text-xs focus:outline-none focus:ring-2 focus:ring-lightBlue bg-darkbg "
      />
      <button className="p-3 rounded-full bg-darkbg">
        <IoMdPersonAdd className="text-3xl text-white lg:text-base" />
      </button>
    </div>
  );
};

export default SearchAndAdd;
