"use server";

import { cookies } from "next/headers";

export async function saveTokenAction(formData) {
  const accessToken = formData.get("accessToken");
  const refreshToken = formData.get("refreshToken");

  if (accessToken) {
    (await cookies()).set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      secure: true,
    });
  }

  if (refreshToken) {
    (await cookies()).set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    });
  }
}
