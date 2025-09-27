"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import Modal from "../ui/Modal";
import { useModalStore } from "@/store/useModalStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/schema/loginSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { OtpInput } from "reactjs-otp-input";
import { sendOtpAction } from "@/app/actions/sendOtp";

function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [step, setStep] = useState("sendOtp");

  const { isLoginOpen, closeLogin } = useModalStore();

  const { setPhoneNumber } = useAuthStore();

  const loginHandler = async (input) => {
    try {
      const formData = new FormData();
      formData.append("phoneNumber", input.phoneNumber);

      const data = await sendOtpAction(formData);

      setPhoneNumber(input.phoneNumber);

      console.log("OTP Code:", data);
      setStep("checkOtp");
    } catch (err) {
      console.error("Error:", err);
    }
    // const phoneNumber = input.phoneNumber;

    // setPhoneNumber(phoneNumber);

    // try {
    //   const result = await fetch("http://localhost:6500/auth/send-otp", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ mobile: phoneNumber }),
    //   });

    //   const data = await result.json();

    //   if (!result.ok) {
    //     console.error("خطا:", data.message);
    //     return;
    //   }

    //   console.log("OTP sent:", data);
    //   setStep("checkOtp");
    // } catch (err) {
    //   console.error("Network error:", err);
    // }
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={closeLogin}>
      <div>
        {/* ${visible ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} */}
        {step === "sendOtp" ? (
          <>
            <form
              onSubmit={handleSubmit(loginHandler)}
              className="flex flex-col gap-y-4">
              {/* <div className="bg-white rounded-[20px] text-center w-[360px] h-[360px] md:w-[460px] lg:w-[560px] flex flex-col justify-between p-5 relative z-[1001]  transition-all duration-1000"> */}
              <span
                className="absolute left-5 top-5 text-2xl cursor-pointer"
                onClick={closeLogin}>
                <IoMdClose />
              </span>
              <h2 className="font-semibold text-textColor text-[22px] md:text-2xl lg:text-[28px] mt-8 text-center">
                ورود به رهیار
              </h2>
              {/* <div className=" flex flex-col gap-y-4 justify-center items-start px-3"> */}
              <label className="text-sm md:text-base font-normal mt-2">
                شماره موبایل خود را وارد کنید
              </label>
              <input
                type="tel"
                {...register("phoneNumber")}
                placeholder="۰۹۱۲***۴۲۵۳"
                className="w-full px-2 py-4 text-base border border-[#D9D9D9] rounded-md "
              />
              <p className="min-h-4 text-rose-500 text-sm font-normal mb-5 ">
                {errors.phoneNumber?.message || " "}
              </p>
              <button
                type="submit"
                className="w-full bg-primary text-base md:text-lg text-white py-3 px-20 rounded-md ">
                ارسال کد تایید
              </button>
              {/* </div> */}
              {/* </div> */}
            </form>
          </>
        ) : (
          <>
            <form>
              <div className="bg-white rounded-[20px] text-center w-[360px] h-[360px] flex flex-col justify-between p-5 relative">
                <span className="absolute left-5 top-5 text-xl">
                  <FaArrowLeft />
                </span>
                <h2 className="font-semibold text-[#282828] text-[22px] mt-8">
                  کد تایید را وارد کنید
                </h2>
                <div className=" flex flex-col gap-y-4 justify-center items-start px-3">
                  <label className="text-base font-normal">
                    کد تایید به شماره {"phoneNumber"} ارسال شد
                  </label>

                  {/* <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    isInputNum={true}
                    shouldAutoFocus
                    className="w-10 h-10 text-center border rounded p-3 text-lg mx-1 "
                    focusStyle={"outline-none ring-0 border-none text-center"}
                    enableRtl={false}
                    containerStyle={{ direction: "ltr" }}
                  /> */}

                  {/* <p className="text-sm text-gray-500">
                    {timer > 0 ? (
                      `تا ارسال مجدد کد ${Math.floor(timer / 60)}:${String(
                        timer % 60
                      ).padStart(2, "0")}`
                    ) : (
                      <button
                        type="button"
                        onClick={resendOtp}
                        className="text-green-400 font-semibold underline underline-offset-4 hover:text-[#28A745] transition">
                        ارسال مجدد کد
                      </button>
                    )}
                  </p> */}
                  <button className="w-full bg-primary text-lg text-white py-3 px-20 rounded-md ">
                    ورود به رهیار
                  </button>
                </div>
              </div>
            </form>
          </>
          // ""
        )}
      </div>
    </Modal>
  );
}

export default LoginModal;
