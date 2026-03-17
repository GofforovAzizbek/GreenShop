import bannerpicture from "../../../images/bannerpicture.png";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Let’s Make a Better",
    subtitle:
      "1-Slide. We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    button: "Shop Now",
    image: bannerpicture,
  },
  {
    title: "Let’s Make a Better",
    subtitle:
      "2-Slide. We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    button: "Shop Now",
    image: bannerpicture,
  },
  {
    title: "Let’s Make a Better",
    subtitle:
      "3-Slide. We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    button: "Shop Now",
    image: bannerpicture,
  },
];

// Simple loading skeleton while hero photo loads
const LoadingOverlay = () => (
  <div className="flex h-[450px] items-center justify-center rounded-[24px] bg-white/80 shadow-inner">
    <div className="flex w-full max-w-5xl flex-col gap-6 px-8 py-8 md:flex-row">
      {/* Left: text skeleton */}
      <div className="flex flex-1 flex-col gap-4">
        <div className="h-5 w-36 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-5 w-5/6 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-5 w-2/3 animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-4 h-11 w-40 animate-pulse rounded-lg bg-emerald-200" />
      </div>

      {/* Right: image skeleton */}
      <div className="flex flex-1 items-center justify-center">
        <div className="h-[260px] w-full max-w-md bg-slate-200" />
      </div>
    </div>
  </div>
);

function Hero() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const trackRef = useRef(null);

  const slideCount = slides.length;

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const intervalId = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slideCount);
    }, 4500);
    return () => window.clearInterval(intervalId);
  }, [isPaused, slideCount]);

  const handleIndicatorClick = (index) => {
    setActive(index);
  };

  const onDragStart = (event) => {
    setIsPaused(true);
    setDragStart(
      event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX,
    );
  };

  const onDragEnd = (event) => {
    if (dragStart === null) return;
    const currentX = event.type.startsWith("touch")
      ? event.changedTouches[0].clientX
      : event.clientX;
    const delta = currentX - dragStart;
    if (delta > 60) {
      setActive((prev) => (prev - 1 + slideCount) % slideCount);
    } else if (delta < -60) {
      setActive((prev) => (prev + 1) % slideCount);
    }
    setDragStart(null);
    setIsPaused(false);
  };

  return (
    <div className="container pt-[15px] pb-[45px]">
      {loading ? (
        <LoadingOverlay />
      ) : (
        <div
          className="relative overflow-hidden rounded-2xl bg-[#F5F5F580] shadow-sm"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex h-[450px] w-full touch-pan-y"
            onMouseDown={onDragStart}
            onMouseUp={onDragEnd}
            onTouchStart={onDragStart}
            onTouchEnd={onDragEnd}
            style={{
              transform: `translateX(-${active * 100}%)`,
              transition: "transform 0.7s ease-out",
            }}
          >
            {slides.map(({ title, subtitle, button, image }, idx) => (
              <div
                key={idx}
                className="min-w-full flex flex-col gap-10 pl-[40px] justify-between md:flex-row md:items-center md:justify-between"
              >
                <div className="flex flex-1 flex-col items-start justify-center max-w-[560px]">
                  <p className="font-cera font-medium text-[14px] leading-[16px] tracking-[0.1em] uppercase text-[#3D3D3D] mb-[8px]">
                    Welcome to GreenShop
                  </p>
                  <h1 className="font-black text-[70px] leading-[70px] tracking-normal uppercase text-[#3D3D3D] mb-[10px]">
                    {title} <span className="text-[#46A358]">Planet</span>
                  </h1>
                  <p className="font-normal text-[14px] leading-[24px] tracking-normal text-[#727272] mb-[40px]">
                    {subtitle}
                  </p>
                  <button className="py-[10px] px-[26.47px] rounded-[6px] bg-[#46A358] hover:bg-[#3f8b4f] font-bold text-[16px] leading-[20px] tracking-normal uppercase text-white">
                    {button}
                  </button>
                </div>

                <div className="flex flex-1 items-center justify-end mt-[-25px]">
                  <img src={image} alt={`Slide ${idx + 1}`} className="" />
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                className={`h-3 w-3 rounded-full transition ${
                  idx === active
                    ? "bg-emerald-600"
                    : "bg-emerald-200 hover:bg-emerald-300"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
