import { HiDotsHorizontal } from "react-icons/hi";
import Contact from "../../element/contact";
import { useState } from "react";
import { motion } from "framer-motion";
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
        <li className="px-5 py-2 text-lg font-semibold rounded-full select-none lg:text-sm lg:hover:bg-mediumDark lg:hover:text-white active:bg-mediumDark active:text-white">
          Profile
        </li>
        <li className="px-5 py-2 text-lg font-semibold bg-red-500 rounded-full select-none lg:hover:bg-red-700 lg:hover:text-white active:bg-red-700 active:text-white text-white/70 lg:text-sm ">
          <button>Logout</button>
        </li>
      </ul>
    </motion.nav>
  );
}

export default function ContactAtas({ nama, avatar }) {
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
      <Contact nama={nama} avatar={avatar} />
      <button
        className="p-2 duration-100 rounded-full lg:hover:bg-surfaces active:ring-2 active:ring-lightBlue"
        onClick={() => setOpen(!open)}
      >
        <HiDotsHorizontal className="text-3xl text-white lg:text-xl" />
      </button>
      {open && <Navlist open={open} navVariants={navVariants} />}
    </div>
  );
}
