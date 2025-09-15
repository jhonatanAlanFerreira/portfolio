"use server";
import { ServerResponse } from "@/types/ServerResponse";
import { ContactData } from "./ContactInterfaces";
import { Resend } from "resend";

export async function sendEmailAction(
  data: ContactData
): Promise<ServerResponse> {
  const { name, email, message } = data;
  const { RESEND_FROM_EMAIL, RESEND_TO_EMAIL, RESEND_API_KEY } = process.env;

  if (!RESEND_FROM_EMAIL || !RESEND_TO_EMAIL || !RESEND_API_KEY) {
    console.error("Env variable missing");
    return { success: false, message: "Failed to send email." };
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
