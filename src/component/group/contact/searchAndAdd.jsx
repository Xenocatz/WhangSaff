import { IoMdPersonAdd } from "react-icons/io";

const SearchAndAdd = ({ onclick }) => {
  return (
    <div className="relative flex gap-3">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-5 py-0 text-base tracking-wider text-white rounded-full shadow-lg lg:px-4 lg:text-sm focus:outline-none focus:ring-2 focus:ring-lightBlue bg-surfaces"
      />
      <button
        type="button"
        className="p-2 text-2xl text-white rounded-full shadow-lg cursor-pointer bg-surfaces active:ring-2 active:ring-lightBlue"
        onClick={onclick}
      >
        <IoMdPersonAdd />
      </button>
    </div>
  );
};

export default SearchAndAdd;
