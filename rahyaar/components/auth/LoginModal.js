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
import { toast } from "sonner";
import { useSendOtp, useLogin } from "@/app/hooks/useAuth";
import getFaDigits from "@/utils/getFaDigits";

function LoginModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const [step, setStep] = useState("sendOtp");
  const [timer, setTimer] = useState(90);
  const [otp, setOtp] = useState("");

  const { isLoginOpen, closeLogin } = useModalStore();
  const { setPhoneNumber, phoneNumber } = useAuthStore();

  const sendOtpMutation = useSendOtp();
  const loginMutation = useLogin();

  useEffect(() => {
    if (step !== "checkOtp") return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (!isLoginOpen) {
      setStep("sendOtp");
      setOtp("");
      setTimer(90);
      reset();
    }
  }, [isLoginOpen, reset]);

  const loginHandler = async (input) => {
    try {
      const data = await sendOtpMutation.mutateAsync(input.phoneNumber);

      setPhoneNumber(input.phoneNumber);
      toast.info(`کد تایید: ${data?.code}`);
      setStep("checkOtp");
    } catch (err) {
      toast.error("ارسال کد تایید با خطا مواجه شد");
    }
  };

  const resendOtp = async () => {
    if (!phoneNumber) {
      toast.error("شماره موبایل پیدا نشد");
      return;
    }

    try {
      const data = await sendOtpMutation.mutateAsync(phoneNumber);
      setTimer(90);
      toast.info(`کد تایید جدید: ${data?.code}`);
    } catch (err) {
      toast.error("خطا در ارسال مجدد کد");
    }
  };

  const verifyOtpHandler = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("کد اعتبارسنجی باید 6 رقم باشد");
      return;
    }

    try {
      await loginMutation.mutateAsync({
        phoneNumber,
        code: otp,
      });

      toast.success("ورود موفقیت‌آمیز بود");
      closeLogin();
    } catch (err) {
      toast.error("کد تایید نادرست است");
    }
  };

  const handleClose = () => {
    closeLogin();
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={handleClose}>
      <div className="relative">
        <span
          className="absolute left-0 top-0 text-xl cursor-pointer z-10 text-gray-800 dark:text-white"
          onClick={() => {
            if (step === "sendOtp") {
              handleClose();
            } else if (step === "checkOtp") {
              setStep("sendOtp");
              setOtp("");
            }
          }}>
          {step === "sendOtp" ? <IoMdClose /> : <FaArrowLeft />}
        </span>

        {step === "sendOtp" ? (
          <form
            onSubmit={handleSubmit(loginHandler)}
            className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-textColor dark:text-white text-[22px] md:text-2xl lg:text-[28px] mt-8 mb-4 text-center">
              ورود به رهیار
            </h2>
            <label className="text-sm md:text-base font-normal mt-4 mb-2 text-gray-800 dark:text-gray-200">
              شماره موبایل خود را وارد کنید
            </label>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="۰۹۱۲***۴۲۵۳"
              className="w-full px-2 py-4 text-base border border-primary dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-secondary/50 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
            <p className="h-5 text-rose-500 text-sm font-normal my-1">
              {errors.phoneNumber?.message || "\u00A0"}
            </p>
            <button
              type="submit"
              disabled={sendOtpMutation.isPending}
              className="w-full bg-primary dark:bg-secondary shadow-lg shadow-primary/40 dark:shadow-secondary/40 text-base md:text-lg text-white py-3 px-20 rounded-md disabled:opacity-50 hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
              {sendOtpMutation.isPending ? "در حال ارسال..." : "ارسال کد تایید"}
            </button>
          </form>
        ) : step === "checkOtp" ? (
          <form onSubmit={handleSubmit(verifyOtpHandler)}>
            <div className="bg-white dark:bg-gray-800 rounded-[20px] text-center flex flex-col justify-between items-center p-2 relative">
              <h2 className="font-semibold text-textColor dark:text-white text-lg md:text-2xl mt-6 mb-10">
                کد تایید را وارد کنید
              </h2>
              <div className="w-full flex flex-col gap-y-6 justify-center items-center px-3">
                <label className="text-[14px] md:text-base font-normal text-gray-800 dark:text-gray-200">
                  کد تایید به شماره{" "}
                  <span className="font-bold text-gray-800 dark:text-white">
                    {getFaDigits(phoneNumber)}
                  </span>{" "}
                  ارسال شد
                </label>

                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus
                  className="w-10 h-10 text-center text-textColor dark:text-white font-semibold border border-secondary dark:border-gray-600 rounded p-3 text-lg mx-1 bg-white dark:bg-gray-700"
                  focusStyle={"outline-none text-center"}
                  inputStyle="text-gray-800 dark:text-white dark:bg-gray-700"
                  enableRtl={false}
                  containerStyle={{ direction: "ltr" }}
                />

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {timer > 0 ? (
                    `تا ارسال مجدد کد ${Math.floor(timer / 60)}:${String(
                      timer % 60
                    ).padStart(2, "0")}`
                  ) : (
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={sendOtpMutation.isPending}
                      className="text-primary dark:text-complementry font-semibold underline underline-offset-4 hover:text-secondary dark:hover:text-complementry/80 transition disabled:opacity-50">
                      ارسال مجدد کد
                    </button>
                  )}
                </p>
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-primary dark:bg-secondary shadow-lg shadow-primary/40 dark:shadow-secondary/40 text-lg text-white py-3 px-20 rounded-md disabled:opacity-50 hover:bg-primary/90 dark:hover:bg-secondary/90 transition-colors">
                  {loginMutation.isPending ? "در حال ورود..." : "ورود به رهیار"}
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </Modal>
  );
}

export default LoginModal;
