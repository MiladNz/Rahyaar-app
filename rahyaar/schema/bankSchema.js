import * as yup from "yup";

const profileSchema = yup
  .object()
  .shape({
    debitCard_code: yup
      .string()
      .matches(/^\d{16}$/, "شماره کارت باید عددی ۱۶ رقمی باشد")
      .required("شماره کارت الزامی می باشد"),
    accountIdentifier: yup
      .string()
      .matches(/^[0-9]{12,16}$/, "شماره حساب باید عددی بین ۱۲ تا ۱۶ رقم باشد"),
    shaba_code: yup.string(),
  })
  .required();

export default profileSchema;
