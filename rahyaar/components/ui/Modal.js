"use client";
import { IoMdClose } from "react-icons/io";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-[1000]"
      onClick={onClose}>
      <div
        className="bg-white rounded-[20px] shadow-lg relative p-6 transition-all w-[360px] md:w-[460px] lg:w-[560px]"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute left-5 top-5 text-2xl cursor-pointer">
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
}
