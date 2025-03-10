import { BsFillSendFill } from "react-icons/bs";
import gemini from "../../assets/png/BrandLogo.org-Gemini-Icon.png";
import { useEffect, useRef, useState } from "react";
import MyChats from "../group/chats/myChats";
import { makePrompt } from "../../Config/Gemini";
import FriendChats from "../group/chats/friendChats";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
export default function GeminiRoom() {
  const [history, setHistory] = useState([{ role: "user", text: "Hello" }]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const endaRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("geminiHistory");
    if (savedMessages) {
      setHistory(JSON.parse(savedMessages));
    } else {
      setHistory([{ role: "user", text: "" }]);
    }
  }, []);

  const handleSendPrompt = async (e) => {
    e.preventDefault();
    try {
      if (prompt.trim() !== "") {
        setLoading(true);

        endaRef.current.scrollIntoView({ behavior: "smooth" });
        await makePrompt(prompt, history, setHistory);
      }
    } catch (error) {
      toast.error("Error sending message: " + error.message);
    } finally {
      setPrompt("");
      setLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("geminiHistory");
    setHistory([{ role: "user", text: "" }]);
    toast.success("Chat history cleared.");
  };
  return (
    <section className="flex flex-col w-full h-full bg-darkbg">
      {/* header */}
      <header className="flex items-center justify-start w-full px-10 py-1">
        <div className="flex items-center gap-5">
          <div className="bg-white rounded-full select-none w-14">
            <img src={gemini} alt="" />
          </div>
          <span>
            <h1 className="text-xl font-semibold text-white select-none">
              ChatBot
            </h1>
            <p className="text-sm select-none text-white/75">
              Gemini 2.0 flash
            </p>
          </span>
        </div>
      </header>
      {/* main */}
      <main className="relative bg-black/30 grow">
        {/* chat */}
        <div className="relative flex flex-col h-full px-10 py-2 overflow-y-auto scrollbar">
          {history.length > 0 &&
            history.map((msg, index) =>
              msg.role === "model" ? (
                <FriendChats key={index} text={msg.text} />
              ) : (
                <MyChats key={index} text={msg.text} />
              )
            )}
          <div ref={endaRef} />
          <button
            onClick={clearHistory}
            title="clear history"
            className="absolute p-2 rounded-full cursor-pointer right-5 bottom-18 bg-primarylight hover:bg-secondarydark"
          >
            <MdOutlineDeleteOutline className="text-2xl text-white" />
          </button>
        </div>
        {/* input user */}
        <div className="absolute bottom-0 w-full px-5 py-2">
          <form
            onSubmit={handleSendPrompt}
            className="flex items-center gap-2 pl-2 overflow-hidden rounded-full bg-darkbg"
          >
            <input
              type="text"
              placeholder="Tanyakan apapun..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              className="w-full px-3 text-base text-white placeholder:text-white/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              title="kirim"
              className="py-3 pl-3 pr-4 bg-transparent border-l-2 cursor-pointer hover:bg-secondarydark border-l-black/20"
            >
              <BsFillSendFill className="text-2xl text-white" />
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}
