import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default async function PaymentSuccessPage() {
  const cookieStore = await cookies();
  const paymentSuccess = cookieStore.get("payment_success")?.value;

  if (!paymentSuccess) {
    redirect("/");
  }

  let paymentData;
  try {
    paymentData = JSON.parse(paymentSuccess);

    if (paymentData.tourTitle) {
      paymentData.tourTitle = decodeURIComponent(paymentData.tourTitle);
    }

    const paymentTime = new Date(paymentData.timestamp);
    const currentTime = new Date();
    const timeDiff = (currentTime - paymentTime) / (1000 * 60);

    if (timeDiff > 10) {
      redirect("/");
    }
  } catch (error) {
    redirect("/");
  }

  return <PaymentSuccessContent paymentData={paymentData} />;
}
