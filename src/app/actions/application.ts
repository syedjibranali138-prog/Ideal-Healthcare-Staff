"use server";

import { submitApplication } from "@/lib/db";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase";
import { sendNotificationEmail } from "@/lib/email";

export interface ApplicationSubmitResult {
  success: boolean;
  message?: string;
  applicationId?: string;
  error?: string;
}

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function handleApplicationSubmit(
  formData: FormData
): Promise<ApplicationSubmitResult> {
  try {
    const jobId = (formData.get("jobId") as string) || "";
    const jobTitle = (formData.get("jobTitle") as string) || "General Application";
    const fullName = (formData.get("fullName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const phone = (formData.get("phone") as string)?.trim();
    const specialty = (formData.get("specialty") as string)?.trim();
    const yearsOfExperience = (formData.get("yearsOfExperience") as string)?.trim();
    const primaryLicenseState = (formData.get("primaryLicenseState") as string)?.trim();
    const coverNote = (formData.get("coverNote") as string)?.trim() || "";
    const consent = formData.get("consent");

    // Server-side validations
    if (!fullName || fullName.length < 2) {
      return { success: false, error: "Please enter your full legal name." };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: "Please provide a valid email address." };
    }
    if (!phone || phone.length < 10) {
      return { success: false, error: "Please enter a valid telephone number." };
    }
    if (!specialty) {
      return { success: false, error: "Please select your primary clinical specialty." };
    }
    if (!yearsOfExperience) {
      return { success: false, error: "Please specify your years of clinical experience." };
    }
    if (!consent) {
      return { success: false, error: "You must acknowledge and agree to the applicant privacy terms." };
    }

    // Handle resume file upload
    const resumeFile = formData.get("resume") as File | null;
    let resumeUrl = "";
    let resumeFilename = "";

    if (resumeFile && resumeFile.size > 0) {
      // Validate file size
      if (resumeFile.size > MAX_FILE_SIZE) {
        return { success: false, error: "Resume file size exceeds the 5MB maximum limit." };
      }

      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
        return {
          success: false,
          error: "Invalid file format. Please upload a PDF, DOC, or DOCX document.",
        };
      }

      resumeFilename = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");

      // Secure upload to private Supabase Storage if configured
      if (isSupabaseAdminConfigured()) {
        const adminClient = getSupabaseAdmin();
        if (adminClient) {
          const fileBuffer = await resumeFile.arrayBuffer();
          const storagePath = `resumes/${jobId || "general"}/${Date.now()}_${resumeFilename}`;
          const { data: uploadData, error: uploadError } = await adminClient.storage
            .from("resumes")
            .upload(storagePath, Buffer.from(fileBuffer), {
              contentType: resumeFile.type,
              upsert: false,
            });

          if (!uploadError && uploadData) {
            resumeUrl = uploadData.path;
          } else {
            console.warn("Supabase private bucket upload warning:", uploadError);
            resumeUrl = `private-storage/${storagePath}`;
          }
        }
      } else {
        // Fallback reference path for staging/dev without active AWS S3/Supabase storage
        resumeUrl = `resumes/local/${Date.now()}_${resumeFilename}`;
      }
    }

    // Persist to database
    const savedApp = await submitApplication({
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      specialty,
      yearsOfExperience,
      primaryLicenseState: primaryLicenseState || undefined,
      resumeUrl: resumeUrl || undefined,
      resumeFilename: resumeFilename || undefined,
      coverNote: coverNote || undefined,
      consentGiven: true,
    });

    // Send notification email (dispatches via provider if configured, logs in dev/staging)
    await sendNotificationEmail({
      to: process.env.ADMIN_NOTIFICATION_EMAIL || "leads@idealhealthcarestaffing.com",
      subject: `New Candidate Application: ${fullName} (${specialty})`,
      html: `<h2>New Candidate Application Received</h2>
<p><strong>Position:</strong> ${jobTitle}</p>
<p><strong>Candidate:</strong> ${fullName}</p>
<p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
<p><strong>Specialty:</strong> ${specialty} | <strong>Experience:</strong> ${yearsOfExperience}</p>
<p><strong>License State:</strong> ${primaryLicenseState || "N/A"}</p>
<p><strong>Resume File:</strong> ${resumeFilename || "None uploaded"}</p>
<p><strong>Cover Note:</strong> ${coverNote || "None"}</p>
<p><strong>Application ID:</strong> ${savedApp.id}</p>`,
    });

    return {
      success: true,
      applicationId: savedApp.id,
      message: "Application submitted successfully. A healthcare recruitment specialist will review your credentials promptly.",
    };
  } catch (err: any) {
    console.error("Application submission server error:", err);
    return {
      success: false,
      error: "An unexpected error occurred while processing your application. Please try again or contact our clinical team directly.",
    };
  }
}
