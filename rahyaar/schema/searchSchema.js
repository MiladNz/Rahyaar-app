import * as yup from "yup";

export const searchSchema = yup.object().shape({
  originId: yup.string().required("لطفا مبدا را انتخاب کنید"),
  destinationId: yup.string(),
  // .required("لطفا مقصد را انتخاب کنید")
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
});
