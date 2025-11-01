"use client";

import { usePaymentGuard } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function PaymentGuard({ children }) {
  const router = useRouter();
  const { isAllowed, isChecking } = usePaymentGuard();

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAllowed) {
    router.push("/");
  }

  return <>{children}</>;
}
