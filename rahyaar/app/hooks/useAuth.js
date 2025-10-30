import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

export function useSyncAuth() {
  const { data: user, isLoading, error } = useCurrentUser();
  const { setUser, user: authUser } = useAuthStore();

  React.useEffect(() => {
    if (user && user !== authUser) {
      setUser(user);
    }
  }, [user, authUser, setUser]);

  return { user, isLoading, error };
}

export function useCurrentUser() {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setUser(null);
            return null;
          }
          throw new Error("خطا در دریافت اطلاعات کاربر");
        }

        const userData = await res.json();
        setUser(userData);
        return userData;
      } catch (error) {
        setUser(null);
        throw error;
      }
    },
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("خطا در دریافت پروفایل کاربر");
        }

        return await res.json();
      } catch (error) {
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
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

      const saveRes = await fetch("/api/auth/save-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tokens),
      });

      if (!saveRes.ok) {
        throw new Error("خطا در ذخیره توکن");
      }

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

export function useLogout() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("خطا در خروج از حساب");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.clear();

      logout();
    },
  });
}

export function useAddToBasket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tourId }) => {
      const res = await fetch(`/api/basket/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "خطا در افزودن به سبد خرید");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["basket"] });
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData) => {
      const res = await fetch(`/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "خطا در ایجاد سفارش");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData) => {
      const res = await fetch(`/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "خطا در بروزرسانی پروفایل");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
