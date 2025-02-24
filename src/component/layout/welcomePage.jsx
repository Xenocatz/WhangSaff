import bubblechat from "../../assets/png/bubleChat.png";
import cat from "../../assets/png/cat.png";
export default function WelcomePage() {
  return (
    <section className="w-full h-full p-5 text-white grow-1 bg-secondarylight">
      <div className="relative flex flex-col items-center justify-center w-full h-full bg-secondarydarkbg rounded-2xl">
        <img src={bubblechat} alt="" className="w-40" />
        <h2 className="text-2xl font-semibold">Welcome to whangsaff</h2>
        <p>ayo tambahkan temanmu dan mulailah berbagi cerita di sini</p>
        <img src={cat} alt="" className="absolute top-0 right-0 w-40" />
      </div>
    </section>
  );
}
