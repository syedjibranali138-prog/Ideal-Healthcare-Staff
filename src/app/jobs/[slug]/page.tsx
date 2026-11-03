import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobBySlug, getJobs } from "@/lib/db";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Calendar,
  Sparkles,
  PhoneCall
} from "lucide-react";
import JobCard from "@/components/JobCard";
import { COMPANY_INFO } from "@/lib/constants";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | Ideal Healthcare Staffing",
    };
  }

  return {
    title: `${job.title} (${job.locationCity}, ${job.locationState})`,
    description: job.description.slice(0, 160),
    openGraph: {
      title: `${job.title} - ${job.specialty}`,
      description: `${job.locationCity}, ${job.locationState} | ${job.employmentType} | ${job.payRange || "Competitive Pay"}`,
    },
  };
}

export const revalidate = 60;

export default async function JobDetailPage(props: JobDetailPageProps) {
  const { slug } = await props.params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const { jobs: allJobs } = await getJobs();
  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id && (j.department === job.department || j.locationState === job.locationState))
    .slice(0, 2);

  return (
    <div className="bg-[#FBFBFA] dark:bg-[#070E1A] min-h-screen py-10 sm:py-14 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-navy-950 dark:hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-navy-950 dark:hover:text-white transition-colors">Healthcare Jobs</Link>
          <span>/</span>
          <span className="text-green-700 dark:text-green-400 font-bold truncate max-w-xs">{job.title}</span>
        </nav>

        {/* Main Job Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Full Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-navy-50 dark:bg-dark-card text-navy-900 dark:text-sky-300 border border-navy-200/80 dark:border-dark-border">
                  {job.department}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60">
                  {job.specialty}
                </span>
                {job.isUrgent && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    Priority Opening
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy-950 dark:text-white tracking-tight font-display">
                {job.title}
              </h1>

              {/* Quick Specs Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border text-xs">
                <div>
                  <span className="text-slate-400 dark:text-slate-400 block uppercase tracking-wider font-bold text-[10px]">Location</span>
                  <span className="font-bold text-navy-950 dark:text-white flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0" />
                    <span className="truncate">{job.locationCity}, {job.locationState}</span>
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-400 block uppercase tracking-wider font-bold text-[10px]">Contract Type</span>
                  <span className="font-bold text-navy-950 dark:text-white mt-0.5 block truncate">{job.employmentType}</span>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-400 block uppercase tracking-wider font-bold text-[10px]">Shift Schedule</span>
                  <span className="font-bold text-navy-950 dark:text-white mt-0.5 block truncate">{job.shift}</span>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-slate-400 block uppercase tracking-wider font-bold text-[10px]">Duration</span>
                  <span className="font-bold text-navy-950 dark:text-white mt-0.5 block truncate">
                    {job.durationWeeks ? `${job.durationWeeks} Weeks` : "Contract"}
                  </span>
                </div>
              </div>

              {/* Compensation Highlights */}
              {job.payRange && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold block">
                      Estimated Weekly Compensation
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-navy-950 dark:text-white font-sans tracking-tight">
                      {job.payRange}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Includes taxable hourly base wage plus non-taxed housing & meals stipends for eligible travelers.
                    </p>
                  </div>

                  <Link
                    href={`/apply/${job.id}`}
                    className="btn-accent px-8 py-3 text-sm font-bold shrink-0 text-center shadow-md"
                  >
                    Apply For Position
                  </Link>
                </div>
              )}
            </div>

            {/* Position Overview & Description */}
            <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-navy-950 dark:text-white mb-3 border-b border-slate-100 dark:border-dark-border pb-2 font-display">
                  Role Overview
                </h2>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Key Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white mb-3 font-display">
                    Key Clinical Responsibilities
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications & Licensure */}
              {job.qualifications && job.qualifications.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white mb-3 font-display">
                    Qualifications & Licensure Requirements
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                    {job.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comprehensive Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-navy-950 dark:text-white mb-3 font-display">
                    Comprehensive Traveler Benefits
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                    {job.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Related Opportunities */}
            {relatedJobs.length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-4 font-display">
                  Similar Clinical Positions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedJobs.map((rj) => (
                    <JobCard key={rj.id} job={rj} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Application Box & Recruiter Contact */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Action Card */}
            <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border rounded-2xl p-6 shadow-sm sticky top-28">
              <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-wider block mb-1">
                Fast-Track Application
              </span>
              <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-2 font-display">
                Interested in this opening?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Submit your profile in under 2 minutes. A clinical recruitment specialist will review your credentials and discuss immediate unit placement.
              </p>

              <Link
                href={`/apply/${job.id}`}
                className="btn-accent w-full text-center py-3 text-sm font-bold block mb-3 shadow-md"
              >
                Apply for this Position
              </Link>

              <a
                href={COMPANY_INFO.phoneHref}
                className="btn-secondary w-full text-center py-2.5 text-xs font-bold block dark:bg-dark-card dark:border-dark-border dark:text-white hover:text-green-700 dark:hover:text-green-400"
              >
                <PhoneCall className="w-3.5 h-3.5 text-green-600 dark:text-green-400 inline-block mr-1.5" />
                Call {COMPANY_INFO.phone}
              </a>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-dark-border space-y-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>Primary source credentialing support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>Direct deposit weekly payroll</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                  <span>Direct hospital system agreement</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
