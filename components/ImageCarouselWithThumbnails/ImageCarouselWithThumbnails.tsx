import { AnimatePresence, motion } from "framer-motion";
import { BiFullscreen } from "react-icons/bi";
import index from "swr";
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import { useState } from "react";
import { ImageCarouselWithThumbnailsProps } from "./ImageCarouselWithThumbnailsProps";

export default function ImageCarouselWithThumbnails({
  project,
  onFullScreen,
}: ImageCarouselWithThumbnailsProps) {
  const [isImgLoading, setIsImgLoading] = useState(false);

  return (
    <div className="relative flex-2">
      {isImgLoading && (
        <div className="absolute flex h-full w-full items-center justify-center">
          <span className="text-white opacity-50">Loading...</span>
        </div>
      )}
      <div className="group max-h-full w-full content-center rounded-lg p-4 opacity-50 hover:opacity-100">
        <div className="flex justify-center">
          <img
            className="max-h-50 group-hover:hidden"
            src={project.img ?? ""}
            alt={project.imgAlt ?? ""}
          />
          <div className="hidden w-full group-hover:flex">
            <ImageCarousel
              imgClasses="max-h-50 place-self-center"
              gifs={project.gifs}
              gifAlt={project.gifAlt ?? ""}
              onLoadingChange={(isLoading) => setIsImgLoading(isLoading)}
            />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {!isImgLoading && (
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={() => onFullScreen(project)}
              className="mt-3 flex w-fit cursor-pointer justify-start gap-1"
            >
              <BiFullscreen size={25} className="text-gray-400/50" />
              <span className="text-gray-400">Full Screen</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
