import { cache } from "react";

export async function getToursAction(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();
  const url = `http://localhost:6500/tour${
    queryParams ? `?${queryParams}` : ""
  }`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("خطا در دریافت لیست تورها:", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("خطای ارتباط با سرور:", err);
    return [];
  }
}
