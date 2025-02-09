import { motion } from "framer-motion";

export default function InputForm({
  label,
  type,
  tipe,
  id,
  value,
  setValue,
  ...rest
}) {
  const color = tipe === "login" ? "lightBlue" : "red-500";

  return (
    <div className="relative w-full">
      <motion.label
        animate={{
          y: value ? -40 : 0,
          x: value ? -7 : 0,
          scale: value ? 0.9 : 1,
        }}
        htmlFor={id}
        className={`absolute ${
          value ? `text-${color}` : "text-white"
        } top-1 md:text-2xl left-1`}
      >
        {label}
      </motion.label>
      <input
        type={type}
        id={id}
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className={`w-full py-2 pr-2 md:text-xl text-white bg-transparent border-b-2 ${
          tipe === "login" ? "border-b-lightBlue" : "border-b-lightRed"
        } focus:outline-none `}
        {...rest}
      />
    </div>
  );
}
