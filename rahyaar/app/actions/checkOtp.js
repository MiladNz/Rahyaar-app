"use server";

export async function checkOtpAction(formData) {
  const mobile = formData.get("phoneNumber");
  const code = formData.get("code");
  try {
    const res = await fetch("http://localhost:6500/auth/check-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, code }),
    });

    if (!res.ok) {
      throw new Error("خطا در اعتبارسنجی OTP");
    }

    return await res.json();
  } catch (err) {
    console.error("Server Action Error:", err);
    throw err;
  }
}
