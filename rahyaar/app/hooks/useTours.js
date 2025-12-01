import BASE_URL from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTours(filters = {}, options = {}) {
  const queryKey = ["tours", filters];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `${BASE_URL}/tour${queryParams ? `?${queryParams}` : ""}`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت لیست تورها");
      }

      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  return query;
}

export function useTourById(id, options = {}) {
  return useQuery({
    queryKey: ["tour", id],
    queryFn: async () => {
      if (!id) throw new Error("آیدی تور الزامی است");

      const res = await fetch(`${BASE_URL}/tour/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`خطا در دریافت جزییات تور`);
      }

      return res.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
