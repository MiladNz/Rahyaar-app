"use client";

import ProfileContent from "@/components/profile/ProfileContent";
import { useQuery } from "@tanstack/react-query";
// import ProfileContent from "../../../components/ProfileContent";
import { useState } from "react";
import { FaRegCreditCard, FaUser } from "react-icons/fa6";
import { TbSunset2 } from "react-icons/tb";
// import Loader from "../../../components/Loader";
import { toast } from "sonner";

const tabs = [
  { key: "profile", label: "پروفایل", icon: <FaUser /> },
  { key: "mytours", label: "تورهای من", icon: <TbSunset2 /> },
  { key: "transactions", label: "تراکنش ها", icon: <FaRegCreditCard /> },
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await fetch("/api/user/profile");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "خطا در دریافت اطلاعات");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-360px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    toast.error(error.message || "خطا در دریافت اطلاعات پروفایل");
    return (
      <div className="min-h-[calc(100vh-360px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">خطا در دریافت اطلاعات پروفایل</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-primary text-white px-4 py-2 rounded">
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[calc(100vh-360px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">اطلاعاتی یافت نشد</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-screen-lg min-h-[calc(100vh-360px)] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      {/* mobile - tab */}
      <aside className="lg:hidden flex justify-between mb-4 border-b overflow-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <p
            key={tab.key}
            className={`px-4 py-2 text-sm flex items-center justify-start gap-x-2  ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-b-complementry"
                : "text-[#282828]"
            }`}
            onClick={() => setActiveTab(tab.key)}>
            <span className="text-sm md:text-base">{tab.icon}</span>
            <span className="text-sm font-medium md:text-base">
              {tab.label}
            </span>
          </p>
        ))}
      </aside>
      {/* desktop tab */}
      <aside className="hidden lg:block w-full lg:w-1/4">
        <div className="border rounded-lg overflow-hidden">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`cursor-pointer px-4 py-3 flex items-center gap-2 border-b last:border-b-0 ${
                activeTab === tab.key
                  ? "bg-blue-100 text-secondary"
                  : "bg-white"
              }`}
              onClick={() => setActiveTab(tab.key)}>
              <span className="text-xl">{tab.icon}</span>
              <span className="text-base font-medium">{tab.label}</span>
            </div>
          ))}
        </div>
      </aside>

      <section className="w-full lg:w-3/4">
        <ProfileContent activeTab={activeTab} data={data} />
      </section>
    </main>
  );
}
