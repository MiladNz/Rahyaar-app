"use server";

export async function sendOtpAction(formData) {
  const phoneNumber = formData.get("phoneNumber");
  try {
    const res = await fetch("http://localhost:6500/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: phoneNumber }),
    });

    if (!res.ok) {
      throw new Error("خطا در ارسال OTP");
    }

    return await res.json();
  } catch (err) {
    console.error("Server Action Error:", err);
    throw err;
  }
}
