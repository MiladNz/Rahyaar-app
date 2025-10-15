import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCurrentUser } from "./useAuth";

export function useSyncAuth() {
  const { data: user, isLoading } = useCurrentUser();
  const { setUser, user: authUser } = useAuthStore();

  useEffect(() => {
    if (user && user !== authUser) {
      setUser(user);
    }
  }, [user, authUser, setUser]);

  return { user, isLoading };
}
