"use client";

import { useCurrentUser, useUserProfile } from "@/app/hooks/useAuth";
import { reserveSchema } from "@/schema/reserveSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import getFaDigits from "@/utils/getFaDigits";
import numberOfDays from "@/utils/numberOfDays";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function ReserveClientPage({ tour }) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { openLogin } = useModalStore();
  const { data: currentUser, isLoading: authLoading } = useCurrentUser();
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(reserveSchema),
  });

  const isAuthenticated = user || currentUser;

  // useEffect(() => {
  //   if (!authLoading && !currentUser) {
  //     openLogin();
  //   }
  // }, [currentUser, authLoading, openLogin]);
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      openLogin();
    }
  }, [isAuthenticated, authLoading, openLogin]);

  useEffect(() => {
    if (userProfile) {
      const formData = {
        fullName:
          userProfile.fullName ||
          `${userProfile.firstName || ""} ${userProfile.lastName || ""}`.trim(),
        nationalCode: userProfile.nationalCode || "",
        birthDate: userProfile.birthDate || "",
        gender: userProfile.gender || "",
      };

      reset(formData);
    }
  }, [userProfile, reset]);

  const days = numberOfDays({ start: tour.startDate, end: tour.endDate });
  const nights = days - 1;

  if (!isAuthenticated) {
    return (
      <div className="h-[calc(100vh-340px)] flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4 bg-orange-50 shadow-lg rounded-xl py-8 px-6 text-center border border-orange-200">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center">
              <IoWarningOutline className="w-8 h-8 text-complementry ml-2" />
              <p className="text-lg md:text-xl font-semibold text-textColor">
                لطفاً برای رزرو وارد شوید
              </p>
            </div>
            <p className="text-textColor text-sm md:text-base">
              برای رزرو این تور باید وارد حساب کاربری خود شوید
            </p>
            <button
              onClick={openLogin}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
              ورود به حساب کاربری
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-360px)] flex items-center justify-center p-4 bg-slate-100">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-6 text-right font-sans flex flex-col lg:flex-row lg:gap-8 lg:justify-between lg:items-stretch">
        <div className="lg:w-3/5 lg:flex lg:flex-col">
          <div className="flex items-baseline gap-x-2 mb-6">
            <FaUser className="text-primary text-xl" />
            <h2 className="text-xl font-bold text-gray-800">مشخصات مسافر</h2>
          </div>

          <form
            // onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:content-start">
            <div className="w-full lg:flex-1 lg:min-w-[200px]">
              <input
                type="text"
                {...register("fullName")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="نام و نام خانوادگی"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1 pr-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="w-full lg:flex-1 lg:min-w-[150px]">
              <select
                {...register("gender")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="" disabled hidden>
                  جنسیت
                </option>
                <option value="female">زن</option>
                <option value="male">مرد</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 pr-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div className="w-full lg:flex-1 lg:min-w-[150px]">
              <input
                type="text"
                {...register("nationalCode")}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="کد ملی"
                maxLength={10}
              />
              {errors.nationalCode && (
                <p className="text-red-500 text-sm mt-1 pr-1">
                  {errors.nationalCode.message}
                </p>
              )}
            </div>

            <div className="w-full lg:flex-1 lg:min-w-[200px]">
              <DatePicker
                {...register("birthDate")}
                placeholder="تاریخ تولد"
                calendar={persian}
                locale={persian_fa}
                value={watch("birthDate")}
                onChange={(date) => {
                  if (date) {
                    const gregorianDate = date.toDate();
                    const formattedDate = gregorianDate
                      .toISOString()
                      .split("T")[0];
                    setValue("birthDate", formattedDate);
                  } else {
                    setValue("birthDate", "");
                  }
                }}
                inputClass="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                containerClassName="w-full"
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1 pr-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg lg:hidden disabled:opacity-50 hover:bg-secondary transition text-lg">
              {isSubmitted ? "در حال ثبت..." : "ثبت و خرید نهایی"}
            </button>
          </form>
        </div>

        <div className="border-2 border-gray-200 rounded-xl p-6 mt-6 lg:w-2/5 lg:mt-0 lg:flex lg:flex-col">
          <div className="flex justify-between items-center mb-6 border-b-2 border-dashed pb-4">
            <h3 className="text-xl font-bold text-gray-800">{tour.title}</h3>
            <p className="text-base text-gray-700">
              <span>{getFaDigits(String(days))} روز </span>و{" "}
              <span>{getFaDigits(String(nights))} شب </span>
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <p className="text-lg text-gray-700 font-medium">قیمت نهایی</p>
            <p className="text-left">
              <span className="text-complementry text-3xl lg:text-4xl font-bold">
                {getFaDigits(tour.price.toLocaleString())}
              </span>{" "}
              <span className="text-slate-500 text-base">تومان</span>
            </p>
          </div>

          <div className="mt-auto">
            <button
              type="submit"
              // onClick={handleSubmit(onSubmit)}
              disabled={isSubmitted}
              className="w-full bg-primary text-white font-bold py-4 rounded-lg hidden lg:block disabled:opacity-50 hover:bg-secondary transition text-lg shadow-lg">
              {isSubmitted ? "در حال ثبت..." : "ثبت و خرید نهایی"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveClientPage;
