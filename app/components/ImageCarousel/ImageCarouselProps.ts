export default interface ImageCarouselProps {
  gifs: string[];
  gifAlt: string;
  imgClasses?: string;
  onLoadingChange?: (isLoading: boolean) => void;
}
