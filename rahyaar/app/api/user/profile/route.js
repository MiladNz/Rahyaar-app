import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });
    }

    const res = await fetch("http://localhost:6500/user/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "خطا در دریافت اطلاعات کاربر" },
        { status: res.status }
      );
    }

    const userData = await res.json();
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
