import { useState, useEffect } from "react";

const VisualImagesBox = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = (Math.floor(Math.random() * 3) + 7) * 1000,
}) => {
  const [curr, setCurr] = useState(0);

  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="visual__item">
      <div>{slides[curr]}</div>
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
};

export default VisualImagesBox;
