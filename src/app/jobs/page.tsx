import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { getJobs } from "@/lib/db";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { Briefcase, SlidersHorizontal, AlertCircle, ArrowRight, ShieldCheck, Sparkles, PhoneCall } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Find Healthcare Jobs | Travel Nursing & Allied Positions",
  description:
    "Search verified travel nurse, allied health, and direct-hire clinical jobs across leading US health systems. High pay packages and day-one benefits.",
};

export const revalidate = 30;

interface JobsPageProps {
  searchParams: Promise<{
    search?: string;
    department?: string;
    specialty?: string;
    state?: string;
    employmentType?: string;
    sortBy?: "newest" | "pay";
  }>;
}

export default async function JobsPage(props: JobsPageProps) {
  const searchParams = await props.searchParams;

  const filters = {
    search: searchParams.search || "",
    department: searchParams.department || "all",
    specialty: searchParams.specialty || "all",
    state: searchParams.state || "all",
    employmentType: searchParams.employmentType || "all",
    sortBy: searchParams.sortBy || "newest",
  };

  const { jobs, total } = await getJobs(filters);

  return (
    <div className="bg-[#FCFCFB] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <nav className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-navy-950 transition-colors font-medium">Home</Link>
            <span>/</span>
            <span className="text-teal-700 font-bold">Clinical Jobs</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Verified Hospital Orders Active</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight font-display">
                Healthcare Job Opportunities
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
                Explore verified travel nursing, therapy, allied health, and permanent clinical positions. Filter by specialty, state, and contract type.
              </p>
            </div>

            <div className="text-xs text-slate-700 flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200/90 shadow-sm shrink-0 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>100% Verified Hospital Direct Orders</span>
            </div>
          </div>
        </div>

        {/* Interactive Search & Filter Bar */}
        <Suspense fallback={<div className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse mb-8" />}>
          <JobFilters />
        </Suspense>

        {/* Results Counter & Meta */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/90">
          <div className="text-sm font-bold text-navy-950">
            Showing <span className="text-teal-700 font-black">{jobs.length}</span> {jobs.length === 1 ? "position" : "positions"}
            {total > jobs.length && ` of ${total} total`}
          </div>

          <div className="text-xs text-slate-500 hidden sm:block">
            Sorted by: <span className="font-bold text-slate-900">{filters.sortBy === "pay" ? "Highest Compensation" : "Most Recent"}</span>
          </div>
        </div>

        {/* Job Listings Grid or Empty State */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-slate-200/90 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm my-8">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
              No matching clinical jobs found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              We couldn&apos;t find any positions matching your selected criteria. Try adjusting or resetting your specialty and location filters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/jobs"
                className="btn-accent text-xs font-bold px-6 py-3"
              >
                Clear All Filters
              </Link>
              <Link
                href="/facilities#inquiry-form"
                className="btn-secondary text-xs font-bold px-6 py-3"
              >
                Inquire About Custom Placement
              </Link>
            </div>
          </div>
        )}

        {/* Candidate Support Banner */}
        <div className="mt-16 bg-navy-950 text-white rounded-3xl p-8 sm:p-12 border-2 border-navy-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-extrabold text-green-400 uppercase tracking-wider">
                Looking for a specific facility or unlisted specialty?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Speak directly with an Ideal Healthcare recruitment specialist.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Our clinical placement coordinators maintain direct access to unadvertised hospital requests, rapid response units, and upcoming contract blocks across leading medical networks.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link
                href="/facilities#inquiry-form"
                className="btn-accent text-center text-sm py-3.5 font-bold shadow-lg"
              >
                Submit General Profile
              </Link>
              <a
                href={COMPANY_INFO.phoneHref}
                className="btn-secondary text-center text-sm py-3.5 font-bold text-navy-950 bg-white hover:text-green-700"
              >
                <PhoneCall className="w-4 h-4 text-green-600 inline-block mr-1.5" />
                Call {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
