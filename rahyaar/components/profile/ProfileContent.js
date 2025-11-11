"use client";

import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
// import { fetchWithAuth } from "../utils/fetchWithAuth";
// import MyTours from "./MyTours";
// import MyTransactions from "./MyTransactions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import getFaDigits from "@/utils/getFaDigits";
import profileSchema from "@/schema/profileSchema";
import bankSchema from "@/schema/bankSchema";
import emailSchema from "@/schema/emailSchema";
import { convertGregorianToJalali } from "@/utils/ConvertBirthDate";
// import "jalaali-react-date-picker/lib/styles/index.css";
// import { InputDatePicker } from "jalaali-react-date-picker";

export default function ProfileContent({ activeTab, data }) {
  const {
    mobile,
    email,
    firstName,
    lastName,
    gender,
    birthDate,
    nationalCode,
    payment,
  } = data;

  const queryClient = useQueryClient();

  const [addEmail, setAddEmail] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [editBankInfo, setEditBankInfo] = useState(false);
  // const [birthdateValue, setBirthdateValue] = useState(
  //   // birthDate ? moment(birthDate) : null
  // );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onBlur",
  });

  const {
    register: registerBank,
    handleSubmit: handleBankSubmit,
    formState: { errors: bankErrors, isSubmitting: isSubmittingBank },
    reset: resetBank,
  } = useForm({
    resolver: yupResolver(bankSchema),
    mode: "onBlur",
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
    reset: resetEmail,
  } = useForm({
    resolver: yupResolver(emailSchema),
    mode: "onBlur",
  });

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const onSubmitEmail = () => {};

  const onSubmitInfo = () => {};

  const handleEditInfo = () => {
    reset({
      firstName: firstName || "",
      lastName: lastName || "",
      nationalId: nationalCode || "",
      gender: gender || "",
      birthdate: birthDate?.split("T")[0] || "",
    });
    setEditInfo(true);
  };

  const handleEditBank = () => {
    resetBank({
      debitCard_code: payment?.debitCard_code || "",
      accountIdentifier: payment?.accountIdentifier || "",
      shaba_code: payment?.payment || "",
    });
    setEditBankInfo(true);
  };

  const updateBankInfo = (values) => {};

  const content = {
    profile: (
      <div className="flex flex-col gap-4">
        <div className="border-2 rounded-lg p-4">
          <h3 className="font-bold mb-8">اطلاعات حساب کاربری</h3>
          <div className="flex flex-col lg:flex-row lg:w-full lg:items-center lg:justify-between">
            <div className="flex justify-between items-center pb-2 gap-x-4">
              <p className="text-sm mb-1 font-light">شماره موبایل:</p>
              <p className="text-sm mb-1 font-semibold">
                {getFaDigits(String(mobile))}
              </p>
            </div>
            <div className="flex items-center justify-between pb-2 gap-x-4">
              {email ? (
                <>
                  <p className="text-sm mb-1 font-light">ایمیل:</p>
                  <p className="text-sm mb-1 font-semibold">{email}</p>
                </>
              ) : !addEmail ? (
                <>
                  <p className="text-sm mb-1 font-light">ایمیل:</p>
                  <div className="flex items-center  gap-x-1">
                    <BiEditAlt className="text-[#009ECA]" />
                    <button
                      onClick={() => setAddEmail(true)}
                      className="text-[#009ECA] text-sm mt-2 lg:mt-0">
                      افزودن آدرس ایمیل
                    </button>
                  </div>
                </>
              ) : (
                addEmail && (
                  <form
                    onSubmit={handleSubmitEmail(onSubmitEmail)}
                    className="w-full flex  justify-between gap-x-1">
                    <div className="flex flex-col w-4/5 h-6">
                      <input
                        type="email"
                        placeholder="آدرس ایمیل"
                        {...registerEmail("email")}
                        className="border-2 rounded-md py-1 px-2 text-sm w-full"
                      />
                      {emailErrors.email && (
                        <p className="text-red-600 text-sm">
                          {emailErrors.email.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingEmail}
                      className="bg-[#28A745] text-white px-3 py-1 rounded-md w-1/5">
                      تایید
                    </button>
                  </form>
                )
              )}
            </div>
          </div>
        </div>
        <div className="border-2 rounded-lg p-4">
          {!editInfo ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold">اطلاعات شخصی</h3>
                <div className="flex items-center justify-end gap-x-1">
                  <BiEditAlt className="text-[#009ECA]" />
                  <button
                    onClick={handleEditInfo}
                    className="text-[#009ECA] text-sm">
                    ویرایش اطلاعات
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-full ">
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">نام و نام خانوادگی:</p>{" "}
                  <p className="text-sm mb-1 font-semibold">
                    {firstName || lastName
                      ? `${firstName} ${lastName}`
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">کد ملی:</p>
                  <p className="text-sm mb-1 font-semibold">
                    {nationalCode
                      ? getFaDigits(String(nationalCode))
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">جنسیت:</p>
                  <p className="text-sm mb-1 font-semibold">
                    {gender ? (gender === "male" ? "مرد" : "زن") : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">تاریخ تولد :</p>
                  <p className="text-sm mb-1 font-semibold">
                    {/* {ConvertBirthdate(birthDate)} */}
                    {birthDate
                      ? getFaDigits(convertGregorianToJalali(birthDate))
                      : "ثبت نشده"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitInfo)}
              className="flex flex-col gap-y-4">
              <h3 className="font-bold">ویرایش اطلاعات شخصی</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:pb-6 lg:border-b-2">
                <div>
                  <input
                    {...register("firstName")}
                    placeholder="نام"
                    className="w-full border-2 rounded-md p-2 text-sm"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    placeholder="نام خانوادگی"
                    className="w-full border-2 rounded-md p-2 text-sm"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("nationalId")}
                    placeholder="کد ملی"
                    className="w-full border-2 rounded-md p-2 text-sm"
                  />
                  {errors.nationalId && (
                    <p className="text-red-600 text-sm">
                      {errors.nationalId.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...register("gender")}
                    className="w-full border-2 rounded-md p-2 text-sm">
                    <option value="" disabled hidden>
                      جنسیت
                    </option>
                    <option value="female">زن</option>
                    <option value="male">مرد</option>
                  </select>
                </div>

                <div>
                  {/* <InputDatePicker
                    name="birthdate"
                    placeholder="تاریخ تولد"
                    value={birthdateValue}
                    onChange={(momentDate) => {
                      if (momentDate) {
                        setBirthdateValue(momentDate);
                        const iso = momentDate.toDate().toISOString();
                        setValue("birthdate", iso);
                      }
                    }}
                    inputClass="w-full border-2 rounded-md p-2 text-sm"
                  />
                  {errors.birthdate && (
                    <p className="text-red-600 text-sm">
                      {errors.birthdate.message}
                    </p>
                  )} */}
                </div>
              </div>
              <div className="flex gap-4 w-full lg:w-2/5 lg:self-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md text-white bg-[#28A745] border-2 border-green-600">
                  تایید
                </button>
                <button
                  type="button"
                  onClick={() => setEditInfo(false)}
                  className="w-full px-3 py-2 rounded-md text-[#28A745] bg-white border-2 border-green-600">
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="border-2 rounded-lg p-4">
          {!editBankInfo ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold">اطلاعات حساب بانکی</h3>
                <div className="flex items-center justify-end gap-x-1">
                  <BiEditAlt className="text-[#009ECA]" />
                  <button
                    onClick={handleEditBank}
                    className="text-[#009ECA] text-sm">
                    ویرایش اطلاعات
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-full">
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">شماره کارت: </p>
                  <p className="text-sm mb-1 font-semibold">
                    {payment
                      ? getFaDigits(String(payment.debitCard_code))
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">شماره حساب:</p>
                  <p className="text-sm mb-1 font-semibold">
                    {payment
                      ? getFaDigits(payment.accountIdentifier)
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light">شماره شبا: </p>
                  <p className="text-sm mb-1 font-semibold">
                    {payment ? payment.payment : "ثبت نشده"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleBankSubmit(updateBankInfo)}
              className="flex flex-col gap-y-4">
              <h3 className="font-bold">ویرایش اطلاعات حساب بانکی</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:pb-6 lg:border-b-2">
                <div>
                  <input
                    {...registerBank("debitCard_code")}
                    placeholder="شماره کارت"
                    className="w-full border-2 rounded-md p-2 text-sm"
                  />
                  {bankErrors.debitCard_code && (
                    <p className="text-red-600 text-sm">
                      {bankErrors.debitCard_code.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerBank("accountIdentifier")}
                    placeholder="شماره حساب"
                    className="w-full border-2 rounded-md p-2 text-sm"
                  />
                  {bankErrors.accountIdentifier && (
                    <p className="text-red-600 text-sm">
                      {bankErrors.accountIdentifier.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerBank("shaba_code")}
                    placeholder="شماره شبا"
                    className="w-full border-2 rounded-md p-2 text-sm"
                  />
                </div>
              </div>
              <div className="w-full flex items-center lg:w-2/5 lg:self-end gap-4">
                <button
                  type="submit"
                  disabled={isSubmittingBank}
                  className="w-full px-3 py-2 rounded-md text-white bg-[#28A745] border-2 border-green-600">
                  تایید
                </button>
                <button
                  type="button"
                  onClick={() => setEditBankInfo(false)}
                  className="w-full px-3 py-2 rounded-md text-[#28A745] bg-white border-2 border-green-600">
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    ),
    // mytours: (
    //   <>
    //     <MyTours />
    //   </>
    // ),
    // transactions: (
    //   <>
    //     <MyTransactions />
    //   </>
    // ),
  };

  return <div className="">{content[activeTab]}</div>;
}
