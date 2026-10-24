"use client";

import { useState } from "react";
import { Job, Application, FacilityInquiry, ApplicationStatus, FacilityInquiryStatus } from "@/types";
import { 
  adminCreateJob, 
  adminSetJobStatus, 
  adminSetApplicationStatus, 
  adminSetInquiryStatus, 
  adminImportCsvJobs, 
  adminLogout 
} from "@/app/actions/admin";
import { DEPARTMENTS, SPECIALTIES, US_STATES, EMPLOYMENT_TYPES, FACILITY_TYPES } from "@/lib/constants";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Building2, 
  Upload, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Clock, 
  Sparkles,
  ExternalLink,
  Eye,
  X
} from "lucide-react";
import Link from "next/link";

interface AdminDashboardClientProps {
  initialJobs: Job[];
  initialApplications: Application[];
  initialInquiries: FacilityInquiry[];
}

export default function AdminDashboardClient({
  initialJobs,
  initialApplications,
  initialInquiries,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "jobs" | "applications" | "facilities" | "import">("overview");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [inquiries, setInquiries] = useState<FacilityInquiry[]>(initialInquiries);

  // Job form modal state
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [jobFormSubmitting, setJobFormSubmitting] = useState(false);
  const [jobFormError, setJobFormError] = useState<string | null>(null);

  // Search & Filter States
  const [jobSearch, setJobSearch] = useState("");
  const [jobStatusFilter, setJobStatusFilter] = useState("all");

  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("all");

  const [inqSearch, setInqSearch] = useState("");
  const [inqStatusFilter, setInqStatusFilter] = useState("all");

  // CSV Import State
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvParsedRows, setCsvParsedRows] = useState<any[]>([]);
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvReport, setCsvReport] = useState<{ imported: number; failed: number; errors: string[] } | null>(null);

  // Status message
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Job Creation Handler
  const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJobFormSubmitting(true);
    setJobFormError(null);

    const formData = new FormData(e.currentTarget);
    const res = await adminCreateJob(formData);

    setJobFormSubmitting(false);
    if (!res.success) {
      setJobFormError(res.error || "Failed to create job.");
    } else if (res.job) {
      setJobs([res.job, ...jobs]);
      setCreateJobModalOpen(false);
      showNotification(`Job position "${res.job.title}" created successfully.`);
    }
  };

  // Job Status Change
  const handleJobStatusChange = async (jobId: string, newStatus: Job["status"]) => {
    const res = await adminSetJobStatus(jobId, newStatus);
    if (res.success) {
      setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
      showNotification(`Job status updated to ${newStatus}.`);
    } else {
      alert("Error: " + res.error);
    }
  };

  // Application Status Change
  const handleAppStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    const res = await adminSetApplicationStatus(appId, newStatus);
    if (res.success) {
      setApplications(applications.map(a => a.id === appId ? { ...a, status: newStatus } : a));
      showNotification(`Application status updated to ${newStatus}.`);
    } else {
      alert("Error: " + res.error);
    }
  };

  // Inquiry Status Change
  const handleInquiryStatusChange = async (inqId: string, newStatus: FacilityInquiryStatus) => {
    const res = await adminSetInquiryStatus(inqId, newStatus);
    if (res.success) {
      setInquiries(inquiries.map(i => i.id === inqId ? { ...i, status: newStatus } : i));
      showNotification(`Inquiry status updated to ${newStatus}.`);
    } else {
      alert("Error: " + res.error);
    }
  };

  // CSV Parse Handler
  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvReport(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCsvFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) return;

        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
        if (lines.length <= 1) {
          alert("The uploaded CSV is empty or has only headers.");
          return;
        }

        const headers = lines[0].split(",").map(h => h.trim().toLowerCase().replace(/['"]/g, ""));
        const rows = lines.slice(1).map(line => {
          // simple csv row parser
          const values = line.split(",").map(v => v.trim().replace(/^["']|["']$/g, ""));
          const rowObj: any = {};
          headers.forEach((h, idx) => {
            rowObj[h] = values[idx] || "";
          });
          return rowObj;
        });

        setCsvParsedRows(rows);
      };
      reader.readAsText(file);
    }
  };

  // CSV Import Submit
  const handleExecuteImport = async () => {
    if (csvParsedRows.length === 0) return;
    setCsvImporting(true);
    setCsvReport(null);

    const res = await adminImportCsvJobs(csvParsedRows);
    setCsvImporting(false);
    setCsvReport(res);

    if (res.imported > 0) {
      showNotification(`Import complete. ${res.imported} jobs created.`);
      // Reload page state or update list
      window.location.reload();
    }
  };

  // CSV Exports
  const exportApplicationsCsv = () => {
    const headers = ["ID", "Candidate Name", "Email", "Phone", "Specialty", "Experience", "License State", "Status", "Created At"];
    const rows = applications.map(a => [
      a.id,
      `"${a.fullName}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.specialty}"`,
      `"${a.yearsOfExperience}"`,
      `"${a.primaryLicenseState || ""}"`,
      `"${a.status}"`,
      `"${a.createdAt}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadCsv(csvContent, `IHS_Applications_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const exportInquiriesCsv = () => {
    const headers = ["ID", "Facility Name", "Contact", "Email", "Phone", "Location", "Facility Type", "Staffing Need", "Status", "Created At"];
    const rows = inquiries.map(i => [
      i.id,
      `"${i.facilityName}"`,
      `"${i.contactName}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.city}, ${i.state}"`,
      `"${i.facilityType}"`,
      `"${i.staffingNeeds}"`,
      `"${i.status}"`,
      `"${i.createdAt}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    downloadCsv(csvContent, `IHS_Facility_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const downloadCsv = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Jobs
  const filteredJobs = jobs.filter(j => {
    const matchesSearch = !jobSearch || j.title.toLowerCase().includes(jobSearch.toLowerCase()) || j.specialty.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesStatus = jobStatusFilter === "all" || j.status === jobStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Applications
  const filteredApps = applications.filter(a => {
    const matchesSearch = !appSearch || a.fullName.toLowerCase().includes(appSearch.toLowerCase()) || a.specialty.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = appStatusFilter === "all" || a.status === appStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = !inqSearch || i.facilityName.toLowerCase().includes(inqSearch.toLowerCase()) || i.contactName.toLowerCase().includes(inqSearch.toLowerCase());
    const matchesStatus = inqStatusFilter === "all" || i.status === inqStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Top Admin Header */}
      <div className="bg-navy-950 text-white border-b border-navy-900 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
              IHS
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">
                Staffing Coordination & Operations Portal
              </h1>
              <p className="text-[11px] text-slate-400">
                Ideal Healthcare Staffing Administrative Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-300 hover:text-white flex items-center gap-1"
            >
              <span>View Public Site</span>
              <ExternalLink className="w-3 h-3 text-teal-400" />
            </Link>

            <button
              onClick={async () => {
                await adminLogout();
                window.location.reload();
              }}
              className="text-xs text-slate-300 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded border border-navy-800 hover:border-navy-700 bg-navy-900 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-900 text-white px-5 py-3 rounded-lg shadow-xl border border-teal-500/50 text-xs flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Admin Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex space-x-8 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === "overview"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-navy-950"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === "jobs"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-navy-950"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs Management ({jobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`py-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === "applications"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-navy-950"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidate Applications ({applications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("facilities")}
              className={`py-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === "facilities"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-navy-950"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Facility Orders ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("import")}
              className={`py-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === "import"
                  ? "border-teal-600 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-navy-950"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>CSV Job Import</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* ==================================================================== */}
        {/* TAB 1: OVERVIEW METRICS */}
        {/* ==================================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Published Jobs
                </span>
                <div className="mt-2 text-3xl font-extrabold text-navy-950">
                  {jobs.filter(j => j.status === "published").length}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Total listed: {jobs.length} positions
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Applications
                </span>
                <div className="mt-2 text-3xl font-extrabold text-teal-700">
                  {applications.length}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {applications.filter(a => a.status === "new").length} pending review
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Facility Inquiries
                </span>
                <div className="mt-2 text-3xl font-extrabold text-navy-900">
                  {inquiries.length}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {inquiries.filter(i => i.status === "new").length} new incoming orders
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Data Layer Status
                </span>
                <div className="mt-2 text-sm font-bold text-navy-950 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Production Ready</span>
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  PostgreSQL / Supabase Schema Active
                </div>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-base font-bold text-navy-950 mb-4">
                Operational Shortcuts
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveTab("jobs");
                    setCreateJobModalOpen(true);
                  }}
                  className="btn-accent text-xs px-4 py-2.5 flex items-center gap-1.5 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Job Opening</span>
                </button>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-1.5 font-semibold"
                >
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Review Pending Candidate Files</span>
                </button>
                <button
                  onClick={() => setActiveTab("facilities")}
                  className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-1.5 font-semibold"
                >
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span>Manage Facility Contracts</span>
                </button>
                <button
                  onClick={() => setActiveTab("import")}
                  className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-1.5 font-semibold"
                >
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Batch CSV Import</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: JOBS MANAGEMENT */}
        {/* ==================================================================== */}
        {activeTab === "jobs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-navy-950">Active Job Postings</h2>
                <p className="text-xs text-slate-500">Publish, unpublish, close, and manage hospital assignments.</p>
              </div>
              <button
                onClick={() => setCreateJobModalOpen(true)}
                className="btn-accent text-xs px-4 py-2.5 flex items-center gap-1.5 font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Job</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter jobs by title or specialty..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded border border-slate-300 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published Only</option>
                <option value="draft">Drafts Only</option>
                <option value="closed">Closed Only</option>
              </select>
            </div>

            {/* Jobs Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Title & Specialty</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Contract / Shift</th>
                    <th className="py-3 px-4">Pay Range</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4">
                        <Link href={`/jobs/${j.slug}`} target="_blank" className="font-bold text-navy-950 hover:text-teal-700">
                          {j.title}
                        </Link>
                        <div className="text-[11px] text-slate-500">{j.department} • {j.specialty}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium">
                        {j.locationCity}, {j.locationState}
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{j.employmentType}</div>
                        <div className="text-[11px] text-slate-400">{j.shift}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-navy-950">
                        {j.payRange || "Standard"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          j.status === "published" ? "bg-teal-50 text-teal-800 border border-teal-200" :
                          j.status === "draft" ? "bg-slate-100 text-slate-700 border border-slate-200" :
                          "bg-rose-50 text-rose-800 border border-rose-200"
                        }`}>
                          {j.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={j.status}
                          onChange={(e) => handleJobStatusChange(j.id, e.target.value as any)}
                          className="text-[11px] py-1 px-2 rounded border border-slate-200 bg-white"
                        >
                          <option value="published">Publish</option>
                          <option value="draft">Draft</option>
                          <option value="closed">Close</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredJobs.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No jobs match your filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: APPLICATIONS MANAGEMENT */}
        {/* ==================================================================== */}
        {activeTab === "applications" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-navy-950">Candidate Job Applications</h2>
                <p className="text-xs text-slate-500">Review clinical credentials, manage interview stages, and access resumes.</p>
              </div>
              <button
                onClick={exportApplicationsCsv}
                className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Applications (CSV)</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name or specialty..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded border border-slate-300 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="new">New Applications</option>
                <option value="reviewed">Reviewed</option>
                <option value="contacted">Contacted</option>
                <option value="screening">In Screening</option>
                <option value="placed">Placed Clinicians</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Applicant & Contact</th>
                    <th className="py-3 px-4">Target Position</th>
                    <th className="py-3 px-4">Specialty & Exp</th>
                    <th className="py-3 px-4">Resume / CV</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy-950">{a.fullName}</div>
                        <div className="text-[11px] text-slate-500">{a.email} • {a.phone}</div>
                        {a.primaryLicenseState && (
                          <span className="text-[10px] text-teal-700 font-medium">Lic: {a.primaryLicenseState}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        {a.jobTitle}
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{a.specialty}</div>
                        <div className="text-[11px] text-slate-400">{a.yearsOfExperience}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        {a.resumeFilename ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                            <FileText className="w-3 h-3" />
                            {a.resumeFilename}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No file attached</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          a.status === "new" ? "bg-amber-50 text-amber-800 border border-amber-200" :
                          a.status === "contacted" ? "bg-blue-50 text-blue-800 border border-blue-200" :
                          a.status === "placed" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                          "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={a.status}
                          onChange={(e) => handleAppStatusChange(a.id, e.target.value as any)}
                          className="text-[11px] py-1 px-2 rounded border border-slate-200 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="screening">Screening</option>
                          <option value="placed">Placed</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredApps.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No applications match your filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: FACILITY ORDERS & INQUIRIES */}
        {/* ==================================================================== */}
        {activeTab === "facilities" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-navy-950">Hospital & Healthcare Facility Orders</h2>
                <p className="text-xs text-slate-500">Manage incoming facility staffing requests and contract status.</p>
              </div>
              <button
                onClick={exportInquiriesCsv}
                className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Facility Leads (CSV)</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by facility name or contact..."
                  value={inqSearch}
                  onChange={(e) => setInqSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <select
                value={inqStatusFilter}
                onChange={(e) => setInqStatusFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded border border-slate-300 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="new">New Inquiries</option>
                <option value="contacted">Contacted</option>
                <option value="in_discussion">In Discussion</option>
                <option value="agreement_sent">Agreement Sent</option>
                <option value="active_client">Active Client</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Facility & Location</th>
                    <th className="py-3 px-4">Contact Person</th>
                    <th className="py-3 px-4">Need & Urgency</th>
                    <th className="py-3 px-4">Details / Notes</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy-950">{inq.facilityName}</div>
                        <div className="text-[11px] text-slate-500">{inq.city}, {inq.state} • {inq.facilityType}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{inq.contactName}</div>
                        <div className="text-[11px] text-slate-500">{inq.email} • {inq.phone}</div>
                        {inq.contactTitle && <div className="text-[10px] text-slate-400">{inq.contactTitle}</div>}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-navy-900">{inq.staffingNeeds}</div>
                        <div className="text-[11px] text-amber-700 font-semibold">{inq.urgency}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="line-clamp-2 text-[11px] text-slate-600">
                          {inq.details || "No special instructions provided."}
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === "new" ? "bg-amber-50 text-amber-800 border border-amber-200" :
                          inq.status === "in_discussion" ? "bg-blue-50 text-blue-800 border border-blue-200" :
                          inq.status === "active_client" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                          "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {inq.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={inq.status}
                          onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                          className="text-[11px] py-1 px-2 rounded border border-slate-200 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_discussion">In Discussion</option>
                          <option value="agreement_sent">Agreement Sent</option>
                          <option value="active_client">Active Client</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredInquiries.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No facility inquiries match your filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: CSV JOB IMPORT */}
        {/* ==================================================================== */}
        {activeTab === "import" && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-navy-950">Batch CSV Job Import</h2>
              <p className="text-xs text-slate-500">
                Safely upload and preview job listings from external healthcare partner spreadsheets or recruitment systems.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-navy-950 mb-2">1. Expected CSV File Format</h3>
                <p className="text-xs text-slate-600 mb-3">
                  Your CSV should contain headers matching: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-teal-800 font-mono text-[11px]">title, specialty, city, state, department, employment_type, shift, pay_range, description</code>
                </p>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-[11px] font-mono text-slate-700 overflow-x-auto">
                  title,specialty,city,state,department,employment_type,shift,pay_range,description<br />
                  Emergency Room RN,Emergency Room (ER) RN,Miami,FL,Nursing,Travel Contract,12-Hour Nights,$2800 / wk,High-acuity emergency department travel contract
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-navy-950 mb-2">2. Select CSV Document</h3>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvFileChange}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer"
                />
              </div>

              {/* Preview Table */}
              {csvParsedRows.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy-950">
                      Parsed Rows Preview ({csvParsedRows.length} found)
                    </span>
                    <button
                      onClick={handleExecuteImport}
                      disabled={csvImporting}
                      className="btn-accent text-xs px-5 py-2 font-semibold"
                    >
                      {csvImporting ? "Importing to Database..." : `Import ${csvParsedRows.length} Jobs`}
                    </button>
                  </div>

                  <div className="border border-slate-200 rounded overflow-x-auto max-h-60 text-[11px]">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-600 sticky top-0 font-semibold">
                        <tr>
                          <th className="p-2">Row #</th>
                          <th className="p-2">Title</th>
                          <th className="p-2">Specialty</th>
                          <th className="p-2">Location</th>
                          <th className="p-2">Pay</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {csvParsedRows.slice(0, 10).map((r, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2 font-mono">{idx + 1}</td>
                            <td className="p-2 font-semibold">{r.title || "—"}</td>
                            <td className="p-2">{r.specialty || "—"}</td>
                            <td className="p-2">{r.city}, {r.state}</td>
                            <td className="p-2">{r.pay_range || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {csvParsedRows.length > 10 && (
                    <p className="text-[11px] text-slate-400">
                      Showing first 10 rows for brevity. All {csvParsedRows.length} rows will be processed.
                    </p>
                  )}
                </div>
              )}

              {/* Import Results Report */}
              {csvReport && (
                <div className="p-4 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-2">
                  <p className="font-bold">Import Summary:</p>
                  <p>Successfully Created: {csvReport.imported} jobs</p>
                  <p>Skipped / Failed: {csvReport.failed} rows</p>
                  {csvReport.errors.length > 0 && (
                    <ul className="list-disc pl-5 text-rose-700 text-[11px] space-y-1">
                      {csvReport.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ==================================================================== */}
      {/* CREATE JOB MODAL */}
      {/* ==================================================================== */}
      {createJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 my-8 relative">
            <button
              onClick={() => setCreateJobModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-navy-950 mb-1">Create New Job Posting</h3>
            <p className="text-xs text-slate-500 mb-6">Enter position parameters to publish or save as draft.</p>

            {jobFormError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                {jobFormError}
              </div>
            )}

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Title *</label>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="e.g. Registered Nurse - Intensive Care Unit"
                  className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select name="department" defaultValue="Nursing" className="w-full px-3 py-2 text-xs rounded border border-slate-300 bg-white">
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialty *</label>
                  <select name="specialty" defaultValue={SPECIALTIES[0]} className="w-full px-3 py-2 text-xs rounded border border-slate-300 bg-white">
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City *</label>
                  <input required type="text" name="locationCity" placeholder="Dallas" className="w-full px-3 py-2 text-xs rounded border border-slate-300" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <select name="locationState" defaultValue="TX" className="w-full px-3 py-2 text-xs rounded border border-slate-300 bg-white">
                    {US_STATES.map(st => <option key={st.code} value={st.code}>{st.name} ({st.code})</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Employment Type</label>
                  <select name="employmentType" defaultValue="Travel Contract" className="w-full px-3 py-2 text-xs rounded border border-slate-300 bg-white">
                    {EMPLOYMENT_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Shift Schedule</label>
                  <input type="text" name="shift" defaultValue="12-Hour Nights (3x12)" className="w-full px-3 py-2 text-xs rounded border border-slate-300" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Compensation</label>
                  <input type="text" name="payRange" placeholder="$2,600 - $3,100 / week" className="w-full px-3 py-2 text-xs rounded border border-slate-300" />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contract Duration (Weeks)</label>
                  <input type="number" name="durationWeeks" defaultValue={13} className="w-full px-3 py-2 text-xs rounded border border-slate-300" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Position Description *</label>
                <textarea required rows={3} name="description" placeholder="Clinical role overview..." className="w-full px-3 py-2 text-xs rounded border border-slate-300" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Responsibilities (One per line)</label>
                <textarea rows={3} name="responsibilities" defaultValue={"Provide acute bedside patient care.\nAdminister medications per protocol.\nCollaborate with hospital clinical staff."} className="w-full px-3 py-2 text-xs rounded border border-slate-300 font-mono" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualifications (One per line)</label>
                <textarea rows={3} name="qualifications" defaultValue={"Active state or compact nursing license.\nCurrent AHA BLS & ACLS certifications.\nMinimum 2 years bedside hospital experience."} className="w-full px-3 py-2 text-xs rounded border border-slate-300 font-mono" />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Benefits (One per line)</label>
                <textarea rows={2} name="benefits" defaultValue={"Tax-free travel stipends.\nDay-one medical, dental, and vision insurance."} className="w-full px-3 py-2 text-xs rounded border border-slate-300 font-mono" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="isUrgent" value="true" className="rounded border-slate-300 text-teal-600" />
                  <span className="font-semibold text-slate-700">Flag as Priority / Urgent Opening</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateJobModalOpen(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={jobFormSubmitting}
                    className="btn-accent px-5 py-2 text-xs font-semibold"
                  >
                    {jobFormSubmitting ? "Creating Job..." : "Publish Job Opening"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
