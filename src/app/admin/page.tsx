import type { Metadata } from "next";
import { getAdminSession } from "@/app/actions/admin";
import { getAllJobsAdmin, getApplications, getFacilityInquiries, getDataLayerStatus, getStaffUsers } from "@/lib/db";
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
  const session = await getAdminSession();

  if (!session) {
    return <AdminLoginForm />;
  }

  const [jobs, applications, inquiries, dataLayerStatus, staffUsers] = await Promise.all([
    getAllJobsAdmin(),
    getApplications(),
    getFacilityInquiries(),
    getDataLayerStatus(),
    session.role === "super_admin" ? getStaffUsers() : Promise.resolve([]),
  ]);

  return (
    <AdminDashboardClient
      session={session}
      initialJobs={jobs}
      initialApplications={applications}
      initialInquiries={inquiries}
      initialStaffUsers={staffUsers}
      dataLayerStatus={dataLayerStatus}
    />
  );
}
