"use server";

import { cookies } from "next/headers";
import {
  createJob,
  updateJobStatus,
  updateApplicationStatus,
  updateFacilityInquiryStatus,
  getAllJobsAdmin,
  getApplications,
  getFacilityInquiries,
  getStaffUsers,
  getStaffUserById,
  getStaffUserByEmail,
  createStaffUser,
  updateStaffUser,
  deleteStaffUser
} from "@/lib/db";
import {
  Job,
  ApplicationStatus,
  FacilityInquiryStatus,
  StaffUser,
  StaffPermissions,
  AdminRole,
  AdminSession
} from "@/types";

const ADMIN_COOKIE_NAME = "ihs_admin_session";
const isProduction = process.env.NODE_ENV === "production";
const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || (!isProduction ? "ideal2025!" : undefined);

const SUPER_ADMIN_PERMISSIONS: StaffPermissions = {
  dashboard: true,
  jobs: { view: true, create: true, edit: true, delete: true },
  applications: { view: true, edit: true, delete: true },
  facilities: { view: true, edit: true, delete: true },
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  if (!session || !session.value) return null;

  if (session.value === "authenticated") {
    return {
      role: "super_admin",
      name: "Super Administrator",
      email: "admin@idealhealthcarestaffing.com",
      permissions: SUPER_ADMIN_PERMISSIONS,
    };
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(session.value));
    if (parsed && (parsed.role === "super_admin" || parsed.role === "staff_admin")) {
      if (parsed.role === "staff_admin" && parsed.staffId) {
        const liveStaff = await getStaffUserById(parsed.staffId);
        if (!liveStaff || !liveStaff.isActive) {
          // Immediately invalidate session if deactivated or deleted
          return null;
        }
        // Keep permissions synced with live record
        parsed.permissions = liveStaff.permissions;
      }
      return parsed;
    }
  } catch (e) {
    // Invalid or corrupted session
  }

  return null;
}

export async function checkAdminAuth(): Promise<boolean> {
  const session = await getAdminSession();
  return Boolean(session);
}

export async function adminLogin(
  password: string,
  email?: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  const cleanEmail = email?.trim().toLowerCase();
  const cleanPass = password?.trim();

  if (!cleanPass) {
    return { success: false, error: "Password or passcode is required." };
  }

  // Prevent default testing passwords in production
  if (isProduction && (cleanPass === "ideal2025!" || cleanPass === "staff2025!")) {
    return {
      success: false,
      error: "Default testing credentials ('ideal2025!', 'staff2025!') are disabled in production. Please use your configured production credentials."
    };
  }

  // 1. Super Admin Passcode Check
  if (!cleanEmail || cleanEmail === "admin" || cleanEmail.includes("admin@")) {
    if (!EXPECTED_PASSWORD) {
      return {
        success: false,
        error: "Super Admin password is not configured on this server. Set the ADMIN_PASSWORD environment variable in your production hosting settings."
      };
    }

    if (cleanPass === EXPECTED_PASSWORD) {
      const superSession: AdminSession = {
        role: "super_admin",
        name: "Super Administrator",
        email: "admin@idealhealthcarestaffing.com",
        permissions: SUPER_ADMIN_PERMISSIONS,
      };

      const cookieStore = await cookies();
      cookieStore.set(ADMIN_COOKIE_NAME, encodeURIComponent(JSON.stringify(superSession)), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return { success: true, session: superSession };
    }
    if (!cleanEmail) {
      return { success: false, error: "Invalid administrative passcode." };
    }
  }

  // 2. Staff Admin Account Check
  if (cleanEmail) {
    const staffUser = await getStaffUserByEmail(cleanEmail);
    if (!staffUser) {
      return { success: false, error: "No staff account found with this email." };
    }

    if (!staffUser.isActive) {
      return { success: false, error: "This staff account has been deactivated by Super Admin." };
    }

    if (staffUser.password && staffUser.password !== cleanPass) {
      return { success: false, error: "Incorrect password for this staff account." };
    }

    const staffSession: AdminSession = {
      role: staffUser.role,
      name: staffUser.name,
      email: staffUser.email,
      staffId: staffUser.id,
      permissions: staffUser.permissions,
    };

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, encodeURIComponent(JSON.stringify(staffSession)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return { success: true, session: staffSession };
  }

  return { success: false, error: "Invalid credentials." };
}

export async function adminLogout(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return { success: true };
}

export async function adminCreateJob(formData: FormData): Promise<{ success: boolean; error?: string; job?: Job; isPersisted?: boolean }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized session. Please log in." };
  }

  if (session.role !== "super_admin" && !session.permissions?.jobs?.create) {
    return { success: false, error: "Permission denied: Staff Admin cannot create jobs." };
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

    return { success: true, job, isPersisted: Boolean(job.isPersisted) };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to create job." };
  }
}

export async function adminSetJobStatus(id: string, status: Job["status"]): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "Unauthorized session." };

  if (session.role !== "super_admin" && !session.permissions?.jobs?.edit) {
    return { success: false, error: "Permission denied: Staff Admin cannot edit jobs." };
  }

  const updated = await updateJobStatus(id, status);
  if (!updated) return { success: false, error: "Job not found." };
  return { success: true };
}

export async function adminSetApplicationStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "Unauthorized session." };

  if (session.role !== "super_admin" && !session.permissions?.applications?.edit) {
    return { success: false, error: "Permission denied: Staff Admin cannot update applications." };
  }

  const updated = await updateApplicationStatus(id, status, notes);
  if (!updated) return { success: false, error: "Application not found." };
  return { success: true };
}

export async function adminSetInquiryStatus(
  id: string,
  status: FacilityInquiryStatus,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "Unauthorized session." };

  if (session.role !== "super_admin" && !session.permissions?.facilities?.edit) {
    return { success: false, error: "Permission denied: Staff Admin cannot update facility orders." };
  }

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
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { imported: 0, failed: rows.length, errors: ["Unauthorized: CSV Import requires Super Admin access."] };
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

// ====================================================================
// STAFF MANAGEMENT ACTIONS (SUPER ADMIN ONLY)
// ====================================================================

export async function adminGetStaffUsers(): Promise<{ success: boolean; staff?: StaffUser[]; error?: string }> {
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Unauthorized: Requires Super Admin access." };
  }

  const staff = await getStaffUsers();
  return { success: true, staff };
}

export async function adminCreateStaffUser(data: {
  name: string;
  email: string;
  password?: string;
  permissions: StaffPermissions;
}): Promise<{ success: boolean; staff?: StaffUser; error?: string }> {
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Unauthorized: Requires Super Admin access." };
  }

  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();

  if (!name || !email || !email.includes("@")) {
    return { success: false, error: "Valid staff name and email are required." };
  }

  const existing = await getStaffUserByEmail(email);
  if (existing) {
    return { success: false, error: "A staff account with this email already exists." };
  }

  const cleanPassword = data.password?.trim();
  if (!cleanPassword || cleanPassword.length < 8) {
    return { success: false, error: "Staff account requires a secure password of at least 8 characters." };
  }

  if (isProduction && (cleanPassword === "staff2025!" || cleanPassword === "ideal2025!")) {
    return { success: false, error: "Default testing passwords ('staff2025!', 'ideal2025!') are prohibited in production." };
  }

  try {
    const newStaff = await createStaffUser({
      name,
      email,
      password: cleanPassword,
      role: "staff_admin",
      isActive: true,
      permissions: data.permissions,
    });
    return { success: true, staff: newStaff };
  } catch (e: any) {
    return { success: false, error: e?.message || "Failed to create staff account." };
  }
}

export async function adminUpdateStaffPermissions(
  id: string,
  permissions: StaffPermissions
): Promise<{ success: boolean; staff?: StaffUser; error?: string }> {
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Unauthorized: Requires Super Admin access." };
  }

  const updated = await updateStaffUser(id, { permissions });
  if (!updated) return { success: false, error: "Staff account not found." };
  return { success: true, staff: updated };
}

export async function adminToggleStaffActive(
  id: string,
  isActive: boolean
): Promise<{ success: boolean; staff?: StaffUser; error?: string }> {
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Unauthorized: Requires Super Admin access." };
  }

  const updated = await updateStaffUser(id, { isActive });
  if (!updated) return { success: false, error: "Staff account not found." };
  return { success: true, staff: updated };
}

export async function adminResetStaffPassword(
  id: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Unauthorized: Requires Super Admin access." };
  }

  const cleanPass = newPassword?.trim();
  if (!cleanPass || cleanPass.length < 8) {
    return { success: false, error: "Password must be at least 8 characters long." };
  }

  if (isProduction && (cleanPass === "staff2025!" || cleanPass === "ideal2025!")) {
    return { success: false, error: "Default testing passwords ('staff2025!', 'ideal2025!') cannot be assigned in production." };
  }

  const updated = await updateStaffUser(id, { password: cleanPass });
  if (!updated) return { success: false, error: "Staff account not found." };
  return { success: true };
}

export async function adminDeleteStaffUser(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session || session.role !== "super_admin") {
    return { success: false, error: "Unauthorized: Requires Super Admin access." };
  }

  const ok = await deleteStaffUser(id);
  return { success: ok };
}
