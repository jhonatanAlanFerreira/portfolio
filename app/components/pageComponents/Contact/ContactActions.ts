"use server";
import { ServerResponse } from "@/types/ServerResponse";
import { ContactData } from "./ContactInterfaces";
import { Resend } from "resend";
import { getGoogleCaptchaLink } from "@/utils";

export async function sendEmailAction(
  data: ContactData & { captchaToken: string },
): Promise<ServerResponse> {
  const { name, email, message, captchaToken } = data;
  const {
    RESEND_FROM_EMAIL,
    RESEND_TO_EMAIL,
    RESEND_API_KEY,
    RECAPTCHA_SECRET_KEY,
  } = process.env;

  if (
    !RESEND_FROM_EMAIL ||
    !RESEND_TO_EMAIL ||
    !RESEND_API_KEY ||
    !RECAPTCHA_SECRET_KEY
  ) {
    console.error("Env variable missing");
    return { success: false, message: "Failed to send email." };
  }

  try {
    const verifyRes = await fetch(getGoogleCaptchaLink(captchaToken), {
      method: "POST",
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return { success: false, message: "Captcha verification failed." };
    }
  } catch (error) {
    return { success: false, message: "Captcha verification failed." };
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      subject: `Message from ${name}`,
      text: `${message}\n\nReply to: ${email}`,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to send email." };
  }
}
