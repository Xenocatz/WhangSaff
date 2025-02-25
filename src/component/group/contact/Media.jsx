export default function Media({ media }) {
  return (
    <div className="flex flex-1 min-h-full pr-1 bg-secondarydarkbg">
      <div className="flex flex-col w-full px-3 overflow-y-auto scrollbar">
        <div className="flex justify-start py-2 border-b-2 border-b-primarylight">
          <h2 className="text-lg font-semibold tracking-wide text-white ">
            Media
          </h2>
          <div>
            <span className="text-sm text-white/75">({media?.length})</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-start w-full gap-2 py-2">
          {media?.length > 1 &&
            media.map((m) => <MediaItem key={m.id} media={m.img} />)}
        </div>
      </div>
    </div>
  );
}

const MediaItem = ({ media }) => {
  return <img src={media} alt="" className="object-cover w-21" />;
};
