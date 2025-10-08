import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import ImageCarouselProps from "./ImageCarouselProps";

export default function ImageCarousel({
  gifs,
  gifAlt,
  imgClasses,
}: ImageCarouselProps) {
  const [gifIndex, setGifIndex] = useState<number>(0);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => preloadImages, [gifs]);

  const preloadImages = () => {
    const promises = gifs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    );

    Promise.all(promises).then(() => setLoaded(true));
  };

  const changeGif = () => {
    const lastValidIndex = gifs.length - 1;
    const nextIndex = gifIndex === lastValidIndex ? 0 : gifIndex + 1;
    setGifIndex(nextIndex);
  };

  if (!loaded) {
    return (
      <div className="flex h-full w-full items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative grid w-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={gifIndex}
          className={imgClasses}
          src={gifs[gifIndex]}
          alt={gifAlt}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {gifs.length > 1 && (
        <div
          title="Next Image"
          onClick={changeGif}
          className="group/arrow absolute top-0 right-0 flex h-full w-10 cursor-pointer items-center bg-black/20"
        >
          <BsArrowRight className="ml-2 h-5 w-5 text-white group-hover/arrow:scale-130" />
        </div>
      )}
    </div>
  );
}
