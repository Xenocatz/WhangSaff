import { motion } from "framer-motion";
import RegisterBg from "../assets/bgChats/bg2.jpg";
import InputForm from "../component/element/InputForm";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const loginVariant = {
    in: {
      opacity: 1,
    },
    stay: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.2, delayChildren: 0.5 },
    },
    out: {
      opacity: 0,
      transition: { duration: 1, staggerChildren: 0.1 },
    },
  };

  const loginItemsVariants = {
    in: { x: 900, transition: { duration: 0.5, ease: "easeInOut" } },
    stay: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    out: { x: 900, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const welcomeVariant = {
    in: {
      opacity: 1,
    },
    stay: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.2, delayChildren: 0.5 },
    },
    out: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.1 },
    },
  };

  const welcomeItemsVariants = {
    in: { x: -900, transition: { duration: 0.5, ease: "easeInOut" } },
    stay: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    out: { x: -900, transition: { duration: 0.5, ease: "easeInOut" } },
  };
  return (
    <div className="grid h-full min-h-screen place-items-center font-poppins">
      <div
        style={{ backgroundImage: `url(${RegisterBg})` }}
        className="h-full w-full max-h-[1080px] max-w-[1920px] bg-center bg-cover overflow-hidden shadow-2xl "
      >
        <div className="relative flex flex-row-reverse items-center justify-between h-full px-20 bg-black/30">
          {/* bg animasi */}
          <motion.div
            animate={{
              opacity: 0.9,
              rotate: -50,
              scale: [2, 1.5],
              width: 1920,
              x: -1200,
              y: [0, -500, 0],
              transition: { duration: 1, ease: "easeInOut" },
            }}
            exit={{
              opacity: 1,
              rotate: 0,
              scale: [1.5, 2, 1],
              x: 0,
              y: [0, -600, 0],
              backgroundColor: "#141d2c",
              transition: { duration: 1, delay: 0.1, ease: "easeInOut" },
            }}
            className="absolute w-[1920px] h-[1080px] top-0 right-0 bg-darkRed "
          ></motion.div>

          {/* Login Form */}
          <motion.div className="z-10 flex justify-end w-1/2">
            <motion.div
              variants={loginVariant}
              initial="in"
              animate="stay"
              exit="out"
              className="flex flex-col w-4/5 gap-10 p-10 rounded-3xl backdrop-blur-lg bg-darkRed/10"
            >
              <motion.h1
                variants={loginItemsVariants}
                className="text-5xl font-bold text-center text-white"
              >
                Register
              </motion.h1>
              <motion.div
                variants={loginVariant}
                initial="in"
                animate="stay"
                exit="out"
                className="flex flex-col mt-20 space-y-4"
              >
                <motion.div
                  variants={loginItemsVariants}
                  className="flex flex-col w-full mb-5 space-y-20"
                >
                  {/* username */}
                  <motion.div
                    variants={loginItemsVariants}
                    className="relative"
                  >
                    <InputForm
                      label="Username"
                      type="text"
                      id="username"
                      tipe="register"
                    />
                    <IoPerson className="absolute top-0 right-0 text-3xl text-white rounded-xl bg-black/10" />
                  </motion.div>
                  {/* email */}
                  <motion.div
                    variants={loginItemsVariants}
                    className="relative"
                  >
                    <InputForm
                      label="Email"
                      type="text"
                      id="email"
                      tipe="register"
                    />
                    <MdEmail className="absolute top-0 right-0 text-3xl text-white rounded-xl bg-black/10" />
                  </motion.div>
                  {/* password */}
                  <motion.div
                    variants={loginItemsVariants}
                    className="relative"
                  >
                    <InputForm
                      label="Password"
                      type={!showPassword ? "password" : "text"}
                      id="password"
                      tipe="register"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 right-0 text-3xl text-white rounded-full bg-black/10"
                    >
                      {!showPassword ? (
                        <FaEyeSlash className="text-3xl text-white" />
                      ) : (
                        <FaEye className="text-3xl text-white" />
                      )}
                    </button>
                  </motion.div>
                </motion.div>
                <motion.button
                  variants={loginItemsVariants}
                  className="px-2 py-3 text-2xl font-semibold text-white rounded-full bg-lightRed"
                >
                  Register
                </motion.button>
                <motion.p
                  variants={loginItemsVariants}
                  className="text-center text-white"
                >
                  Sudah punya akun?{" "}
                  <Link to="/login" className="text-red-500">
                    Login
                  </Link>
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Welcome */}
          <div className="z-10 flex flex-col items-start justify-center w-1/2 ">
            <motion.div
              variants={welcomeVariant}
              initial="in"
              animate="stay"
              exit="out"
              className="flex flex-col w-3/5 gap-5 pb-28"
            >
              <motion.h1
                variants={welcomeItemsVariants}
                className="text-6xl font-bold text-white text-start"
              >
                Welcome to <span className="text-lightRed">WhangSaff!</span>
              </motion.h1>
              <motion.p
                variants={welcomeItemsVariants}
                className="text-xl leading-relaxed text-white text-start"
              >
                Yokoso, watashi no WhangSaff sociaty. <br /> Platform chat yang
                sederhana. <br /> Kirim pesan dan foto walau <br /> tidak ada
                yang balas.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
