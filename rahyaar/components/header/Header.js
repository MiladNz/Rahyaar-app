"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMenu, IoChevronDown, IoCallOutline, IoClose } from "react-icons/io5";
import { HiMiniUser, HiOutlineUser } from "react-icons/hi2";
import { RiHome5Line } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { useModalStore } from "@/store/useModalStore";
import signin from "@/assets/images/signin.svg";
import rahyaarLogo from "@/assets/images/rahyaar.png";
// import rahyaarLogoDark from "@/assets/images/rahyaardark.png";
import getFaDigits from "@/utils/getFaDigits";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useSyncAuth, useLogout } from "@/app/hooks/useAuth";
import ThemeToggle from "../ui/ThemeToggle";

function Header() {
  const { openLogin } = useModalStore();
  const { user } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const { user: syncUser, isLoading } = useSyncAuth();
  const logoutMutation = useLogout();

  const logoutHandler = async () => {
    try {
      await logoutMutation.mutateAsync();
      setIsMenuOpen(false);
      router.push("/");
    } catch (err) {
      console.error("خطا در خروج:", err);
    }
  };

  if (isLoading && !user) {
    return (
      <div className="w-full xl:max-w-screen-xl mx-auto flex justify-between items-center px-7 lg:px-10 xl:px-32 pt-4 relative z-[999]">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg w-32 h-10"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10"></div>
      </div>
    );
  }

  const displayUser = user || syncUser;

  return (
    <div className="w-full xl:max-w-screen-xl mx-auto flex justify-between items-center px-7 lg:px-10 xl:px-32 pt-4 relative z-[999]">
      {/* mobile sidebar */}
      <div className="cursor-pointer md:hidden">
        <IoMenu
          className="text-3xl text-gray-800 dark:text-white"
          onClick={() => setIsSidebarOpen(true)}
        />

        <div
          className={`
          fixed top-0 left-0 right-0 backdrop-blur-2xl backdrop-saturate-150 bg-background/70 dark:bg-gray-900/60 shadow-lg z-[30] transition-all duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 pointer-events-none"
          }
        `}>
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Image
                src={rahyaarLogo}
                alt="rahyaar logo"
                width={120}
                height={35}
              />
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <IoClose className="text-2xl text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <ul className="space-y-3">
              <li
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-r-4 hover:border-r-complementry transition-colors"
                onClick={() => setIsSidebarOpen(false)}>
                <RiHome5Line className="text-lg text-gray-600 dark:text-gray-300" />
                <Link
                  href="/"
                  className="text-base font-medium text-gray-800 dark:text-white">
                  صفحه اصلی
                </Link>
              </li>
              <li
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-r-4 hover:border-r-complementry transition-colors"
                onClick={() => setIsSidebarOpen(false)}>
                <GrMapLocation className="text-lg text-gray-600 dark:text-gray-300" />
                <Link
                  href="#"
                  className="text-base font-medium text-gray-800 dark:text-white">
                  خدمات گردشگری
                </Link>
              </li>
              <li
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-r-4 hover:border-r-complementry transition-colors"
                onClick={() => setIsSidebarOpen(false)}>
                <AiOutlineProduct className="text-lg text-gray-600 dark:text-gray-300" />
                <Link
                  href="#"
                  className="text-base font-medium text-gray-800 dark:text-white">
                  درباره ما
                </Link>
              </li>
              <li
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/30 hover:border-r-4 hover:border-r-complementry transition-colors"
                onClick={() => setIsSidebarOpen(false)}>
                <IoCallOutline className="text-lg text-gray-600 dark:text-gray-300" />
                <Link
                  href="#"
                  className="text-base font-medium text-gray-800 dark:text-white">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center md:gap-5 lg:gap-10 xl:gap-20">
        <div>
          <Image src={rahyaarLogo} alt="rahyaar logo" width={180} height={50} />
        </div>
        <ul className="text-base font-medium lg:text-lg lg:font-semibold text-[#282828] dark:text-white flex items-center flex-nowrap gap-x-4 lg:gap-x-10">
          <li className="hover:text-complementry cursor-pointer text-nowrap">
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li className="hover:text-complementry cursor-pointer text-nowrap">
            <Link href="#">خدمات گردشگری</Link>
          </li>
          <li className="hover:text-complementry cursor-pointer text-nowrap">
            <Link href="#">درباره ما</Link>
          </li>
          <li className="hover:text-complementry cursor-pointer text-nowrap">
            <Link href="#">تماس با ما</Link>
          </li>
          <li className="cursor-pointer">
            <ThemeToggle />
          </li>
        </ul>
      </div>

      <div className="cursor-pointer relative">
        {!displayUser ? (
          <div
            onClick={openLogin}
            className="scale-90 lg:scale-100 shadow-lg shadow-primary/40 dark:shadow-white/40 rounded-lg hover:scale-95">
            <div className="block md:hidden">
              <Image
                src={signin}
                alt="signin icon"
                width={40}
                height={40}
                className="dark:invert dark:brightness-0"
              />
            </div>
            <div className="hidden md:flex justify-center items-center gap-x-2 text-primary dark:text-white text-lg border-2 rounded-lg px-3 py-2 border-primary dark:border-white text-nowrap hover:text-complementry hover:border-complementry transition-colors hover:shadow-lg hover:shadow-complementry/40 ">
              <HiMiniUser />
              <span className="font-semibold">ورود | ثبت نام</span>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex justify-center items-center gap-x-2 text-primary dark:text-white font-medium md:text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <HiMiniUser />
              <p>{getFaDigits(displayUser.mobile)}</p>
              <IoChevronDown
                className={`transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* user menu */}
            <div
              className={`absolute left-0 top-[45px] bg-white dark:bg-gray-800 z-50 overflow-hidden rounded-lg w-[157px] md:w-[200px] transition-all duration-300 ease-in-out shadow-lg ${
                isMenuOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}>
              <div className="flex justify-start items-center bg-[#f4f4f4] dark:bg-gray-700 gap-x-4 p-2 w-full border-b-2 cursor-pointer">
                <div className="bg-[#D9D9D9] dark:bg-gray-600 p-[6px] rounded-full">
                  <HiMiniUser className="text-[#696969] dark:text-gray-300" />
                </div>
                <p className="text-[#282828] dark:text-white text-sm font-medium md:text-base">
                  {getFaDigits(displayUser.mobile)}
                </p>
              </div>
              <div
                className="flex justify-start items-center gap-x-2 text-[#282828] dark:text-white px-2 py-3 border-b-2 cursor-pointer w-full hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/user/profile");
                }}>
                <HiOutlineUser />
                <p className="text-xs font-medium md:text-sm">
                  اطلاعات حساب کاربری
                </p>
              </div>
              <div
                className="flex justify-start items-center gap-x-2 text-[#282828] dark:text-white px-2 py-3 cursor-pointer w-full hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={logoutHandler}>
                <LuLogOut className="text-[#D40000]" />
                <p className="text-[#D40000] text-xs font-medium md:text-sm">
                  {logoutMutation.isPending
                    ? "در حال خروج..."
                    : "خروج از حساب کاربری"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
