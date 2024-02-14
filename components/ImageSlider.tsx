"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";

  const inactiveStyles = "hidden text-gray-400";

  /* 
        keeping track of swiper slides and changing slideConfig accordingly
    */

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  });

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition">
        <button
          className={cn(activeStyles, "right-3 transition", {
            [inactiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isEnd,
          })}
          aria-label="next image"
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <button
          className={cn(activeStyles, "left-3 transition", {
            [inactiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isBeginning,
          })}
          aria-label="prev image"
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        className="h-full w-full"
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
      >
        {urls.map((url, i) => (
          <SwiperSlide
            key={i}
            className="-z-10 relative h-full w-full"
          >
            <Image
              fill
              loading="eager"
              src={url}
              alt="produts image"
              className="-z-10 h-full w-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
