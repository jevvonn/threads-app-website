import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function ImageContent({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative group">
      <img
        src={slides[currentIndex].url}
        alt={slides[currentIndex].url}
        className="rounded object-contain"
      />
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
