"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "@/schema/searchSchema";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import getCityName from "@/utils/getCityName";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

export default function SearchForm({
  origins,
  destinations,
  searchHandler,
  isLoading,
  filters = {},
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      originId: "",
      destinationId: "",
      startDate: "",
      endDate: "",
      dateRange: [],
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reset({
      originId: filters.originId || "",
      destinationId: filters.destinationId || "",
      startDate: filters.startDate || "",
      endDate: filters.endDate || "",
      dateRange: filters.dateRange || [],
    });
  }, [filters, reset]);

  const submitHandler = async (data) => {
    setLoading(true);
    await searchHandler(data);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between w-5/6 md:w-full max-w-7xl mx-auto mt-10">
      <div className="flex flex-col w-full md:w-1/5 relative">
        <div className="relative">
          <select
            {...register("originId")}
            defaultValue=""
            className="appearance-none border border-gray-300 dark:border-gray-600 rounded-xl p-3 w-full text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-secondary focus:border-blue-400 dark:focus:border-secondary bg-white dark:bg-gray-700 shadow-sm">
            <option
              value=""
              disabled
              className="text-gray-300 dark:text-gray-500">
              مبدا
            </option>
            {origins.map((o) => (
              <option key={o.id} value={o.id}>
                {getCityName(o.id)}
              </option>
            ))}
          </select>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none">
            <HiOutlineLocationMarker className="w-6 h-6" />
          </span>
        </div>

        <div className="h-5 mt-2">
          {errors.originId && (
            <p className="text-red-500 dark:text-red-400 text-sm leading-none">
              {errors.originId.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full md:w-1/5 relative">
        <div className="relative">
          <select
            {...register("destinationId")}
            defaultValue=""
            className="appearance-none border border-gray-300 dark:border-gray-600 rounded-xl p-3 w-full text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-secondary focus:border-blue-400 dark:focus:border-secondary bg-white dark:bg-gray-700 shadow-sm">
            <option
              value=""
              disabled
              className="text-gray-300 dark:text-gray-500">
              مقصد
            </option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {getCityName(d.id)}
              </option>
            ))}
          </select>

          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none">
            <HiOutlineLocationMarker className="w-6 h-6" />
          </span>
        </div>

        <div className="h-5 mt-2">
          {errors.destinationId && (
            <p className="text-red-500 dark:text-red-400 text-sm leading-none">
              {errors.destinationId.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-full md:w-2/5 mb-4 md:mb-[1.7rem] relative border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-secondary text-gray-700 dark:text-white shadow-sm bg-white dark:bg-gray-700">
        <DatePicker
          range
          rangeHover
          value={watch("dateRange")}
          onChange={(dates) => {
            const [start, end] = dates || [];
            const gStartDate = start ? start.toDate() : null;
            const gEndDate = end ? end.toDate() : null;

            const formatDate = (date) =>
              date?.toISOString()?.split("T")[0] || "";

            setValue("startDate", formatDate(gStartDate));
            setValue("endDate", formatDate(gEndDate));
            setValue("dateRange", dates);
          }}
          calendar={persian}
          locale={persian_fa}
          inputClass="no-border w-full text-right focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-secondary placeholder:text-gray-700 dark:placeholder:text-gray-300 text-gray-700 dark:text-white bg-transparent"
          calendarPosition="bottom-right"
          placeholder="تاریخ رفت و برگشت"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none">
          <HiOutlineCalendarDateRange className="w-6 h-6" />
        </span>
      </div>

      <div className="w-full md:w-1/5 md:mb-[1.7rem]">
        <button
          type="submit"
          disabled={loading || isLoading}
          className={`w-full px-6 py-2 shadow-lg shadow-primary/40 dark:shadow-secondary/40 lg:px-8 lg:py-3 rounded-lg text-white font-semibold text-base lg:text-lg hover:scale-105 ${
            loading || isLoading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-primary dark:bg-secondary hover:bg-secondary dark:hover:bg-primary"
          } transition`}>
          {loading || isLoading ? "در حال جستجو..." : "جستجو"}
        </button>
      </div>
    </form>
  );
}
