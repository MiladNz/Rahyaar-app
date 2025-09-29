"use client";
// import { IoMdClose } from "react-icons/io";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-[1000]"
      onClick={onClose}>
      <div
        className="bg-white rounded-[20px] shadow-lg relative p-5 transition-all w-[340px] sm:w-[380px] md:w-[420px] lg:w-[480px]"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
