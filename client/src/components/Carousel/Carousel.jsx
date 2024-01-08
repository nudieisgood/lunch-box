import { useState, useEffect } from "react";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  setFeature,
}) {
  const [curr, setCurr] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setFeature(curr);
    }, 0);
  }, [curr]);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel">
      <div
        className="carousel__slides"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      <div className="carousel__chevron">
        <button onClick={prev} className="btn-text">
          <BsChevronLeft size={30} />
        </button>

        <button onClick={next} className="btn-text">
          <BsChevronRight size={30} />
        </button>
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <div
            onClick={() => {
              setCurr(i);
            }}
            key={i}
            className={curr === i ? "dots__dot dots__dot--active" : "dots__dot"}
          />
        ))}
      </div>
    </div>
  );
}
