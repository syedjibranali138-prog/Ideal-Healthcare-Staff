import { Job, Application, FacilityInquiry, JobAlert, JobFiltersState, ApplicationStatus, FacilityInquiryStatus } from "@/types";
import { INITIAL_JOBS } from "./constants";
import { supabase, getSupabaseAdmin, isSupabaseConfigured, isSupabaseAdminConfigured } from "./supabase";

// In-memory fallback stores for when Supabase is not yet configured or during development
let fallbackJobs: Job[] = [...INITIAL_JOBS];
let fallbackApplications: Application[] = [
  {
    id: "app-seed-01",
    jobId: "job-001",
    jobTitle: "Registered Nurse - Intensive Care Unit (ICU)",
    fullName: "Sarah Jenkins, BSN, RN",
    email: "sarah.jenkins.rn@example.com",
    phone: "(214) 555-0194",
    specialty: "ICU / Critical Care RN",
    yearsOfExperience: "5-7 Years",
    primaryLicenseState: "TX",
    resumeFilename: "Jenkins_Sarah_ICU_Resume.pdf",
    resumeUrl: "/uploads/mock-resume-sample.pdf",
    coverNote: "Experienced CVICU/ICU nurse looking for Dallas contract. Available for immediate credentialing.",
    consentGiven: true,
    status: "new",
    adminNotes: "Holds active TX compact license. BLS, ACLS, CCRN verified.",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "app-seed-02",
    jobId: "job-002",
    jobTitle: "Registered Nurse - Emergency Department",
    fullName: "Marcus Rivera, RN",
    email: "mrivera.er@example.com",
    phone: "(404) 555-0382",
    specialty: "Emergency Room (ER) RN",
    yearsOfExperience: "3-5 Years",
    primaryLicenseState: "GA",
    resumeFilename: "Marcus_Rivera_ER_2025.pdf",
    resumeUrl: "/uploads/mock-resume-sample.pdf",
    coverNote: "Emergency room nurse with Level I trauma center background. Ready to start next month.",
    consentGiven: true,
    status: "contacted",
    adminNotes: "Phone screening conducted. High candidate interest.",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

let fallbackFacilityInquiries: FacilityInquiry[] = [
  {
    id: "inq-seed-01",
    facilityName: "Metroplex Medical Center",
    contactName: "David Vance",
    contactTitle: "Director of Clinical Nursing Staffing",
    email: "dvance@metroplexhealth.org",
    phone: "(214) 555-0820",
    city: "Dallas",
    state: "TX",
    facilityType: "Acute Care Hospital",
    staffingNeeds: "Travel Registered Nurses (13-Week Contracts)",
    urgency: "Immediate / Crisis (24-48 hrs)",
    details: "Need 6 ICU and 4 Med/Surg night-shift nurses due to upcoming expansion. Seeking rapid credentialing.",
    status: "in_discussion",
    adminNotes: "Sent master staffing agreement draft on Tuesday. Follow up on Thursday.",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "inq-seed-02",
    facilityName: "Piedmont Surgical Pavilion",
    contactName: "Elena Thorne",
    contactTitle: "Chief Operating Officer",
    email: "ethorne@piedmontsurgical.org",
    phone: "(404) 555-4921",
    city: "Atlanta",
    state: "GA",
    facilityType: "Ambulatory Surgery Center (ASC)",
    staffingNeeds: "Allied Health & Diagnostic Imaging",
    urgency: "Standard (2-4 Weeks)",
    details: "Looking for 2 OR circulators and 1 Surgical Tech for block time coverage.",
    status: "new",
    adminNotes: "Reviewing local candidate pool for match.",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

let fallbackJobAlerts: JobAlert[] = [];

// ====================================================================
// JOBS
// ====================================================================

export async function getJobs(filters?: Partial<JobFiltersState>): Promise<{ jobs: Job[]; total: number }> {
  // If Supabase is configured, fetch from database
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from("jobs").select("*", { count: "exact" }).eq("status", "published");

      if (filters?.department && filters.department !== "all") {
        query = query.eq("department", filters.department);
      }
      if (filters?.specialty && filters.specialty !== "all") {
        query = query.eq("specialty", filters.specialty);
      }
      if (filters?.state && filters.state !== "all") {
        query = query.eq("location_state", filters.state);
      }
      if (filters?.employmentType && filters.employmentType !== "all") {
        query = query.eq("employment_type", filters.employmentType);
      }
      if (filters?.search && filters.search.trim() !== "") {
        const term = filters.search.trim().toLowerCase();
        query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%,specialty.ilike.%${term}%,location_city.ilike.%${term}%`);
      }

      if (filters?.sortBy === "pay") {
        query = query.order("pay_range", { ascending: false });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, count, error } = await query;
      if (!error && data) {
        const mapped: Job[] = data.map((d: any) => ({
          id: d.id,
          slug: d.slug,
          title: d.title,
          department: d.department,
          specialty: d.specialty,
          locationCity: d.location_city,
          locationState: d.location_state,
          employmentType: d.employment_type,
          shift: d.shift,
          durationWeeks: d.duration_weeks,
          payRange: d.pay_range,
          description: d.description,
          responsibilities: d.responsibilities || [],
          qualifications: d.qualifications || [],
          benefits: d.benefits || [],
          status: d.status,
          isUrgent: d.is_urgent,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }));
        return { jobs: mapped, total: count || mapped.length };
      }
    } catch (err) {
      console.warn("Supabase query error, falling back to local dataset:", err);
    }
  }

  // Fallback in-memory querying
  let list = fallbackJobs.filter((j) => j.status === "published");

  const deptFilter = filters?.department;
  if (deptFilter && deptFilter !== "all") {
    list = list.filter((j) => j.department.toLowerCase() === deptFilter.toLowerCase());
  }
  const specFilter = filters?.specialty;
  if (specFilter && specFilter !== "all") {
    list = list.filter((j) => j.specialty.toLowerCase() === specFilter.toLowerCase());
  }
  const stateFilter = filters?.state;
  if (stateFilter && stateFilter !== "all") {
    list = list.filter((j) => j.locationState.toUpperCase() === stateFilter.toUpperCase());
  }
  const empFilter = filters?.employmentType;
  if (empFilter && empFilter !== "all") {
    list = list.filter((j) => j.employmentType.toLowerCase() === empFilter.toLowerCase());
  }
  if (filters?.search && filters.search.trim() !== "") {
    const term = filters.search.trim().toLowerCase();
    list = list.filter(
      (j) =>
        j.title.toLowerCase().includes(term) ||
        j.specialty.toLowerCase().includes(term) ||
        j.locationCity.toLowerCase().includes(term) ||
        j.locationState.toLowerCase().includes(term) ||
        j.description.toLowerCase().includes(term)
    );
  }

  if (filters?.sortBy === "pay") {
    list.sort((a, b) => (b.payRange || "").localeCompare(a.payRange || ""));
  } else {
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return { jobs: list, total: list.length };
}

export async function getAllJobsAdmin(): Promise<Job[]> {
  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      const { data, error } = await adminClient.from("jobs").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          slug: d.slug,
          title: d.title,
          department: d.department,
          specialty: d.specialty,
          locationCity: d.location_city,
          locationState: d.location_state,
          employmentType: d.employment_type,
          shift: d.shift,
          durationWeeks: d.duration_weeks,
          payRange: d.pay_range,
          description: d.description,
          responsibilities: d.responsibilities || [],
          qualifications: d.qualifications || [],
          benefits: d.benefits || [],
          status: d.status,
          isUrgent: d.is_urgent,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }));
      }
    }
  }
  return [...fallbackJobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from("jobs").select("*").eq("slug", slug).single();
      if (!error && data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          department: data.department,
          specialty: data.specialty,
          locationCity: data.location_city,
          locationState: data.location_state,
          employmentType: data.employment_type,
          shift: data.shift,
          durationWeeks: data.duration_weeks,
          payRange: data.pay_range,
          description: data.description,
          responsibilities: data.responsibilities || [],
          qualifications: data.qualifications || [],
          benefits: data.benefits || [],
          status: data.status,
          isUrgent: data.is_urgent,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (e) {
      console.warn("Error fetching job by slug from Supabase:", e);
    }
  }
  const found = fallbackJobs.find((j) => j.slug === slug);
  return found || null;
}

export async function getJobById(id: string): Promise<Job | null> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single();
      if (!error && data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          department: data.department,
          specialty: data.specialty,
          locationCity: data.location_city,
          locationState: data.location_state,
          employmentType: data.employment_type,
          shift: data.shift,
          durationWeeks: data.duration_weeks,
          payRange: data.pay_range,
          description: data.description,
          responsibilities: data.responsibilities || [],
          qualifications: data.qualifications || [],
          benefits: data.benefits || [],
          status: data.status,
          isUrgent: data.is_urgent,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (e) {
      console.warn("Error fetching job by id from Supabase:", e);
    }
  }
  const found = fallbackJobs.find((j) => j.id === id);
  return found || null;
}

export async function createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job> {
  const newJob: Job = {
    ...jobData,
    id: `job-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      const { data, error } = await adminClient.from("jobs").insert({
        slug: newJob.slug,
        title: newJob.title,
        department: newJob.department,
        specialty: newJob.specialty,
        location_city: newJob.locationCity,
        location_state: newJob.locationState,
        employment_type: newJob.employmentType,
        shift: newJob.shift,
        duration_weeks: newJob.durationWeeks,
        pay_range: newJob.payRange,
        description: newJob.description,
        responsibilities: newJob.responsibilities,
        qualifications: newJob.qualifications,
        benefits: newJob.benefits,
        status: newJob.status,
        is_urgent: newJob.isUrgent,
      }).select().single();

      if (!error && data) {
        return {
          ...newJob,
          id: data.id,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    }
  }

  fallbackJobs.unshift(newJob);
  return newJob;
}

export async function updateJobStatus(id: string, status: Job["status"]): Promise<Job | null> {
  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      const { data, error } = await adminClient
        .from("jobs")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          slug: data.slug,
          title: data.title,
          department: data.department,
          specialty: data.specialty,
          locationCity: data.location_city,
          locationState: data.location_state,
          employmentType: data.employment_type,
          shift: data.shift,
          durationWeeks: data.duration_weeks,
          payRange: data.pay_range,
          description: data.description,
          responsibilities: data.responsibilities || [],
          qualifications: data.qualifications || [],
          benefits: data.benefits || [],
          status: data.status,
          isUrgent: data.is_urgent,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    }
  }

  const job = fallbackJobs.find((j) => j.id === id);
  if (job) {
    job.status = status;
    job.updatedAt = new Date().toISOString();
    return job;
  }
  return null;
}

// ====================================================================
// APPLICATIONS
// ====================================================================

export async function submitApplication(
  data: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">
): Promise<Application> {
  const newApp: Application = {
    ...data,
    id: `app-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const isUuid = Boolean(data.jobId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.jobId));
      const { data: dbData, error } = await supabase.from("applications").insert({
        job_id: isUuid ? data.jobId : null,
        job_title: data.jobTitle,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        specialty: data.specialty,
        years_of_experience: data.yearsOfExperience,
        primary_license_state: data.primaryLicenseState,
        resume_url: data.resumeUrl,
        resume_filename: data.resumeFilename,
        cover_note: data.coverNote,
        consent_given: data.consentGiven,
        status: "new",
      }).select().single();

      if (!error && dbData) {
        return {
          ...newApp,
          id: dbData.id,
          createdAt: dbData.created_at,
          updatedAt: dbData.updated_at,
        };
      }
    } catch (e) {
      console.warn("Error inserting application to Supabase, saving locally:", e);
    }
  }

  fallbackApplications.unshift(newApp);
  return newApp;
}

export async function getApplications(statusFilter?: string): Promise<Application[]> {
  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      let query = adminClient.from("applications").select("*").order("created_at", { ascending: false });
      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      const { data, error } = await query;
      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          jobId: d.job_id,
          jobTitle: d.job_title,
          fullName: d.full_name,
          email: d.email,
          phone: d.phone,
          specialty: d.specialty,
          yearsOfExperience: d.years_of_experience,
          primaryLicenseState: d.primary_license_state,
          resumeUrl: d.resume_url,
          resumeFilename: d.resume_filename,
          coverNote: d.cover_note,
          consentGiven: d.consent_given,
          status: d.status,
          adminNotes: d.admin_notes,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }));
      }
    }
  }

  let list = [...fallbackApplications];
  if (statusFilter && statusFilter !== "all") {
    list = list.filter((a) => a.status === statusFilter);
  }
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus,
  adminNotes?: string
): Promise<Application | null> {
  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      const updates: any = { status, updated_at: new Date().toISOString() };
      if (adminNotes !== undefined) updates.admin_notes = adminNotes;
      const { data, error } = await adminClient
        .from("applications")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          jobId: data.job_id,
          jobTitle: data.job_title,
          fullName: data.full_name,
          email: data.email,
          phone: data.phone,
          specialty: data.specialty,
          yearsOfExperience: data.years_of_experience,
          primaryLicenseState: data.primary_license_state,
          resumeUrl: data.resume_url,
          resumeFilename: data.resume_filename,
          coverNote: data.cover_note,
          consentGiven: data.consent_given,
          status: data.status,
          adminNotes: data.admin_notes,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    }
  }

  const app = fallbackApplications.find((a) => a.id === id);
  if (app) {
    app.status = status;
    if (adminNotes !== undefined) app.adminNotes = adminNotes;
    app.updatedAt = new Date().toISOString();
    return app;
  }
  return null;
}

// ====================================================================
// FACILITY INQUIRIES
// ====================================================================

export async function submitFacilityInquiry(
  data: Omit<FacilityInquiry, "id" | "createdAt" | "updatedAt" | "status">
): Promise<FacilityInquiry> {
  const newInq: FacilityInquiry = {
    ...data,
    id: `inq-${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data: dbData, error } = await supabase.from("facility_inquiries").insert({
        facility_name: data.facilityName,
        contact_name: data.contactName,
        contact_title: data.contactTitle,
        email: data.email,
        phone: data.phone,
        city: data.city,
        state: data.state,
        facility_type: data.facilityType,
        staffing_needs: data.staffingNeeds,
        urgency: data.urgency,
        details: data.details,
        status: "new",
      }).select().single();

      if (!error && dbData) {
        return {
          ...newInq,
          id: dbData.id,
          createdAt: dbData.created_at,
          updatedAt: dbData.updated_at,
        };
      }
    } catch (e) {
      console.warn("Error inserting facility inquiry to Supabase:", e);
    }
  }

  fallbackFacilityInquiries.unshift(newInq);
  return newInq;
}

export async function getFacilityInquiries(statusFilter?: string): Promise<FacilityInquiry[]> {
  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      let query = adminClient.from("facility_inquiries").select("*").order("created_at", { ascending: false });
      if (statusFilter && statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }
      const { data, error } = await query;
      if (!error && data) {
        return data.map((d: any) => ({
          id: d.id,
          facilityName: d.facility_name,
          contactName: d.contact_name,
          contactTitle: d.contact_title,
          email: d.email,
          phone: d.phone,
          city: d.city,
          state: d.state,
          facilityType: d.facility_type,
          staffingNeeds: d.staffing_needs,
          urgency: d.urgency,
          details: d.details,
          status: d.status,
          adminNotes: d.admin_notes,
          createdAt: d.created_at,
          updatedAt: d.updated_at,
        }));
      }
    }
  }

  let list = [...fallbackFacilityInquiries];
  if (statusFilter && statusFilter !== "all") {
    list = list.filter((i) => i.status === statusFilter);
  }
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateFacilityInquiryStatus(
  id: string,
  status: FacilityInquiryStatus,
  adminNotes?: string
): Promise<FacilityInquiry | null> {
  if (isSupabaseAdminConfigured()) {
    const adminClient = getSupabaseAdmin();
    if (adminClient) {
      const updates: any = { status, updated_at: new Date().toISOString() };
      if (adminNotes !== undefined) updates.admin_notes = adminNotes;
      const { data, error } = await adminClient
        .from("facility_inquiries")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        return {
          id: data.id,
          facilityName: data.facility_name,
          contactName: data.contact_name,
          contactTitle: data.contact_title,
          email: data.email,
          phone: data.phone,
          city: data.city,
          state: data.state,
          facilityType: data.facility_type,
          staffingNeeds: data.staffing_needs,
          urgency: data.urgency,
          details: data.details,
          status: data.status,
          adminNotes: data.admin_notes,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    }
  }

  const inq = fallbackFacilityInquiries.find((i) => i.id === id);
  if (inq) {
    inq.status = status;
    if (adminNotes !== undefined) inq.adminNotes = adminNotes;
    inq.updatedAt = new Date().toISOString();
    return inq;
  }
  return null;
}

// ====================================================================
// JOB ALERTS
// ====================================================================

export async function subscribeJobAlert(
  email: string,
  specialty?: string,
  state?: string,
  employmentType?: string
): Promise<{ success: boolean; message: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "A valid email address is required." };
  }

  const newAlert: JobAlert = {
    id: `alert-${Date.now()}`,
    email,
    specialty,
    state,
    employmentType,
    isActive: true,
    unsubscribeToken: Math.random().toString(36).substring(2, 15),
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from("job_alerts").insert({
        email,
        specialty,
        state,
        employment_type: employmentType,
        is_active: true,
      });
      if (error) {
        console.warn("Supabase alert insert error:", error);
      }
    } catch (e) {
      console.warn("Supabase alert exception:", e);
    }
  }

  fallbackJobAlerts.push(newAlert);
  return {
    success: true,
    message: "Thank you for subscribing. You will receive notifications when matching opportunities become available.",
  };
}
