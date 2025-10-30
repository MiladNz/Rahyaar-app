import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });
    }

    const orderData = await request.json();

    if (
      !orderData.nationalCode ||
      !orderData.fullName ||
      !orderData.gender ||
      !orderData.birthDate
    ) {
      return NextResponse.json(
        { error: "داده‌های ضروری ارسال نشده است" },
        { status: 400 }
      );
    }

    const res = await fetch("http://localhost:6500/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorData.error || "خطا در ایجاد سفارش" },
          { status: res.status }
        );
      } catch {
        return NextResponse.json(
          { error: "خطا در ایجاد سفارش" },
          { status: res.status }
        );
      }
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "خطای سرور در ایجاد سفارش" },
      { status: 500 }
    );
  }
}
