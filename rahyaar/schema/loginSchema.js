import * as yup from "yup";

const loginSchema = yup
  .object()
  .shape({
    phoneNumber: yup
      .string()
      .required("شماره موبایل الزامی می باشد")
      .matches(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  })
  .required();

export default loginSchema;
