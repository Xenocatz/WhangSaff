import { motion } from "framer-motion";
import { useState } from "react";

export default function InputForm({ label, type, tipe, id, ...rest }) {
  const [value, setValue] = useState("");
  const color = tipe === "login" ? "lightBlue" : "red-500";
  return (
    <div className="relative">
      <motion.label
        animate={{
          y: value ? -40 : 0,
          x: value ? -7 : 0,
          scale: value ? 0.9 : 1,
        }}
        // transition={{ duration: 0.2, ease: "easeInOut" }}
        htmlFor={id}
        className={`absolute ${
          value ? `text-${color}` : "text-white"
        } top-1 text-2xl left-1`}
      >
        {label}
      </motion.label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        className={`w-full py-2 pr-2 text-xl text-white bg-transparent border-b-2 ${
          tipe === "login" ? "border-b-lightBlue" : "border-b-lightRed"
        } focus:outline-none `}
        {...rest}
      />
    </div>
  );
}
