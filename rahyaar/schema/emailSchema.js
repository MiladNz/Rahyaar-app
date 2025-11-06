import * as yup from "yup";

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .email("فرمت ایمیل معتبر نیست")
    .required("ایمیل الزامی است"),
});

export default emailSchema;
