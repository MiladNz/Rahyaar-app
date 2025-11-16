"use client";

import { useQuery } from "@tanstack/react-query";
import getFaDigit from "../utils/getFaDigit";
import getFaCityName from "../utils/getFaCityName";
import ConvertDate from "../utils/ConvertDate";
import { TbPlane, TbBus, TbCar, TbSunset2 } from "react-icons/tb";
import { PiVanFill } from "react-icons/pi";
import Loader from "./Loader";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { toast } from "react-toastify";

function Icon({ type }) {
  if (type === "Bus") return <TbBus />;
  if (type === "SUV") return <TbCar />;
  if (type === "Van") return <PiVanFill />;
  if (type === "Airplane") return <TbPlane />;
  return <TbBus />;
}
function Vehicle({ type }) {
  if (type === "Bus") return "سفر با اتوبوس";
  if (type === "SUV") return "سفر با SUV";
  if (type === "Van") return "سفر با ون";
  if (type === "Airplane") return "سفر با هواپیما";
  return "";
}

function UserTours() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTours"],
    queryFn: async () => {
      const res = await fetchWithAuth("/api/user/tours");
      if (!res.ok) throw new Error("خطا در دریافت تورهای شما");
      return res.json();
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error("خطا در دریافت اطلاعات تورها");
  // if (!data || data.length === 0) return toast.error("هیچ توری یافت نشد");
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl text-gray-500">توری برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((tour) => (
        <div
          key={tour.id}
          className="lg:max-w-screen-md border rounded-lg p-4 flex flex-col lg:justify-center lg:items-center gap-3 lg:gap-6">
          <div className="w-full flex flex-col lg:gap-x-10 lg:flex-row lg:justify-between">
            <div className="flex self-end lg:hidden">
              {new Date().setHours(0, 0, 0, 0) >
              new Date(tour.startDate).setHours(0, 0, 0, 0) ? (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs lg:text-sm">
                  به اتمام رسیده
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-lg text-xs lg:text-sm">
                  در حال برگزاری
                </span>
              )}
            </div>
            <div className="flex items-center gap-x-7 pb-4">
              <div className="flex items-center gap-x-2">
                <TbSunset2 />
                <span className="font-medium">{tour.title}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Icon type={tour.fleetVehicle} />
                <span>
                  <Vehicle type={tour.fleetVehicle} />
                </span>
              </div>
            </div>
            <div className="hidden  self-start lg:flex">
              {new Date().setHours(0, 0, 0, 0) >
              new Date(tour.startDate).setHours(0, 0, 0, 0) ? (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs lg:text-sm">
                  به اتمام رسیده
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-lg text-xs lg:text-sm">
                  در حال برگزاری
                </span>
              )}
            </div>
          </div>
          {/*  */}
          <div className="w-full flex flex-col gap-4 ">
            <div className="flex flex-col gap-y-4 lg:flex-row lg:gap-x-10">
              <div className="flex items-center justify-between gap-x-4">
                <p className="font-semibold">
                  <span>{getFaCityName(tour.origin.name)}</span> <span>به</span>{" "}
                  <span>{getFaCityName(tour.destination.name)}</span>
                </p>
                <p>{ConvertDate(tour.startDate)}</p>
              </div>
              <div className="flex items-center justify-between gap-x-4">
                <p className="font-semibold">تاریخ برگشت</p>
                <p>{ConvertDate(tour.endDate)}</p>
              </div>
            </div>
            {/*  */}
            <div className="w-full flex items-center justify-between gap-x-2 border-t-2 py-3 ">
              <div className="gap-x-2">
                <span className="text-sm text-gray-500">شماره تور</span>{" "}
                <span className="text-base lg:text-xl font-bold text-slate-700">
                  {tour.id.split("-")[1]}
                </span>
              </div>
              <div className="flex items-center gap-x-4 border-r-2 ">
                <p className="text-sm pr-2">مبلغ پرداخت شده</p>
                <p>
                  <span className="text-base lg:text-xl font-bold">
                    {getFaDigit(tour.price.toLocaleString())}
                  </span>
                  <span className="text-sm text-gray-500">تومان</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTours;
