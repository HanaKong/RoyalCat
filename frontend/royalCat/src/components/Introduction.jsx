import { forwardRef, useState, useEffect, useRef } from "react";
import "./Introduction.css";

const Introduction = forwardRef((props, ref) => {
  const slides = [
    { image: "./images/Web-01.png", text: "캐릭터" },
    { image: "./images/Web-02.png", text: "아이템" },
    { image: "./images/Web-03.png", text: "맵" },
    { image: "./images/Web-04.png", text: "채팅" },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const slideIntervalRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const resetAutoSlide = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    slideIntervalRef.current = setInterval(() => goToNext(), 3000);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const distance = touchStartX - e.changedTouches[0].clientX;
    if (distance > 50) goToNext();
    if (distance < -50) goToPrevious();
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === slides.length + 1) setCurrentIndex(1);
    if (currentIndex === 0) setCurrentIndex(slides.length);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => clearInterval(slideIntervalRef.current);
  }, []);

  const handleInteraction = (action, index = null) => {
    if (index !== null && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    } else {
      action();
    }
    resetAutoSlide();
  };

  return (
    <div className="intro-container" ref={ref}>
      <div className="title">게임 소개</div>
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="carousel-fixed-text">
          {slides.map((slide, index) => (
            <h2
              key={index}
              className={index + 1 === currentIndex ? "active-text" : ""}
              onClick={() => handleInteraction(null, index + 1)}
            >
              {slide.text}
            </h2>
          ))}
        </div>
        <div className="content-box">
          <div className="sub-content">
            <div
              className="carousel-content"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitioning ? "transform 0.5s ease" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedSlides.map((slide, index) => (
                <div className="carousel-slide" key={index}>
                  <img src={slide.image} alt={`slide-${index}`} />
                </div>
              ))}
            </div>
            <button
              className="prev"
              disabled={isTransitioning}
              onClick={() => handleInteraction(goToPrevious)}
            >
              &#10094;
            </button>
            <button
              className="next"
              disabled={isTransitioning}
              onClick={() => handleInteraction(goToNext)}
            >
              &#10095;
            </button>
            <div className="carousel-toggles">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={index + 1 === currentIndex ? "active-toggle" : ""}
                  onClick={() => handleInteraction(null, index + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Introduction.displayName = "Introduction";

export default Introduction;
