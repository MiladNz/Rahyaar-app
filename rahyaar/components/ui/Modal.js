"use client";
// import { IoMdClose } from "react-icons/io";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-overlay/30 dark:bg-gray-900/80 backdrop-blur-lg backdrop-saturate-100 flex justify-center items-center z-[1000]"
      onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-[20px] shadow-lg dark:shadow-gray-900/50 relative p-5 transition-all w-[340px] sm:w-[380px] md:w-[420px] lg:w-[480px]"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
