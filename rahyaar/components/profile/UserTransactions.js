"use client";

import { useQuery } from "@tanstack/react-query";
import ConvertTransacDate from "../utils/ConvertTransacDate";
import getFaDigits from "@/utils/getFaDigits";
// import Loader from "./Loader";
import { toast } from "sonner";

export default function UserTransactions() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTransactions"],
    queryFn: async () => {
      const res = await fetch("/api/user/transactions");
      if (!res.ok) throw new Error("خطا در دریافت تراکنش‌ها");
      return res.json();
    },
  });

  //   if (isLoading) return <Loader />;
  if (isError) return toast.error("خطا در دریافت تراکنش ها");
  // if (!data || data.length === 0) return toast.error("تراکنشی یافت نشد");
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl text-gray-500">تراکنشی برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="overflow-x-auto rounded-lg shadow-md border">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-100">
            <tr className="text-center lg:text-right text-sm text-gray-700">
              <th className="px-1 lg:px-4 py-3 border-b">تاریخ و ساعت</th>
              <th className="px-1 lg:px-4 py-3 border-b">مبلغ (تومان)</th>
              <th className="hidden lg:block px-4 py-3 border-b">نوع تراکنش</th>
              <th className="px-1 lg:px-4 py-3 border-b">شماره سفارش</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <tr
                key={transaction.id}
                className="text-center lg:text-right text-sm text-gray-800 hover:bg-green-50 transition">
                <td className="px-1 lg:px-4 py-3 border-b">
                  {ConvertTransacDate(transaction.createdAt)}
                </td>
                <td className="px-1 lg:px-4 py-3 border-b">
                  {getFaDigits(String(transaction.amount.toLocaleString()))}
                </td>
                <td className="hidden lg:block px-4 py-3 border-b">
                  {transaction.type === "Purchase"
                    ? "ثبت نام در تور گردشگری"
                    : ""}
                </td>
                <td className="px-1 lg:px-4 py-3 border-b">
                  <span className="hidden lg:inline">سفارش</span>{" "}
                  {transaction.id.split("-")[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
