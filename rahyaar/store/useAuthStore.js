import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  phoneNumber: "",
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, phoneNumber: "" }),
}));
