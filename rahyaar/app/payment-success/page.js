"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import PaymentGuard from "@/components/auth/PaymentGuard";

export default function PaymentSuccess() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const tourId = sessionStorage.getItem("payment_tour_id");
    const tourTitle = sessionStorage.getItem("payment_tour_title");
    const amount = sessionStorage.getItem("payment_amount");

    if (tourId && tourTitle && amount) {
      setPaymentData({
        tourId,
        tourTitle,
        amount: parseInt(amount),
      });
    }
    const timer = setTimeout(() => {
      sessionStorage.removeItem("payment_success");
      sessionStorage.removeItem("payment_tour_id");
      sessionStorage.removeItem("payment_tour_title");
      sessionStorage.removeItem("payment_amount");
      router.push("/");
    }, 10000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <PaymentGuard>
      <div className="flex items-center justify-center bg-slate-50 p-4 ">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <FaCheckCircle className="w-20 h-20 text-secondary" />

            <h1 className="text-xl text-nowrap md:text-2xl lg:text-3xl font-bold text-textColor">
              پرداخت با موفقیت انجام شد!
            </h1>
            {paymentData && (
              <>
                <p className="text-gray-600 text-lg">
                  تور <strong>{paymentData.tourTitle}</strong> با موفقیت رزرو
                  شد.
                </p>

                <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-primary font-medium">
                    مبلغ پرداختی: {paymentData.amount.toLocaleString()} تومان
                  </p>
                  <p className="text-secondary text-sm mt-2">
                    کد رهگیری:{" "}
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>
              </>
            )}

            <p className="text-gray-500 text-sm">
              شما بعد از 10 ثانیه به صفحه اصلی هدایت خواهید شد...
            </p>
            {/* <div className="text-textColor font-medium text-sm md:textbase lg:text-lg">
              <p className="pb-2">تور شما با موفقیت رزرو شد. </p>
              <p>اطلاعات کامل رزرو در پروفایل شما قابل مشاهده است.</p>
            </div> */}

            {/* <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-textColor font-medium">
                کد رهگیری:{" "}
                {Math.random().toString(10).substr(2, 9).toUpperCase()}
              </p>
            </div> */}

            <button
              onClick={() => {
                sessionStorage.removeItem("payment_success");
                sessionStorage.removeItem("payment_tour_id");
                sessionStorage.removeItem("payment_tour_title");
                sessionStorage.removeItem("payment_amount");

                router.push("/");
              }}
              className="bg-primary text-white font-medium py-3 px-8 rounded-lg hover:bg-secondary transition duration-200">
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    </PaymentGuard>
  );
}
