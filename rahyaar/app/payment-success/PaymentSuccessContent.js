"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccessContent({ paymentData }) {
  const router = useRouter();

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       document.cookie =
  //         "payment_success=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  //       router.push("/");
  //     }, 10000);

  //     return () => clearTimeout(timer);
  //   }, [router]);

  const returnHandler = () => {
    document.cookie =
      "payment_success=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    router.push("/");
  };

  return (
    <div className="min-h-[calc(100vh-360px)] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <FaCheckCircle className="w-20 h-20 text-primary" />

          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            پرداخت با موفقیت انجام شد!
          </h1>

          <p className="text-gray-600 text-lg">
            تور <strong>{paymentData.tourTitle}</strong> با موفقیت رزرو شد.
          </p>

          <div className="bg-white border-2 border-complementry rounded-lg p-4 mt-4">
            <p className="text-textColor font-medium">
              مبلغ پرداختی: {paymentData.price?.toLocaleString()} تومان
            </p>
            <p className="text-textColor text-base font-semibold mt-2">
              کد رهگیری:{" "}
              <span className="text-orange-700">
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </p>
          </div>

          <button
            onClick={returnHandler}
            className="bg-primary text-white font-medium py-3 px-8 rounded-lg hover:bg-secondary transition duration-200">
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    </div>
  );
}
