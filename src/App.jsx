import { auth } from "./Config/firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function App() {
  const handleLogOut = () => {
    console.log(auth.signOut());
    auth.signOut();
  };
  return (
    <div className="flex items-center justify-start h-screen gap-1 px-2 font-poppins">
      <div className="p-2 border-2 h-[600px] flex flex-col justify-between border-black w-96">
        <div className="flex gap-2">
          <h1 className="">user id : </h1>
          <p>halo</p>
        </div>
        <Input />
      </div>
      <FormLogin />
      <button className="p-3 rounded bg-slate-300" onClick={handleLogOut}>
        Logout
      </button>
      <Link to="/whangsaff">whangsaff</Link>
    </div>
  );
}

const Input = () => {
  const handleButtonKirim = () => {
    console.log(auth.currentUser.uid);
  };

  return (
    <div className="flex gap-2">
      <input
        placeholder="masukan text"
        type="text"
        className="p-3 rounded bg-slate-500"
      />
      <button onClick={handleButtonKirim} className="p-3 rounded bg-slate-300">
        kirim
      </button>
    </div>
  );
};

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      console.log("Login result:", result);

      if (result) {
        setEmail("");
      }
      setPassword("");
    } catch (error) {
      toast.error("Error logging in: " + error.message);
    }
  };

  return (
    <form action="" onSubmit={handleLogin} className="flex flex-col gap-2">
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="p-3 rounded bg-slate-500"
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="p-3 rounded bg-slate-500"
      />
      <button className="p-3 rounded bg-slate-300">login</button>
    </form>
  );
};

export default App;
