import BASE_URL from "@/services/api";

export async function getTourByIdAction(id) {
  try {
    const res = await fetch(`${BASE_URL}/tour/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      throw new Error(`خطا در دریافت جزییات تور: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("خطای ارتباط با سرور:", err);
    return null;
  }
}
