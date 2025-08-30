import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function ImageCarousel({
  gifs,
  gifAlt,
  imgClasses,
}: {
  gifs: string[];
  gifAlt: string;
  imgClasses?: string;
}) {
  const [gifIndex, setGifIndex] = useState<number>(0);

  const changeGif = () => {
    const lastValidIndex = gifs.length - 1;
    const nextIndex = gifIndex == lastValidIndex ? 0 : gifIndex + 1;

    setGifIndex(nextIndex);
  };

  return (
    <div className="relative">
      <img className={imgClasses} src={gifs[gifIndex]} alt={gifAlt} />
      {gifs.length > 1 && (
        <div
          title="Next Image"
          onClick={changeGif}
          className="absolute items-center flex top-0 right-0 w-10 h-full bg-black/60 cursor-pointer z-1"
        >
          <BsArrowRight className="w-5 h-5 ml-2 text-white" />
        </div>
      )}
    </div>
  );
}
