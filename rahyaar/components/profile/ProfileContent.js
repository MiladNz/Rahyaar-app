"use client";

import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import getFaDigits from "@/utils/getFaDigits";
import profileSchema from "@/schema/profileSchema";
import bankSchema from "@/schema/bankSchema";
import emailSchema from "@/schema/emailSchema";
import {
  convertBirthDateToGregorian,
  convertGregorianToJalali,
} from "@/utils/ConvertBirthDate";
import { useUpdateProfile } from "@/app/hooks/useAuth";
import UserTours from "./UserTours";
import UserTransactions from "./UserTransactions";

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

  const updateProfileMutation = useUpdateProfile();

  const [addEmail, setAddEmail] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [editBankInfo, setEditBankInfo] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState(null);

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary dark:border-secondary"></div>
      </div>
    );
  }

  const onSubmitEmail = async (formData) => {
    try {
      const updateData = {
        email: formData.email,
        firstName: firstName || "",
        lastName: lastName || "",
        gender: gender || "",
        nationalCode: nationalCode || "",
        ...(birthDate && { birthDate: birthDate }),
      };

      await updateProfileMutation.mutateAsync(updateData);
      toast.success("ایمیل با موفقیت افزوده شد");
      setAddEmail(false);
      resetEmail();
    } catch (error) {
      toast.error(error.message || "خطا در افزودن ایمیل");
    }
  };

  const onSubmitInfo = async (formData) => {
    try {
      let birthDateGregorian = null;
      if (selectedBirthDate) {
        const jalaliDateString = selectedBirthDate.format("YYYY/MM/DD");
        birthDateGregorian = convertBirthDateToGregorian(jalaliDateString);
      }
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        nationalCode: formData.nationalId,
        ...(birthDateGregorian && { birthDate: birthDateGregorian }),
        ...(email && { email: email }),
      };

      await updateProfileMutation.mutateAsync(updateData);
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
      setEditInfo(false);
      setSelectedBirthDate(null);
    } catch (error) {
      toast.error(error.message || "خطا در بروزرسانی اطلاعات");
    }
  };

  const handleEditInfo = () => {
    const initialBirthDate = birthDate
      ? convertGregorianToJalali(birthDate)
      : null;
    setSelectedBirthDate(initialBirthDate);

    reset({
      firstName: firstName || "",
      lastName: lastName || "",
      nationalId: nationalCode || "",
      gender: gender || "",
      birthdate: birthDate?.split("T")[0] || "",
    });
    setEditInfo(true);
  };

  const updateBankInfo = async (formData) => {
    try {
      const updateData = {
        payment: {
          shaba_code: formData.shaba_code,
          debitCard_code: formData.debitCard_code,
          accountIdentifier: formData.accountIdentifier,
        },
        firstName: firstName || "",
        lastName: lastName || "",
        gender: gender || "",
        nationalCode: nationalCode || "",
        ...(email && { email: email }),
        ...(birthDate && { birthDate: birthDate }),
      };

      await updateProfileMutation.mutateAsync(updateData);
      toast.success("اطلاعات بانکی با موفقیت بروزرسانی شد");
      setEditBankInfo(false);
    } catch (error) {
      toast.error(error.message || "خطا در بروزرسانی اطلاعات بانکی");
    }
  };

  const handleEditBank = () => {
    resetBank({
      debitCard_code: payment?.debitCard_code || "",
      accountIdentifier: payment?.accountIdentifier || "",
      shaba_code: payment?.shaba_code || "",
    });
    setEditBankInfo(true);
  };

  const handleBirthDateChange = (date) => {
    setSelectedBirthDate(date);
  };

  const handleCancelEdit = () => {
    setEditInfo(false);
    setSelectedBirthDate(null);
  };

  const handleCancelBankEdit = () => {
    setEditBankInfo(false);
  };

  const content = {
    profile: (
      <div className="flex flex-col gap-4">
        <div className="border-2 rounded-lg p-4 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="font-bold mb-8 dark:text-white">
            اطلاعات حساب کاربری
          </h3>
          <div className="flex flex-col lg:flex-row lg:w-full lg:items-center lg:justify-between">
            <div className="flex justify-between items-center pb-2 gap-x-4">
              <p className="text-sm mb-1 font-light dark:text-gray-300">
                شماره موبایل:
              </p>
              <p className="text-sm mb-1 font-semibold dark:text-white">
                {getFaDigits(String(mobile))}
              </p>
            </div>
            <div className="flex items-center justify-between pb-2 gap-x-4">
              {email ? (
                <>
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    ایمیل:
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {email}
                  </p>
                </>
              ) : !addEmail ? (
                <>
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    ایمیل:
                  </p>
                  <div className="flex items-center gap-x-1">
                    <BiEditAlt className="text-complementry" />
                    <button
                      onClick={() => setAddEmail(true)}
                      className="text-complementry text-sm mt-2 lg:mt-0">
                      افزودن آدرس ایمیل
                    </button>
                  </div>
                </>
              ) : (
                addEmail && (
                  <form
                    onSubmit={handleSubmitEmail(onSubmitEmail)}
                    className="w-full flex justify-between gap-x-1">
                    <div className="flex flex-col w-4/5 h-6">
                      <input
                        type="email"
                        placeholder="آدرس ایمیل"
                        {...registerEmail("email")}
                        className="border-2 rounded-md py-1 px-2 text-sm w-full dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      />
                      {emailErrors.email && (
                        <p className="text-red-600 dark:text-red-400 text-sm">
                          {emailErrors.email.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingEmail}
                      className="bg-primary dark:bg-secondary text-white px-3 py-1 rounded-md w-1/5">
                      تایید
                    </button>
                  </form>
                )
              )}
            </div>
          </div>
        </div>
        <div className="border-2 rounded-lg p-4 dark:border-gray-700 dark:bg-gray-800">
          {!editInfo ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold dark:text-white">اطلاعات شخصی</h3>
                <div className="flex items-center justify-end gap-x-1">
                  <BiEditAlt className="text-complementry" />
                  <button
                    onClick={handleEditInfo}
                    className="text-complementry text-sm font-medium">
                    ویرایش
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-full">
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    نام و نام خانوادگی:
                  </p>{" "}
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {firstName || lastName
                      ? `${firstName} ${lastName}`
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    کد ملی:
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {nationalCode
                      ? getFaDigits(String(nationalCode))
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    جنسیت:
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {gender ? (gender === "male" ? "مرد" : "زن") : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    تاریخ تولد :
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
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
              <h3 className="font-bold dark:text-white">ویرایش اطلاعات شخصی</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:pb-6 lg:border-b-2 dark:border-gray-700">
                <div>
                  <input
                    {...register("firstName")}
                    placeholder="نام"
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("lastName")}
                    placeholder="نام خانوادگی"
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("nationalId")}
                    placeholder="کد ملی"
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  {errors.nationalId && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.nationalId.message}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    {...register("gender")}
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <option
                      value=""
                      disabled
                      hidden
                      className="dark:bg-gray-700">
                      جنسیت
                    </option>
                    <option value="female" className="dark:bg-gray-700">
                      زن
                    </option>
                    <option value="male" className="dark:bg-gray-700">
                      مرد
                    </option>
                  </select>
                </div>

                <div>
                  <DatePicker
                    value={selectedBirthDate}
                    onChange={handleBirthDateChange}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    inputClass="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="تاریخ تولد را انتخاب کنید"
                    format="YYYY/MM/DD"
                    containerClassName="w-full"
                  />
                  {errors.birthdate && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4 w-full lg:w-2/5 lg:self-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-md text-white bg-primary dark:bg-secondary border-2 border-secondary dark:border-primary">
                  تایید
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-full px-3 py-2 rounded-md text-primary dark:text-white bg-white dark:bg-gray-700 border-2 border-secondary dark:border-gray-600">
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="border-2 rounded-lg p-4 dark:border-gray-700 dark:bg-gray-800">
          {!editBankInfo ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold dark:text-white">
                  اطلاعات حساب بانکی
                </h3>
                <div className="flex items-center justify-end gap-x-1">
                  <BiEditAlt className="text-complementry" />
                  <button
                    onClick={handleEditBank}
                    className="text-complementry text-sm font-medium">
                    ویرایش
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:w-full">
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    شماره کارت:{" "}
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {payment
                      ? getFaDigits(String(payment.debitCard_code))
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    شماره حساب:
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {payment
                      ? getFaDigits(payment.accountIdentifier)
                      : "ثبت نشده"}
                  </p>
                </div>
                <div className="flex justify-between lg:justify-normal lg:gap-x-3 items-center pb-2">
                  <p className="text-sm mb-1 font-light dark:text-gray-300">
                    شماره شبا:{" "}
                  </p>
                  <p className="text-sm mb-1 font-semibold dark:text-white">
                    {payment
                      ? `${"IR"}-${getFaDigits(payment.shaba_code)}`
                      : "ثبت نشده"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <form
              onSubmit={handleBankSubmit(updateBankInfo)}
              className="flex flex-col gap-y-4">
              <h3 className="font-bold dark:text-white">
                ویرایش اطلاعات حساب بانکی
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:pb-6 lg:border-b-2 dark:border-gray-700">
                <div>
                  <input
                    {...registerBank("debitCard_code")}
                    placeholder="شماره کارت"
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  {bankErrors.debitCard_code && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {bankErrors.debitCard_code.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerBank("accountIdentifier")}
                    placeholder="شماره حساب"
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                  {bankErrors.accountIdentifier && (
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {bankErrors.accountIdentifier.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerBank("shaba_code")}
                    placeholder="شماره شبا"
                    className="w-full border-2 rounded-md p-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="w-full flex items-center lg:w-2/5 lg:self-end gap-4">
                <button
                  type="submit"
                  disabled={isSubmittingBank}
                  className="w-full px-3 py-2 rounded-md text-white bg-primary dark:bg-secondary border-2 border-secondary dark:border-primary">
                  تایید
                </button>
                <button
                  type="button"
                  onClick={handleCancelBankEdit}
                  className="w-full px-3 py-2 rounded-md text-primary dark:text-white bg-white dark:bg-gray-700 border-2 border-secondary dark:border-gray-600">
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    ),
    mytours: (
      <>
        <UserTours />
      </>
    ),
    transactions: (
      <>
        <UserTransactions />
      </>
    ),
  };

  return <div className="">{content[activeTab]}</div>;
}
