"use server";

import { submitFacilityInquiry } from "@/lib/db";
import { sendNotificationEmail } from "@/lib/email";

export interface FacilitySubmitResult {
  success: boolean;
  message?: string;
  inquiryId?: string;
  error?: string;
}

export async function handleFacilityInquirySubmit(
  formData: FormData
): Promise<FacilitySubmitResult> {
  try {
    const facilityName = (formData.get("facilityName") as string)?.trim();
    const contactName = (formData.get("contactName") as string)?.trim();
    const contactTitle = (formData.get("contactTitle") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const phone = (formData.get("phone") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const state = (formData.get("state") as string)?.trim();
    const facilityType = (formData.get("facilityType") as string)?.trim() || "Acute Care Hospital";
    const staffingNeeds = (formData.get("staffingNeeds") as string)?.trim();
    const urgency = (formData.get("urgency") as string)?.trim() || "Standard (2-4 Weeks)";
    const details = (formData.get("details") as string)?.trim() || "";

    // Server-side validation
    if (!facilityName || facilityName.length < 2) {
      return { success: false, error: "Please enter your facility or health system name." };
    }
    if (!contactName || contactName.length < 2) {
      return { success: false, error: "Please provide the primary contact name." };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please enter a valid business email address." };
    }
    if (!phone || phone.length < 10) {
      return { success: false, error: "Please enter a valid direct contact telephone number." };
    }
    if (!city) {
      return { success: false, error: "Please specify the facility city." };
    }
    if (!state) {
      return { success: false, error: "Please specify the facility state." };
    }
    if (!staffingNeeds) {
      return { success: false, error: "Please select your primary staffing requirement." };
    }

    const savedInquiry = await submitFacilityInquiry({
      facilityName,
      contactName,
      contactTitle: contactTitle || undefined,
      email,
      phone,
      city,
      state,
      facilityType,
      staffingNeeds,
      urgency,
      details: details || undefined,
    });

    // Notify clinical accounts team (dispatches if EMAIL_PROVIDER_API_KEY configured, logs safely if not)
    await sendNotificationEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || "leads@idealhealthcarestaffing.com",
      subject: `New Facility Staffing Order: ${facilityName} (${city}, ${state})`,
      html: `<h2>New Healthcare Facility Staffing Request</h2>
<p><strong>Facility:</strong> ${facilityName}</p>
<p><strong>Contact:</strong> ${contactName} (${contactTitle || "N/A"})</p>
<p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
<p><strong>Location:</strong> ${city}, ${state}</p>
<p><strong>Facility Type:</strong> ${facilityType}</p>
<p><strong>Staffing Needs:</strong> ${staffingNeeds}</p>
<p><strong>Urgency:</strong> ${urgency}</p>
<p><strong>Details:</strong> ${details || "None provided"}</p>
<p><strong>Reference ID:</strong> ${savedInquiry.id}</p>`,
    });

    return {
      success: true,
      inquiryId: savedInquiry.id,
      message: "Thank you for reaching out to Ideal Healthcare Staffing. Your inquiry has been routed to our clinical client accounts team. A staffing coordinator will contact you to discuss coverage specifications.",
    };
  } catch (err) {
    console.error("Facility inquiry submission error:", err);
    return {
      success: false,
      error: "Unable to process staffing inquiry at this time. Please try again or reach our facility services desk directly.",
    };
  }
}
