"use client";

import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";
import { checkOtpAction } from "@/app/actions/checkOtp";
import { saveTokenAction } from "@/app/actions/saveToken";

function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [step, setStep] = useState("sendOtp");
  const [timer, setTimer] = useState(90);
  const [otp, setOtp] = useState("");

  const { isLoginOpen, closeLogin } = useModalStore();

  const { setPhoneNumber } = useAuthStore();
  const { phoneNumber } = useAuthStore.getState();

  useEffect(() => {
    if (step !== "checkOtp") return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const loginHandler = async (input) => {
    try {
      const formData = new FormData();
      formData.append("phoneNumber", input.phoneNumber);

      const data = await sendOtpAction(formData);

      setPhoneNumber(input.phoneNumber);

      toast.info(`کد تایید: ${data?.code}`);

      console.log("OTP Code:", data);
      setStep("checkOtp");
    } catch (err) {
      toast.error("ارسال کد تایید با خطا مواجه شد");
      console.error("Error:", err);
    }
  };

  const resendOtp = async () => {
    try {
      // const { phoneNumber } = useAuthStore.getState();

      if (!phoneNumber) {
        toast.error("شماره موبایل پیدا نشد");
        return;
      }

      const formData = new FormData();
      formData.append("phoneNumber", phoneNumber);

      const data = await sendOtpAction(formData);

      console.log("OTP Resent:", data);

      setTimer(90);
      toast.info(`کد تایید جدید: ${data?.otp}`);
    } catch (err) {
      toast.error("خطا در ارسال مجدد کد");
      console.error("Error in resendOtp:", err);
    }
  };

  const verifyOtpHandler = async () => {
    try {
      if (!otp || otp.length !== 6) {
        toast.error("کد اعتبارسنجی باید 6 رقم باشد");
        return;
      }

      const formData = new FormData();
      formData.append("phoneNumber", phoneNumber);
      formData.append("code", otp);

      const result = await checkOtpAction(formData);

      localStorage.setItem("access_token", result.accessToken);

      const tokenForm = new FormData();
      tokenForm.append("accessToken", result.accessToken);
      tokenForm.append("refreshToken", result.refreshToken);
      await saveTokenAction(tokenForm);

      console.log(tokenForm);

      toast.success("ورود موفقیت‌آمیز بود");
      closeLogin();
    } catch (err) {
      toast.error("کد تایید نادرست است");
      console.error("OTP Verification Error:", err);
    }
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={closeLogin}>
      <div className="relative">
        {/* ${visible ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"} */}
        <span
          className="absolute left-0 top-0 text-xl cursor-pointer z-10"
          onClick={() => {
            if (step === "sendOtp") {
              closeLogin();
            } else if (step === "checkOtp") {
              setStep("sendOtp");
              setOtp("");
            }
          }}>
          {step === "sendOtp" ? <IoMdClose /> : <FaArrowLeft />}
        </span>
        {step === "sendOtp" ? (
          <>
            <form
              onSubmit={handleSubmit(loginHandler)}
              className="flex flex-col gap-y-4">
              {/* <div className="bg-white rounded-[20px] text-center w-[360px] h-[360px] md:w-[460px] lg:w-[560px] flex flex-col justify-between p-5 relative z-[1001]  transition-all duration-1000"> */}

              <h2 className="font-semibold text-textColor text-[22px] md:text-2xl lg:text-[28px] mt-8 mb-4 text-center">
                ورود به رهیار
              </h2>
              {/* <div className=" flex flex-col gap-y-4 justify-center items-start px-3"> */}
              <label className="text-sm md:text-base font-normal mt-4 mb-2">
                شماره موبایل خود را وارد کنید
              </label>
              <input
                type="tel"
                {...register("phoneNumber")}
                placeholder="۰۹۱۲***۴۲۵۳"
                className="w-full px-2 py-4 text-base border border-primary rounded-md "
              />
              <p className="h-5 text-rose-500 text-sm font-normal my-1 ">
                {errors.phoneNumber?.message || "\u00A0"}
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
        ) : step === "checkOtp" ? (
          <>
            <form onSubmit={handleSubmit(verifyOtpHandler)}>
              <div className="bg-white rounded-[20px] text-center flex flex-col justify-between items-center p-2 relative">
                <h2 className="font-semibold text-textColor text-lg md:text-2xl mt-6 mb-10">
                  کد تایید را وارد کنید
                </h2>
                <div className="w-full flex flex-col gap-y-6 justify-center items-center px-3">
                  <label className="text-[14px] md:text-base font-normal">
                    کد تایید به شماره{" "}
                    <span className="font-semibold">{phoneNumber}</span> ارسال
                    شد
                  </label>

                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    isInputNum={true}
                    shouldAutoFocus
                    className="w-10 h-10 text-center text-textColor font-semibold border border-primary rounded p-3 text-lg mx-1"
                    focusStyle={"outline-none ring-0 border-none text-center"}
                    enableRtl={false}
                    containerStyle={{ direction: "ltr" }}
                  />

                  <p className="text-sm text-gray-500">
                    {timer > 0 ? (
                      `تا ارسال مجدد کد ${Math.floor(timer / 60)}:${String(
                        timer % 60
                      ).padStart(2, "0")}`
                    ) : (
                      <button
                        type="button"
                        onClick={resendOtp}
                        className="text-primary font-semibold underline underline-offset-4 hover:text-secondary transition">
                        ارسال مجدد کد
                      </button>
                    )}
                  </p>
                  <button className="w-full bg-primary text-lg text-white py-3 px-20 rounded-md ">
                    ورود به رهیار
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          // ""
          ""
        )}
      </div>
    </Modal>
  );
}

export default LoginModal;
