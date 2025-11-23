"use client";

import { useQuery } from "@tanstack/react-query";
import ConvertTransacDate from "@/utils/ConvertTransacDate";
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

  if (isError) return toast.error("خطا در دریافت تراکنش ها");

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          تراکنشی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="overflow-x-auto rounded-lg shadow-md border dark:border-gray-700 dark:shadow-gray-900/50">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-center lg:text-right text-sm text-gray-700 dark:text-gray-300">
              <th className="px-1 lg:px-4 py-3 border-b dark:border-gray-600">
                تاریخ و ساعت
              </th>
              <th className="px-1 lg:px-4 py-3 border-b dark:border-gray-600">
                مبلغ (تومان)
              </th>
              <th className="hidden lg:block px-4 py-3 border-b dark:border-gray-600">
                نوع تراکنش
              </th>
              <th className="px-1 lg:px-4 py-3 border-b dark:border-gray-600">
                شماره سفارش
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <tr
                key={transaction.id}
                className="text-center lg:text-right text-sm text-gray-800 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 transition">
                <td className="px-1 lg:px-4 py-3 border-b dark:border-gray-600">
                  {ConvertTransacDate(transaction.createdAt)}
                </td>
                <td className="px-1 lg:px-4 py-3 border-b dark:border-gray-600">
                  {getFaDigits(String(transaction.amount.toLocaleString()))}
                </td>
                <td className="hidden lg:block px-4 py-3 border-b dark:border-gray-600">
                  {transaction.type === "Purchase"
                    ? "ثبت نام در تور گردشگری"
                    : ""}
                </td>
                <td className="px-1 lg:px-4 py-3 border-b dark:border-gray-600">
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
