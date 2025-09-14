"use server";
import { ServerResponse } from "@/types/ServerResponse";
import { ContactData } from "./ContactInterfaces";

export async function sendEmailAction(
  data: ContactData
): Promise<ServerResponse> {
  try {
    console.log("Received data for email:", data);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to send email." };
  }
}
