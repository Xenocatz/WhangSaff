import { IoMdPersonAdd } from "react-icons/io";
const SearchAndAdd = () => {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-5 py-0 text-base tracking-wider text-white rounded-full shadow-lg lg:px-4 lg:text-xs focus:outline-none focus:ring-2 focus:ring-lightBlue bg-surfaces"
      />
      <button
        type="button"
        className="p-3 rounded-full shadow-lg cursor-pointer bg-surfaces active:ring-2 active:ring-lightBlue"
      >
        <IoMdPersonAdd className="text-2xl text-white lg:text-base" />
      </button>
    </div>
  );
};

export default SearchAndAdd;
