"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMenu, IoChevronDown, IoCallOutline } from "react-icons/io5";
import { HiMiniUser, HiOutlineUser } from "react-icons/hi2";
import { RiHome5Line } from "react-icons/ri";
import { PiAirplaneLight } from "react-icons/pi";
import { RxSpeakerQuiet } from "react-icons/rx";
import { useModalStore } from "@/store/useModalStore";
import signin from "@/assets/icons/signin.svg";
import rahyaarLogo from "@/assets/icons/rahyaar.png";

function Header() {
  const data = "";

  const { openLogin } = useModalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center px-7 lg:px-20 xl:px-32 pt-4  relative z-[999] ">
      {/* mobile */}
      <div className="text-4xl cursor-pointer md:hidden">
        <IoMenu onClick={() => setIsMenuOpen(true)} />
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[52]"
              onClick={() => setIsMenuOpen(false)}
            />

            <div className="fixed top-0 right-0 h-full w-[50%] bg-white shadow-lg z-[55] transition-transform duration-300 translate-x-0 rounded-l-xl p-5 space-y-4">
              <ul className="text-base space-y-4">
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-semibold"
                  onClick={() => setIsMenuOpen(false)}>
                  <RiHome5Line className="text-xl" />
                  <Link href="/">صفحه اصلی</Link>
                </li>
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-medium"
                  onClick={() => setIsMenuOpen(false)}>
                  <PiAirplaneLight className="text-xl" />
                  <Link href="#">خدمات گردشگری</Link>
                </li>
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-medium"
                  onClick={() => setIsMenuOpen(false)}>
                  <RxSpeakerQuiet className="text-xl" />
                  <Link href="#">درباره ما</Link>
                </li>
                <li
                  className="flex items-center gap-x-2 hover:text-complementry font-medium"
                  onClick={() => setIsMenuOpen(false)}>
                  <IoCallOutline className="text-xl" />
                  <Link href="#">تماس با ما</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      {/* desktop */}
      <div className="hidden md:flex justify-between items-center md:gap-10 lg:gap-14 xl:gap-20">
        <div>
          <Image src={rahyaarLogo} alt="rahyaar logo" width={180} height={50} />
        </div>
        <ul className="text-base lg:text-lg lg:font-semibold text-[#282828] flex flex-nowrap gap-x-4 lg:gap-x-10">
          <li className="hover:text-complementry cursor-pointer">
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li className="hover:text-complementry cursor-pointer">
            <Link href="#">خدمات گردشگری</Link>
          </li>
          <li className="hover:text-complementry cursor-pointer">
            <Link href="#">درباره ما</Link>
          </li>
          <li className="hover:text-complementry cursor-pointer">
            <Link href="#">تماس با ما</Link>
          </li>
        </ul>
      </div>
      <div className="cursor-pointer relative">
        {!data?.mobile ? (
          <div onClick={openLogin}>
            <div className="block md:hidden ">
              <Image src={signin} alt="signin icon" width={40} height={40} />
            </div>
            <div className="hidden md:flex justify-center items-center gap-x-2 text-primary text-lg border-2 rounded-lg px-3 py-2 border-primary text-nowrap hover:text-complementry">
              <HiMiniUser />
              <span className="font-semibold">ورود | ثبت نام</span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center gap-x-2 text-primary md:text-lg">
              <HiMiniUser />
              <p>{data.mobile}</p>
              <IoChevronDown />
            </div>
            <div
              className={`absolute left-0 top-[30px] bg-white z-50 overflow-hidden rounded-lg w-[157px] md:w-[220px] transition-all duration-300 ease-in-out shadow ${
                isOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              }`}>
              <div className="flex justify-start items-center bg-[#f4f4f4] gap-x-4 p-2 w-full border-b-2 cursor-pointer">
                <div className="bg-[#D9D9D9] p-[6px] rounded-full">
                  <HiMiniUser className="text-[#696969]" />
                </div>
                <p className="text-[#282828] text-sm md:text-base">
                  {data.mobile}
                </p>
              </div>
              <div className="flex justify-start items-center gap-x-2 text-[#282828] px-2 py-3 border-b-2 cursor-pointer w-full">
                <HiOutlineUser />
                <p className="text-xs md:text-sm">اطلاعات حساب کاربری</p>
              </div>
              <div className="flex justify-start items-center gap-x-2 text-[#282828] px-2 py-3 cursor-pointer w-full">
                <Image src={""} alt="logout icon" width={18} height={18} />
                <p className="text-[#D40000] text-xs md:text-sm">
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
