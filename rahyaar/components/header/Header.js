"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMenu, IoChevronDown, IoCallOutline } from "react-icons/io5";
import { HiMiniUser, HiOutlineUser } from "react-icons/hi2";
import { RiHome5Line } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { useModalStore } from "@/store/useModalStore";
import signin from "@/assets/images/signin.svg";
import rahyaarLogo from "@/assets/images/rahyaar.png";
import getFaDigit from "@/utils/getFaDigits";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

function Header({ initialUser }) {
  const { openLogin } = useModalStore();
  const { user, setUser, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (initialUser) setUser(initialUser);
  }, [initialUser, setUser]);

  console.log(user);

  const logoutHandler = () => {
    logout();
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <div className="w-full flex justify-between items-center px-7 lg:px-10 xl:px-32 pt-4  relative z-[999] ">
      {/* mobile */}
      <div className="text-4xl cursor-pointer md:hidden">
        <IoMenu onClick={() => setIsSidebarOpen(true)} />
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[52]"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="fixed top-0 right-0 h-full w-[50%] bg-white shadow-lg z-[55] transition-transform duration-300 translate-x-0 rounded-l-xl py-5 px-2 space-y-4">
              <ul className="text-base text-textColor space-y-4">
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-semibold"
                  onClick={() => setIsSidebarOpen(false)}>
                  <RiHome5Line className="text-xl" />
                  <Link href="/">صفحه اصلی</Link>
                </li>
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-medium"
                  onClick={() => setIsSidebarOpen(false)}>
                  <GrMapLocation className="text-xl" />
                  <Link href="#">خدمات گردشگری</Link>
                </li>
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-medium"
                  onClick={() => setIsSidebarOpen(false)}>
                  <AiOutlineProduct className="text-xl" />
                  <Link href="#">درباره ما</Link>
                </li>
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-medium"
                  onClick={() => setIsSidebarOpen(false)}>
                  <IoCallOutline className="text-xl" />
                  <Link href="#">تماس با ما</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      {/* desktop */}
      <div className="hidden md:flex justify-between items-center md:gap-5 lg:gap-10 xl:gap-20">
        <div>
          <Image src={rahyaarLogo} alt="rahyaar logo" width={180} height={50} />
        </div>
        <ul className="text-base font-medium lg:text-lg lg:font-semibold text-[#282828] flex flex-nowrap gap-x-4 lg:gap-x-10">
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
        </ul>
      </div>
      <div className="cursor-pointer relative">
        {!user ? (
          <div onClick={openLogin} className="scale-90 lg:scale-100">
            <div className="block md:hidden">
              <Image src={signin} alt="signin icon" width={40} height={40} />
            </div>
            <div className="hidden md:flex justify-center items-center gap-x-2 text-primary text-lg border-2 rounded-lg px-3 py-2 border-primary text-nowrap hover:text-secondary hover:border-secondary">
              <HiMiniUser />
              <span className="font-semibold">ورود | ثبت نام</span>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex justify-center items-center gap-x-2 text-primary font-medium md:text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <HiMiniUser />
              <p>{getFaDigit(user.mobile)}</p>
              <IoChevronDown />
            </div>
            <div
              className={`absolute left-0 top-[30px] bg-white z-50 overflow-hidden rounded-lg w-[157px] md:w-[200px] transition-all duration-300 ease-in-out shadow ${
                isMenuOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}>
              <div className="flex justify-start items-center bg-[#f4f4f4] gap-x-4 p-2 w-full border-b-2 cursor-pointer">
                <div className="bg-[#D9D9D9] p-[6px] rounded-full">
                  <HiMiniUser className="text-[#696969]" />
                </div>
                <p className="text-[#282828] text-sm font-medium md:text-base">
                  {getFaDigit(user.mobile)}
                </p>
              </div>
              <div className="flex justify-start items-center gap-x-2 text-[#282828] px-2 py-3 border-b-2 cursor-pointer w-full">
                <HiOutlineUser />
                <p className="text-xs font-medium md:text-sm">
                  اطلاعات حساب کاربری
                </p>
              </div>
              <div
                className="flex justify-start items-center gap-x-2 text-[#282828] px-2 py-3 cursor-pointer w-full"
                onClick={logoutHandler}>
                {/* <Image src={""} alt="logout icon" width={18} height={18} /> */}
                <LuLogOut className="text-[#D40000]" />
                <p className="text-[#D40000] text-xs font-medium md:text-sm">
                  خروج از حساب کاربری
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
