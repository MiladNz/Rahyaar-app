import { useQuery } from "@tanstack/react-query";

export function useTours(filters = {}) {
  return useQuery({
    queryKey: ["tours", filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `http://localhost:6500/tour/${
        queryParams ? `?${queryParams}` : ""
      }`;

      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت لیست تورها");
      }

      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTourById(id) {
  return useQuery({
    queryKey: ["tour", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6500/tour/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("خطا در دریافت جزییات تور");
      }

      return res.json();
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
