import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  phoneNumber: "",
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      localStorage.removeItem("access_token");
    } catch (err) {
      console.error("خطا در خروج از حساب کاربری:", err);
    }

    set({ user: null, phoneNumber: "" });
  },
}));
