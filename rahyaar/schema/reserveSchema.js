import * as yup from "yup";

export const reserveSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام باید حداقل 3 کاراکتر باشد"),

  nationalId: yup
    .string()
    .required("کد ملی الزامی است")
    .matches(/^[0-9]{10}$/, "کد ملی باید 10 رقم باشد"),

  birthDate: yup.string().required("تاریخ تولد الزامی است"),

  gender: yup.string().required("انتخاب جنسیت الزامی است"),
  // .oneOf(["male", "female"], "جنسیت باید مرد یا زن باشد"),
});
