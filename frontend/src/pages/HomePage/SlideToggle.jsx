import React, { useState, useRef } from "react";
import Header from "./Header";
import Shop from "../Shop/Shop";

const SlideToggle = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const gap = 16;
  const gapPercent = (gap / window.innerWidth) * 100;
  const timeoutRef = useRef(null);

  const slideToShop = () => {
    clearTimeout(timeoutRef.current);
    setCurrentSlide(1);
  };

  const slideToHeader = () => {
    clearTimeout(timeoutRef.current);
    setCurrentSlide(0);
  };

  return (
    <div className="w-full overflow-hidden relative">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentSlide * (100 + gapPercent)}%)`,
          gap: `${gap}px`,
        }}
      >
        {/* Header Slide */}
        <div
          className="relative flex-shrink-0 h-full"
          style={{ width: `calc(100% - ${gap}px)`, boxSizing: "border-box" }}
        >
          <Header />
          {/* Transparent clickable area on right side of Header */}
          {currentSlide === 0 && (
            <button
              onClick={slideToShop}
              aria-label="Go to Shop"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "50%", // right half
                height: "100%",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 10,
              }}
            />
          )}
        </div>

        {/* Shop Slide */}
        <div
          className="relative flex-shrink-0 h-full"
          style={{ width: `calc(100% - ${gap}px)`, boxSizing: "border-box" }}
        >
          <Shop />
          {/* Transparent clickable area on left side of Shop */}
          {currentSlide === 1 && (
            <button
              onClick={slideToHeader}
              aria-label="Go back to Header"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%", // left half
                height: "100%",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 10,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideToggle;
