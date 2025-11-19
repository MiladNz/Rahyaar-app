"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import slider1 from "@/assets/images/slider1.svg";
import slider2 from "@/assets/images/slider2.svg";
import slider3 from "@/assets/images/slider3.svg";
import slider4 from "@/assets/images/slider4.svg";

const images = [slider1, slider2, slider3, slider4];

function Slider() {
  return (
    <div className="w-full max-w-48 sm:max-w-52 md:max-w-64 mx-auto mb-8">
      <Swiper
        effect="cards"
        grabCursor={true}
        cardsEffect={{ slideShadows: true }}
        pagination={{ clickable: true }}
        modules={[EffectCards]}
        className="swiper-container">
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="bg-transparent">
            <div className="relative w-full h-64 lg:h-80 rounded-2xl overflow-hidden">
              <Image
                src={img}
                alt={`tour-${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
