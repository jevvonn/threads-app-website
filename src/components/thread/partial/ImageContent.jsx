import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

export default function ImageContent({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative group">
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].url}
        onLoad={(e) => setIsLoaded(false)}
        className="rounded object-contain"
      />
      {isLoaded && (
        <div className="w-full">
          <Skeleton width="100%" height={200} />
        </div>
      )}
      {/* Left Arrow */}
      <button className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <AiOutlineLeft onClick={prevSlide} size={30} />
      </button>
      {/* Right Arrow */}
      <button className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <AiOutlineRight onClick={nextSlide} size={30} />
      </button>
    </div>
  );
}
