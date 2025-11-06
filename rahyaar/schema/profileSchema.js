import * as yup from "yup";

const profileSchema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .min(3, "نام باید ۳ کاراکتر یا بیشتر باشد")
      .required("نام الزامی می باشد"),
    lastName: yup
      .string()
      .min(3, "نام خانوادگی باید ۳ کاراکتر یا بیشتر باشد")
      .required("نام خانوادگی الزامی می باشد"),
    nationalId: yup
      .string()
      .matches(/^\d{10}$/, "کد ملی باید عددی ۱۰ رقمی باشد"),
    gender: yup.string(),
    birthdate: yup.string(),
    // .matches(
    //   /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    //   "سال تولد میلادی باید به فرم YYYY-MM-DD وارد شود"
    // ),
  })
  .required();

export default profileSchema;
