import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import ImageCarouselProps from "./ImageCarouselProps";

export default function ImageCarousel({
  gifs,
  gifAlt,
  imgClasses,
  onLoadingChange,
}: ImageCarouselProps) {
  const [gifIndex, setGifIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const changeGif = () => {
    onLoadingChange?.(true);
    setIsLoading(true);

    const lastValidIndex = gifs.length - 1;
    const nextIndex = gifIndex === lastValidIndex ? 0 : gifIndex + 1;
    setGifIndex(nextIndex);
  };

  return (
    <div className="relative grid w-full">
      <AnimatePresence mode="wait">
        <motion.video
          autoPlay
          loop
          key={gifIndex}
          className={imgClasses}
          src={gifs[gifIndex]}
          aria-label={gifAlt}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onLoadedData={() => {
            onLoadingChange?.(false);
            setIsLoading(false);
          }}
        />

        {gifs.length > 1 && !isLoading && (
          <motion.div
            title="Next Image"
            onClick={changeGif}
            className="group/arrow absolute top-0 right-0 flex h-full w-10 cursor-pointer items-center bg-black/20"
          >
            <BsArrowRight className="ml-2 h-5 w-5 text-white group-hover/arrow:scale-130" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
