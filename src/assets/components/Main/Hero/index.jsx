import bannerpicture from "../../../images/bannerpicture.png";

import { useCallback, useEffect, useRef, useState } from "react";
import { Carousel } from "flowbite-react";

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

// Flowbite Loading uchun
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
  const carouselRef = useRef(null);

  const snapToNearestSlide = useCallback(() => {
    const root = carouselRef.current;
    if (!root) return;
    const scrollContainer = root.querySelector("[class*='overflow-x-scroll']");
    if (!scrollContainer) return;

    const { scrollLeft, clientWidth } = scrollContainer;
    const target = Math.round(scrollLeft / clientWidth) * clientWidth;
    scrollContainer.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", snapToNearestSlide);
    window.addEventListener("touchend", snapToNearestSlide);
    return () => {
      window.removeEventListener("mouseup", snapToNearestSlide);
      window.removeEventListener("touchend", snapToNearestSlide);
    };
  }, [snapToNearestSlide]);

  return (
    <div className="container pt-[15px] pb-[45px]">
      {loading ? (
        <LoadingOverlay />
      ) : (
        <Carousel
          slideInterval={3000}
          className=""
          draggable
          slide
          pauseOnHover={false}
          indicators
          leftControl={<span className="hidden" />}
          rightControl={<span className="hidden" />}
        >
          {slides.map(({ title, subtitle, button, image }) => (
            <div
              key={title}
              className="pl-[40px] relative flex flex-col justify-between items-center bg-[#F5F5F580] md:flex-row"
            >
              <div className="max-w-[580px] w-fullflex flex-col items-start">
                <p className="font-cera font-medium text-[14px] leading-[16px] tracking-[0.1em] uppercase text-[#3D3D3D] mb-[8px]">
                  Welcome to GreenShop
                </p>
                <h1 className="font-black text-[70px] leading-[70px] tracking-normal uppercase text-[#3D3D3D] mb-[10px]">
                  {title} <span className="text-[#46A358]">Planet</span>
                </h1>
                <p className="font-normal text-[14px] leading-[24px] tracking-normal text-[#727272] mb-[40px]">
                  {subtitle}
                </p>
                <button className="py-[10px] px-[26.47px] rounded-[6px] hover:opacity-80 font-bold text-[16px] leading-[20px] tracking-normal uppercase text-[#fff] bg-[#46A358]">
                  {button}
                </button>
              </div>

              <div className="relative">
                <div className="absolute" />
                <div className="relative top-[-50px] h-[450px] w-full">
                  <img src={image} className="" />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Hero;
