import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async ({ phoneNumber, code }) => {
      const otpRes = await fetch("http://localhost:6500/auth/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phoneNumber, code }),
      });

      if (!otpRes.ok) {
        throw new Error("کد تایید نادرست است");
      }

      const tokens = await otpRes.json();

      await fetch("/api/auth/save-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokens),
      });

      return tokens;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });

      const userData = queryClient.getQueryData(["currentUser"]);
      if (userData) {
        setUser(userData);
      }
    },
  });
}

export function useCurrentUser() {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:6500/user/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت اطلاعات کاربر");
      }

      const userData = await res.json();

      setUser(userData);

      return userData;
    },
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: async (phoneNumber) => {
      const res = await fetch("http://localhost:6500/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phoneNumber }),
      });

      if (!res.ok) {
        throw new Error("خطا در ارسال OTP");
      }

      return res.json();
    },
  });
}
