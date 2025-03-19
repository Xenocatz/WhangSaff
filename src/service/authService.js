import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, storage, googleProvider } from "../Config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

export const register = async ({ username, email, password, avatar }) => {
  try {
    // bikin akun
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // format waktu
    const date = new Date();
    const formattedDate = () => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    // compress avatar
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(avatar.file, options);

    // upload avatar
    const avatarRef = ref(
      storage,
      `avatars/${user.uid}/${compressedFile.name + " " + formattedDate()}`
    );
    await uploadBytes(avatarRef, compressedFile);

    // url avatar
    const avatarUrl = await getDownloadURL(avatarRef);

    // simpen data
    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      avatar: avatarUrl,
      description: "Woy der, I'm using Whangsaff",
    });

    toast.success("berhasil register, Login sono!");
    return user.accessToken;
  } catch (error) {
    console.error(error.message);
    toast.error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    toast.success(`Welcome back, ${user.email}!`);
    console.log("User info:", user);

    return userCredential._tokenResponse.registered;
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        toast.error("Password salah.");
        break;
      case "auth/user-not-found":
        toast.error("Akun dengan email ini tidak ditemukan.");
        break;
      case "auth/invalid-email":
        toast.error("Email tidak valid.");
        break;
      default:
        toast.error("Gagal login. Silakan coba lagi.");
        console.error("Error:", error.message);
    }
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      description: "Woy der, I'm using Whangsaff",
    });
    toast.success(`Welcome back, ${user.email}!`);
    return user.accessToken;
  } catch (error) {
    console.error(error);
  }
};
