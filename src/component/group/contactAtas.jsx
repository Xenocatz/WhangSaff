import { HiDotsHorizontal } from "react-icons/hi";
import Contact from "../element/contact";
import { useState } from "react";
import { motion } from "framer-motion";
export default function ContactAtas() {
  const [open, setOpen] = useState(false);
  const navVariants = {
    closed: {
      opacity: 0,
      y: -20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
  return (
    <div className="relative flex items-center justify-between">
      <Contact nama={"LoneCatz"} />
      <button
        className="p-2 rounded-full hover:bg-darkbg"
        onClick={() => setOpen(!open)}
      >
        <HiDotsHorizontal className="text-3xl text-white lg:text-xl" />
      </button>
      <Navlist open={open} navVariants={navVariants} />
    </div>
  );
}

function Navlist({ open, navVariants }) {
  return (
    <motion.nav
      variants={navVariants}
      initial="closed"
      animate={open ? "open" : "closed"}
      transition={{ duration: 0.2, type: "spring" }}
      className="absolute right-0 top-16"
    >
      <ul className="flex flex-col gap-2 px-2 py-3 text-darkbg bg-lightBlue rounded-3xl">
        <li className="px-5 py-2 text-lg font-semibold rounded-full lg:text-sm hover:bg-mediumDark hover:text-white">
          Profile
        </li>
        <li className="px-5 py-2 text-lg font-semibold bg-red-500 rounded-full hover:bg-red-700 hover:text-white text-white/70 lg:text-sm ">
          <button>Logout</button>
        </li>
      </ul>
    </motion.nav>
  );
}
