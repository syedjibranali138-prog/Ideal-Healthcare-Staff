/**
 * Email Notification Service Helper
 * 
 * Configured via EMAIL_PROVIDER_API_KEY, FROM_EMAIL, and ADMIN_NOTIFICATION_EMAIL.
 * If credentials are not set, it logs notifications to console in development mode
 * rather than failing or silently pretending an external delivery succeeded.
 */

const EMAIL_API_KEY = process.env.EMAIL_PROVIDER_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "notifications@idealhealthcarestaffing.com";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "leads@idealhealthcarestaffing.com";

export const isEmailConfigured = (): boolean => {
  return Boolean(EMAIL_API_KEY && EMAIL_API_KEY.startsWith("re_") && EMAIL_API_KEY.length > 10);
};

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendNotificationEmail(payload: EmailPayload): Promise<{ success: boolean; simulated?: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    // Development-safe fallback log
    console.info(`[Email Service - Simulated / Unconfigured]
To: ${payload.to}
Subject: ${payload.subject}
Content: ${payload.text || "HTML Body"}
Status: Skipped real delivery because EMAIL_PROVIDER_API_KEY is not configured.`);
    return { success: true, simulated: true };
  }

  try {
    // Direct Resend API HTTP dispatch (no extra heavy SDK required)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${EMAIL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.warn("Email delivery provider error:", errData);
      return { success: false, error: errData?.message || "Email provider rejected request." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("Email service exception:", err);
    return { success: false, error: err?.message || "Failed to transmit notification email." };
  }
}
