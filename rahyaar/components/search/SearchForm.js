"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "@/schema/searchSchema";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import getFaCityName from "@/utils/getFaCityName";

export default function SearchForm({ origins, destinations, searchHandler }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

  const submitHandler = async (data) => {
    setLoading(true);
    await searchHandler(data);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white shadow-lg rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between w-full max-w-4xl mx-auto mt-10">
      <div className="flex flex-col w-full md:w-1/4">
        <label className="text-sm text-gray-700 mb-1">مبدا</label>
        <select
          {...register("originId")}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">انتخاب مبدا</option>
          {origins.map((o) => (
            <option key={o.id} value={o.id}>
              {getFaCityName(o.id)}
            </option>
          ))}
        </select>
        {errors.originId && (
          <p className="text-red-500 text-sm mt-1">{errors.originId.message}</p>
        )}
      </div>

      <div className="flex flex-col w-full md:w-1/4">
        <label className="text-sm text-gray-700 mb-1">مقصد</label>
        <select
          {...register("destinationId")}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">انتخاب مقصد</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>
              {getFaCityName(d.id)}
            </option>
          ))}
        </select>
        {errors.destinationId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.destinationId.message}
          </p>
        )}
      </div>

      <div className="flex flex-col w-full md:w-1/3">
        <label className="text-sm text-gray-700 mb-1">تاریخ سفر</label>
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
          inputClass="border border-gray-300 rounded-lg p-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          calendarPosition="bottom-right"
          placeholder="انتخاب بازه تاریخ"
        />
      </div>

      <div className="w-full md:w-1/4 flex justify-center mt-4 md:mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-2 rounded-lg text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } transition`}>
          {loading ? "در حال جستجو..." : "جستجو"}
        </button>
      </div>
    </form>
  );
}
