import { motion } from "framer-motion";
import RegisterBg from "../assets/bgChats/registerbg.svg";
import InputForm from "../component/element/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { register, signInWithGoogle } from "../service/authService";
import { FcGoogle } from "react-icons/fc";
import DefaultAvatar from "../assets/userProfileIMG/blank-image.png";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({ file: null, url: null });

  const Navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password || !avatar?.file) {
        toast.error("Please fill all fields and upload an avatar.");
        return;
      }

      const result = await register({ username, email, password, avatar });
      if (!result) {
        throw new Error("Registration failed");
      }

      Navigate("/login", { replace: true });
      setUsername("");
      setEmail("");
      setPassword("");
      setAvatar({ file: null, url: null });
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error registering user: " + error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar({ file, url });
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Navigate("/", { replace: true });
    } catch (error) {
      toast.error("Error signing in with Google: " + error.message);
    }
  };

  const loginVariant = {
    in: {
      opacity: 0,
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
      <div className="relative h-full w-full max-h-[1080px] max-w-[1920px] bg-center bg-cover overflow-hidden shadow-2xl ">
        <div
          className="absolute top-0 left-0 w-full h-full scale-x-[-1] bg-center bg-cover"
          style={{ backgroundImage: `url(${RegisterBg})` }}
        />
        <div className="relative flex flex-row-reverse items-center justify-between h-full md:px-20 bg-black/30">
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
              transition: { duration: 1, delay: 0.1, ease: "easeInOut" },
            }}
            className="absolute w-[1920px] h-[1080px] top-0 right-0 bg-linear-180/oklch from-primarydark/10 from-20% to-secondarydark "
          ></motion.div>
          {/* register Form */}
          <motion.div className="z-10 flex justify-center w-full md:justify-end md:w-1/2">
            <motion.div
              variants={loginVariant}
              initial="in"
              animate="stay"
              exit="out"
              className="flex flex-col w-4/5 p-10 rounded-3xl backdrop-blur-lg bg-darkRed/10"
            >
              <motion.h1
                variants={loginItemsVariants}
                className="text-4xl font-bold text-center text-white md:text-4xl"
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
                <motion.form
                  variants={loginItemsVariants}
                  onSubmit={handleRegister}
                  className="flex flex-col w-full mb-5 space-y-14"
                >
                  {/* username */}
                  <motion.div
                    variants={loginItemsVariants}
                    className="relative flex items-end "
                  >
                    {/* avatar */}
                    <label
                      htmlFor="avatar"
                      className="flex cursor-pointer w-28"
                    >
                      <input
                        type="file"
                        id="avatar"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleAvatarChange}
                        hidden
                      />
                      <img
                        src={avatar.url ? avatar.url : DefaultAvatar}
                        alt=""
                        className="object-cover rounded-full shadow-xl w-14 h-14 md:size-16 "
                      />
                    </label>
                    <InputForm
                      label="Username"
                      type="text"
                      id="username"
                      tipe="register"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <IoPerson className="absolute right-0 text-2xl text-white top-4 md:top-8 md:text-2xl rounded-xl bg-black/10" />
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MdEmail className="absolute top-0 right-0 text-2xl text-white md:text-3xl rounded-xl bg-black/10" />
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      className="absolute top-0 right-0 text-2xl text-white rounded-full md:text-3xl bg-black/10"
                    >
                      {!showPassword ? (
                        <FaEyeSlash className="text-white " />
                      ) : (
                        <FaEye className="text-white " />
                      )}
                    </button>
                  </motion.div>
                  <motion.button
                    variants={loginItemsVariants}
                    type="submit"
                    disabled={!username || !email || !password}
                    className="px-2 py-3 text-xl font-semibold text-white rounded-full cursor-pointer bg-lightRed hover:bg-lightRed/80"
                  >
                    Register
                  </motion.button>
                </motion.form>
                <motion.p
                  variants={loginItemsVariants}
                  className="text-sm text-center text-white"
                >
                  Sudah punya akun?{" "}
                  <Link to="/login" className="text-red-500">
                    Login
                  </Link>
                </motion.p>
                <hr className="border-white/50" />
                <motion.p
                  variants={loginItemsVariants}
                  className="flex items-center justify-center text-sm text-center text-white/50 md:text-base"
                >
                  other method
                </motion.p>
                <motion.button
                  variants={loginItemsVariants}
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 px-2 py-2 text-sm font-semibold bg-white rounded-full cursor-pointer text-darkbg md:py-3 md:text-xl hover:bg-white/80"
                >
                  <FcGoogle className="text-2xl" />
                  Sign in with Google
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Welcome */}
          <div className="z-10 flex-col items-start justify-center hidden w-1/2 md:flex ">
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
