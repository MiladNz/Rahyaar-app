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

export async function PUT(request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "توکن یافت نشد" }, { status: 401 });
    }

    const body = await request.json();

    if (
      !body.firstName &&
      !body.lastName &&
      !body.gender &&
      !body.birthDate &&
      !body.nationalCode
    ) {
      return NextResponse.json(
        { error: "هیچ داده‌ای برای بروزرسانی ارسال نشده است" },
        { status: 400 }
      );
    }

    const res = await fetch("http://localhost:6500/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      try {
        const errorData = JSON.parse(errorText);
        return NextResponse.json(
          { error: errorData.error || "خطا در بروزرسانی پروفایل" },
          { status: res.status }
        );
      } catch {
        return NextResponse.json(
          { error: "خطا در بروزرسانی پروفایل" },
          { status: res.status }
        );
      }
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await res.json();
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { message: "پروفایل با موفقیت بروزرسانی شد" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "خطای سرور در بروزرسانی پروفایل" },
      { status: 500 }
    );
  }
}
