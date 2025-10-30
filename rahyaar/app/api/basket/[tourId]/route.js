import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request, { params }) {
  try {
    const { tourId } = params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });
    }

    const reservationData = await request.json();

    const res = await fetch(`http://localhost:6500/basket/${tourId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservationData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.error || "خطا در افزودن به سبد خرید" },
        { status: res.status }
      );
    }

    const result = await res.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Basket update error:", error);
    return NextResponse.json(
      { error: "خطای سرور در افزودن به سبد خرید" },
      { status: 500 }
    );
  }
}
