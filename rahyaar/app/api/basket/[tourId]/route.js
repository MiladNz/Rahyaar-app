import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(request, { params }) {
  try {
    const { tourId } = await params;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }

    const res = await fetch(`http://localhost:6500/basket/${tourId}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error:", errorText);
      return NextResponse.json(
        { error: "خطا در افزودن تور به سبد خرید" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Basket API error:", error);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
