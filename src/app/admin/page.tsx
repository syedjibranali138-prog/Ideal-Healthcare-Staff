import type { Metadata } from "next";
import { checkAdminAuth } from "@/app/actions/admin";
import { getAllJobsAdmin, getApplications, getFacilityInquiries } from "@/lib/db";
import AdminDashboardClient from "./AdminDashboardClient";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Staffing Operations & Admin Portal | Ideal Healthcare Staffing",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    return <AdminLoginForm />;
  }

  const [jobs, applications, inquiries] = await Promise.all([
    getAllJobsAdmin(),
    getApplications(),
    getFacilityInquiries(),
  ]);

  return (
    <AdminDashboardClient
      initialJobs={jobs}
      initialApplications={applications}
      initialInquiries={inquiries}
    />
  );
}
