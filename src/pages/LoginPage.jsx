import { motion } from "framer-motion";
import LoginBg from "../assets/bgChats/Polygon Luminary.svg";
import InputForm from "../component/element/InputForm";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import { login, signInWithGoogle } from "../service/authService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { listenToAuthChanges } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });

      if (result) {
        setEmail("");
        Navigate("/", { replace: true });
        dispatch(listenToAuthChanges());
      }

      setPassword("");
    } catch (error) {
      toast.error("Error logging in: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Navigate("/", { replace: true });
      f;
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
    in: { x: -900, transition: { duration: 0.5, ease: "easeInOut" } },
    stay: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    out: { x: -900, transition: { duration: 0.5, ease: "easeInOut" } },
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
      opacity: 0,
      transition: { duration: 1, staggerChildren: 0.1 },
    },
  };
  const welcomeItemsVariants = {
    in: { x: 900, transition: { duration: 0.5, ease: "easeInOut" } },
    stay: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    out: { x: 900, transition: { duration: 0.5, ease: "easeInOut" } },
  };
  return (
    <div className="grid h-full min-h-screen place-items-center font-poppins">
      <div
        className="h-full w-full max-h-[1080px] max-w-[1920px] overflow-hidden shadow-2xl bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${LoginBg})` }}
      >
        <div className="relative flex items-center justify-center w-full h-full md:justify-between md:px-20 backdrop-blur-none">
          {/* bg animasi */}
          <motion.div
            animate={{
              opacity: 0.9,
              rotate: 50,
              scale: [2, 1.5],
              width: 1920,
              x: 1200,
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
            className="absolute w-[1920px] h-[1080px] top-0 left-0 bg-linear-180/oklch from-blueprimarydark/10 from-20% to-bluesecondarydark "
          ></motion.div>
          {/* Login Form */}
          <motion.div className="z-10 flex justify-center w-full md:justify-start md:w-1/2">
            <motion.div
              variants={loginVariant}
              initial="in"
              animate="stay"
              exit="out"
              className="flex flex-col w-4/5 gap-10 p-10 rounded-3xl backdrop-blur-lg bg-linear-45/oklch from-blueprimarydark/5 from-20% to-bluesecondarydark/5"
            >
              <motion.h1
                variants={loginItemsVariants}
                className="text-4xl font-bold text-center text-white md:text-4xl"
              >
                Login
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
                  onSubmit={handleLogin}
                  className="flex flex-col w-full space-y-14"
                >
                  {/* Email */}
                  <motion.div
                    variants={loginItemsVariants}
                    className="relative"
                  >
                    <InputForm
                      label="Email"
                      type="email"
                      id="email"
                      tipe="login"
                      value={email}
                      setValue={setEmail}
                    />
                    <IoPerson className="absolute top-0 right-0 text-2xl text-white md:text-3xl rounded-xl bg-black/10" />
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
                      tipe="login"
                      value={password}
                      setValue={setPassword}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                      className="absolute top-0 right-0 text-2xl text-white rounded-full md:text-3xl bg-black/10"
                    >
                      {!showPassword ? (
                        <FaEyeSlash className="text-white " />
                      ) : (
                        <FaEye className="text-white" />
                      )}
                    </button>
                  </motion.div>
                  {/* button login */}
                  <motion.button
                    variants={loginItemsVariants}
                    type="submit"
                    className="px-2 py-2 text-lg font-semibold text-white rounded-full cursor-pointer bg-blueprimarylight hover:bg-bluesecondarydark md:py-3 md:text-2xl "
                  >
                    Login
                  </motion.button>
                </motion.form>

                <motion.p
                  variants={loginItemsVariants}
                  className="text-sm text-center text-white md:text-base"
                >
                  Belum punya akun?{" "}
                  <Link to="/register" className="text-lightBlue">
                    Register
                  </Link>
                </motion.p>
                <hr className="border-white/50" />
                <motion.p
                  variants={loginItemsVariants}
                  className="flex items-center justify-center text-sm text-center text-white/50 md:text-base"
                >
                  metode lain
                </motion.p>

                {/* other login */}
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
          <div className="z-10 flex-col items-end justify-center hidden w-1/2 md:flex ">
            <motion.div
              variants={welcomeVariant}
              initial="in"
              animate="stay"
              exit="out"
              className="flex flex-col w-3/5 gap-5 pb-28"
            >
              <motion.h1
                variants={welcomeItemsVariants}
                className="font-bold text-white text-7xl text-end"
              >
                Welcome <span className="text-lightBlue">Back!</span>
              </motion.h1>
              <motion.p
                variants={welcomeItemsVariants}
                className="text-xl leading-relaxed text-white text-end"
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

export default LoginPage;
