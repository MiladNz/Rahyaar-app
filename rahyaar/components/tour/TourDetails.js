"use client";

import React from "react";
import Image from "next/image";
import getFaDigits from "@/utils/getFaDigits";
import {
  FaBusAlt,
  FaMap,
  FaMedal,
  FaShieldAlt,
  FaUserCheck,
  FaUserFriends,
} from "react-icons/fa";
import { LuRoute } from "react-icons/lu";
import { IoCalendar } from "react-icons/io5";
import getNumberOfDays from "@/utils/getNumberOfDays";
import Link from "next/link";
import ConvertDate from "@/utils/ConvertDate";
import { useRouter } from "next/navigation";
import { useAddToBasket } from "@/app/hooks/useAuth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";

export default function TourDetails({ tour }) {
  const router = useRouter();
  const addToBasketMutation = useAddToBasket();
  const { user } = useAuthStore();
  const { openLogin } = useModalStore();

  if (!tour) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-secondary"></div>
      </div>
    );
  }

  const days = getNumberOfDays({
    start: tour.startDate,
    end: tour.endDate,
  });
  const nights = days - 1;

  const handleReserveClick = async () => {
    if (!user) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      openLogin();
      return;
    }
    try {
      await addToBasketMutation.mutateAsync({ tourId: tour.id });
      toast.success("تور با موفقیت به سبد خرید افزوده شد");
      router.push(`/tours/${tour.id}/reserve`); //!!!!!!!!!!!!!!!!!!!!!
    } catch (error) {
      toast.error(error.message || "خطا در افزودن به سبد خرید");
    }
  };

  return (
    <section className="min-h-[calc(100vh-360px)] py-4 md:p-4 md:flex md:items-center md:justify-center bg-white dark:bg-gray-900 md:bg-slate-100 dark:md:bg-gray-900">
      <div className="lg:max-w-screen-lg mx-auto rounded bg-white dark:bg-gray-800 mt-6 mb-10">
        {/* mobile */}
        <div className="md:hidden w-max mx-auto mt-8 flex flex-col gap-4 justify-center items-start pb-6 bg-slate-50 dark:bg-gray-700 border border-slate-50 dark:border-gray-600 rounded-md shadow dark:shadow-gray-900/50">
          <div className="relative w-[320px] h-[159px] rounded-lg ">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="rounded-lg object-fill "
              priority={false}
              loading="lazy"
            />
          </div>
          {/* description */}
          <div className="w-full flex flex-col gap-8 p-2">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-black dark:text-white">
                {tour.title}
              </p>
              <p className="text-base font-medium text-[#282828] dark:text-gray-300">
                <span>{getFaDigits(String(days))} روز </span>و{" "}
                <span>{getFaDigits(String(nights))} شب </span>
              </p>
            </div>
            {/*  */}
            <div className="flex items-center justify-between text-slate-500 dark:text-gray-400 p-2">
              <div className="flex items-center gap-x-2">
                <FaUserCheck className="w-[14px] h-[14px]" />
                <p className="text-[13px]">تورلیدر از مبدا</p>
              </div>
              <div className="flex items-center gap-x-2">
                <FaMap className="w-[14px] h-[14px]" />
                <p className="text-[13px]">برنامه سفر</p>
              </div>
              <div className="flex items-center gap-x-2">
                <FaMedal className="w-[14px] h-[14px]" />
                <p className="text-[13px]">تضمین کیفیت</p>
              </div>
            </div>
            {/*  */}
            <div className="flex items-center justify-between gap-4 p-2">
              <div className="flex flex-col justify-between gap-y-3">
                <div className="flex items-center justify-start gap-x-2 text-[#444444] dark:text-gray-400">
                  <FaBusAlt className="w-[16px] h-[16px]" />
                  <p>حمل و نقل</p>
                </div>
                <p className="text-[#282828] dark:text-gray-300 text-sm font-medium">
                  {tour.fleetVehicle === "Bus"
                    ? "اتوبوس"
                    : tour.fleetVehicle === "SUV"
                    ? "خودرو SUV"
                    : tour.fleetVehicle === "Van"
                    ? "خودروی ون"
                    : "هواپیما"}
                </p>
              </div>
              <div className="flex flex-col justify-between gap-y-3">
                <div className="flex items-center justify-start gap-x-2 text-[#444444] dark:text-gray-400">
                  <FaUserFriends className="w-[16px] h-[16px]" />
                  <p>ظرفیت</p>
                </div>
                <p className="text-[#282828] dark:text-gray-300 text-sm font-medium">
                  حداکثر {getFaDigits(String(tour.availableSeats))} نفر
                </p>
              </div>
              <div className="flex flex-col justify-between gap-y-3">
                <div className="flex items-center justify-start gap-x-2 text-[#444444] dark:text-gray-400">
                  <FaShieldAlt className="w-[16px] h-[16px]" />
                  <p>بیمه</p>
                </div>
                <p className="text-[#282828] dark:text-gray-300 text-sm font-medium">
                  {tour.insurance ? "دارد" : "ندارد"}
                </p>
              </div>
            </div>
            {/*  */}
          </div>
          {/* button , price */}
          <div className="w-full flex items-center justify-between mt-6 p-2">
            <button
              onClick={handleReserveClick}
              disabled={addToBasketMutation.isPending}
              className="bg-primary dark:bg-secondary text-white px-8 py-2 rounded-[10px] hover:bg-secondary dark:hover:bg-primary transition disabled:opacity-50">
              {addToBasketMutation.isPending
                ? "در حال افزودن..."
                : "رزرو و خرید"}
            </button>
            <p>
              <span className="text-complementry text-2xl">
                {getFaDigits(tour.price.toLocaleString())}
              </span>{" "}
              <span className="text-slate-400 dark:text-gray-500 text-sm">
                تومان
              </span>
            </p>
          </div>
        </div>
        {/* Desktop */}
        <div className="hidden w-full mx-auto mt-8 px-6 md:flex flex-col gap-8 justify-center items-center pb-6">
          {/*  */}
          <div className="w-full flex items-start gap-7">
            <div className="relative w-80 h-52">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="rounded-lg object-fill"
                priority={false}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-start justify-between gap-6">
              <div className="flex flex-col items-start justify-between gap-4">
                <p className="text-2xl lg:text-3xl font-bold text-black dark:text-white">
                  {tour.title}
                </p>
                <p className="text-base lg:text-lg font-medium text-[#282828] dark:text-gray-300">
                  <span>{getFaDigits(String(days))} روز </span>و{" "}
                  <span>{getFaDigits(String(nights))} شب </span>
                </p>
              </div>
              {/* tourleader */}
              <div className="flex items-center justify-between gap-10 text-slate-500 dark:text-gray-400">
                <div className="flex items-center gap-x-2">
                  <FaUserCheck className="w-[14px] h-[14px]" />
                  <p className="text-[13px] lg:text-[15px]">تورلیدر از مبدا</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaMap className="w-[14px] h-[14px]" />
                  <p className="text-[13px] lg:text-[15px]">برنامه سفر</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaMedal className="w-[14px] h-[14px]" />
                  <p className="text-[13px] lg:text-[15px]">تضمین کیفیت</p>
                </div>
              </div>
              {/* button , price */}
              <div className="w-full flex items-center justify-between mt-6 gap-10">
                <p>
                  <span className="text-complementry text-2xl lg:font-semibold">
                    {getFaDigits(tour.price.toLocaleString())}
                  </span>{" "}
                  <span className="text-slate-400 dark:text-gray-500 text-sm lg:text-base">
                    تومان
                  </span>
                </p>
                <button
                  onClick={handleReserveClick}
                  disabled={addToBasketMutation.isPending}
                  className="bg-primary dark:bg-secondary text-white px-8 py-2 lg:px-10 lg:py-4 text-lg lg:text-xl rounded-[10px] hover:bg-secondary dark:hover:bg-primary transition disabled:opacity-50">
                  {addToBasketMutation.isPending
                    ? "در حال افزودن..."
                    : "رزرو و خرید"}
                </button>
              </div>
            </div>
          </div>
          {/* info */}
          <div className="w-full flex items-center justify-evenly gap-4 lg:gap-6 xl:gap-10">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <LuRoute className="w-5 h-5 dark:text-white" />
                <p className="text-base lg:text-lg dark:text-white">مبدا</p>
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium dark:text-gray-300">
                {tour.origin.name === "Tehran"
                  ? "تهران"
                  : tour.origin.name === "Sanandaj"
                  ? "سنندج"
                  : tour.origin.name === "Isfahan"
                  ? "اصفهان"
                  : ""}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 border-r-2 pr-2 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <IoCalendar className="w-5 h-5 dark:text-white" />
                <p className="text-base lg:text-lg dark:text-white">
                  تاریخ رفت
                </p>
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium dark:text-gray-300">
                {ConvertDate(tour.startDate)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 border-r-2 pr-2 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <IoCalendar className="w-5 h-5 dark:text-white" />
                <p className="text-base lg:text-lg dark:text-white">
                  تاریخ برگشت
                </p>
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium dark:text-gray-300">
                {ConvertDate(tour.endDate)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 border-r-2 pr-2 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <FaBusAlt className="w-5 h-5 dark:text-white" />
                <p className="text-base lg:text-lg dark:text-white">
                  حمل و نقل
                </p>
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium dark:text-gray-300">
                {tour.fleetVehicle === "Bus"
                  ? "اتوبوس"
                  : tour.fleetVehicle === "SUV"
                  ? "خودرو SUV"
                  : tour.fleetVehicle === "Van"
                  ? "خودروی ون"
                  : "هواپیما"}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 border-r-2 pr-2 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <FaUserFriends className="w-5 h-5 dark:text-white" />
                <p className="text-base lg:text-lg dark:text-white">ظرفیت</p>
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium dark:text-gray-300">
                حداکثر {getFaDigits(String(tour.availableSeats))} نفر
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 border-r-2 pr-2 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="w-5 h-5 dark:text-white" />
                <p className="text-base lg:text-lg dark:text-white">بیمه</p>
              </div>
              <p className="text-[14px] lg:text-[16px] font-medium dark:text-gray-300">
                {tour.insurance ? "دارد" : "ندارد"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
