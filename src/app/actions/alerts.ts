"use server";

import { subscribeJobAlert } from "@/lib/db";

export interface AlertSubmitResult {
  success: boolean;
  message: string;
}

export async function handleJobAlertSubscription(
  formData: FormData
): Promise<AlertSubmitResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const specialty = (formData.get("specialty") as string)?.trim() || undefined;
  const state = (formData.get("state") as string)?.trim() || undefined;
  const employmentType = (formData.get("employmentType") as string)?.trim() || undefined;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Please provide a valid email address.",
    };
  }

  return await subscribeJobAlert(email, specialty, state, employmentType);
}
