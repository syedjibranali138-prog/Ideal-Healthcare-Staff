"use server";

import { cookies } from "next/headers";
import { 
  createJob, 
  updateJobStatus, 
  updateApplicationStatus, 
  updateFacilityInquiryStatus,
  getAllJobsAdmin,
  getApplications,
  getFacilityInquiries
} from "@/lib/db";
import { Job, ApplicationStatus, FacilityInquiryStatus } from "@/types";

const ADMIN_COOKIE_NAME = "ihs_admin_session";
const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || "ideal2025!";

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === "authenticated";
}

export async function adminLogin(password: string): Promise<{ success: boolean; error?: string }> {
  if (password === EXPECTED_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Invalid administrative credentials." };
}

export async function adminLogout(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}

export async function adminCreateJob(formData: FormData): Promise<{ success: boolean; error?: string; job?: Job }> {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    const title = (formData.get("title") as string)?.trim();
    const department = (formData.get("department") as any) || "Nursing";
    const specialty = (formData.get("specialty") as string)?.trim();
    const locationCity = (formData.get("locationCity") as string)?.trim();
    const locationState = (formData.get("locationState") as string)?.trim().toUpperCase();
    const employmentType = (formData.get("employmentType") as any) || "Travel Contract";
    const shift = (formData.get("shift") as string)?.trim() || "12-Hour Days (3x12)";
    const durationWeeks = parseInt(formData.get("durationWeeks") as string) || 13;
    const payRange = (formData.get("payRange") as string)?.trim() || undefined;
    const description = (formData.get("description") as string)?.trim();
    const status = (formData.get("status") as any) || "published";
    const isUrgent = formData.get("isUrgent") === "true";

    const responsibilitiesRaw = (formData.get("responsibilities") as string) || "";
    const qualificationsRaw = (formData.get("qualifications") as string) || "";
    const benefitsRaw = (formData.get("benefits") as string) || "";

    if (!title || !specialty || !locationCity || !locationState || !description) {
      return { success: false, error: "Required fields missing." };
    }

    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${locationCity.toLowerCase()}-${locationState.toLowerCase()}-${Date.now().toString().slice(-4)}`;

    const job = await createJob({
      slug,
      title,
      department,
      specialty,
      locationCity,
      locationState,
      employmentType,
      shift,
      durationWeeks,
      payRange,
      description,
      responsibilities: responsibilitiesRaw.split("\n").map(s => s.trim()).filter(Boolean),
      qualifications: qualificationsRaw.split("\n").map(s => s.trim()).filter(Boolean),
      benefits: benefitsRaw.split("\n").map(s => s.trim()).filter(Boolean),
      status,
      isUrgent,
    });

    return { success: true, job };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to create job." };
  }
}

export async function adminSetJobStatus(id: string, status: Job["status"]): Promise<{ success: boolean; error?: string }> {
  const isAuth = await checkAdminAuth();
  if (!isAuth) return { success: false, error: "Unauthorized access." };

  const updated = await updateJobStatus(id, status);
  if (!updated) return { success: false, error: "Job not found." };
  return { success: true };
}

export async function adminSetApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await checkAdminAuth();
  if (!isAuth) return { success: false, error: "Unauthorized access." };

  const updated = await updateApplicationStatus(id, status, notes);
  if (!updated) return { success: false, error: "Application not found." };
  return { success: true };
}

export async function adminSetInquiryStatus(
  id: string,
  status: FacilityInquiryStatus,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const isAuth = await checkAdminAuth();
  if (!isAuth) return { success: false, error: "Unauthorized access." };

  const updated = await updateFacilityInquiryStatus(id, status, notes);
  if (!updated) return { success: false, error: "Facility inquiry not found." };
  return { success: true };
}

export async function adminImportCsvJobs(
  rows: Array<{
    title: string;
    department?: string;
    specialty: string;
    city: string;
    state: string;
    employment_type?: string;
    shift?: string;
    pay_range?: string;
    description: string;
  }>
): Promise<{ imported: number; failed: number; errors: string[] }> {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return { imported: 0, failed: rows.length, errors: ["Unauthorized admin session."] };
  }

  let imported = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row.title || !row.specialty || !row.city || !row.state || !row.description) {
      failed++;
      errors.push(`Row ${i + 1}: Missing required field (Title, Specialty, City, State, or Description).`);
      continue;
    }

    try {
      const slug = `${row.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${row.city.toLowerCase()}-${row.state.toLowerCase()}-${Date.now().toString().slice(-4)}-${i}`;
      await createJob({
        slug,
        title: row.title.trim(),
        department: (row.department as any) || "Nursing",
        specialty: row.specialty.trim(),
        locationCity: row.city.trim(),
        locationState: row.state.trim().toUpperCase(),
        employmentType: (row.employment_type as any) || "Travel Contract",
        shift: row.shift?.trim() || "12-Hour Day/Night Variable",
        durationWeeks: 13,
        payRange: row.pay_range?.trim(),
        description: row.description.trim(),
        responsibilities: [
          "Execute acute clinical care per hospital protocols.",
          "Coordinate patient care plans with multidisciplinary clinicians.",
          "Maintain accurate electronic medical records.",
        ],
        qualifications: [
          `Active state license in ${row.state.toUpperCase()} or Multi-State Compact.`,
          "AHA BLS / ACLS certifications as applicable.",
          "Minimum 1-2 years specialty experience.",
        ],
        benefits: [
          "Competitive weekly pay package with tax-free travel stipends.",
          "Day-one comprehensive health, dental, and vision insurance.",
        ],
        status: "published",
        isUrgent: false,
      });
      imported++;
    } catch (e: any) {
      failed++;
      errors.push(`Row ${i + 1} (${row.title}): ${e?.message || "Import error"}`);
    }
  }

  return { imported, failed, errors };
}
