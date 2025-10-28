import { useAuthStore } from "@/store/useAuthStore";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function ReserveClientPage({ tour }) {
  const router = useRouter;
  const { user } = useAuthStore();
  const { openLogin } = useModalStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  return <div>ReserveClientPage</div>;
}

export default ReserveClientPage;
