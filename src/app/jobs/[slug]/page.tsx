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
  Share2
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
    <div className="bg-[#FBFBFA] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-navy-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-navy-900 transition-colors">Healthcare Jobs</Link>
          <span>/</span>
          <span className="text-teal-700 font-medium truncate max-w-xs">{job.title}</span>
        </nav>

        {/* Main Job Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Full Content */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="badge-navy">{job.department}</span>
                <span className="badge-teal">{job.specialty}</span>
                {job.isUrgent && <span className="badge-urgent">Priority Opening</span>}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                {job.title}
              </h1>

              {/* Quick Specs Grid */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider font-semibold">Location</span>
                  <span className="font-bold text-navy-950 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {job.locationCity}, {job.locationState}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block uppercase tracking-wider font-semibold">Contract Type</span>
                  <span className="font-bold text-navy-950 mt-0.5 block">{job.employmentType}</span>
                </div>

                <div>
                  <span className="text-slate-400 block uppercase tracking-wider font-semibold">Shift Schedule</span>
                  <span className="font-bold text-navy-950 mt-0.5 block">{job.shift}</span>
                </div>

                <div>
                  <span className="text-slate-400 block uppercase tracking-wider font-semibold">Duration</span>
                  <span className="font-bold text-navy-950 mt-0.5 block">
                    {job.durationWeeks ? `${job.durationWeeks} Weeks` : "Contract"}
                  </span>
                </div>
              </div>

              {/* Compensation Highlights */}
              {job.payRange && (
                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                      Target Compensation Package
                    </span>
                    <span className="text-2xl font-extrabold text-navy-950 font-sans">
                      {job.payRange}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Includes taxable base wage plus non-taxed housing & meals stipends for eligible travelers.
                    </p>
                  </div>

                  <Link
                    href={`/apply/${job.id}`}
                    className="btn-accent px-8 py-3 text-sm font-semibold shrink-0 text-center"
                  >
                    Apply For Position
                  </Link>
                </div>
              )}
            </div>

            {/* Position Overview & Description */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-navy-950 mb-3 border-b border-slate-100 pb-2">
                  Role Overview
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Key Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-navy-950 mb-3">
                    Key Clinical Responsibilities
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications & Credentialing */}
              {job.qualifications && job.qualifications.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-navy-950 mb-3">
                    Qualifications & Licensure Requirements
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {job.qualifications.map((qual, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Compensation & Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-navy-950 mb-3">
                    Comprehensive Traveler Benefits
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {job.benefits.map((ben, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
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
                <h3 className="text-lg font-bold text-navy-950 mb-4">
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
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-28">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
                Fast-Track Application
              </span>
              <h3 className="text-xl font-bold text-navy-950 mb-2">
                Interested in this opening?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Submit your profile in under 2 minutes. A clinical recruitment specialist will review your license and schedule your facility interview.
              </p>

              <Link
                href={`/apply/${job.id}`}
                className="btn-accent w-full text-center py-3 text-sm font-semibold block mb-3 shadow-md"
              >
                Apply for this Position
              </Link>

              <a
                href={COMPANY_INFO.phoneHref}
                className="btn-secondary w-full text-center py-2.5 text-xs font-bold block hover:text-green-700"
              >
                Call {COMPANY_INFO.phone}
              </a>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Primary source credentialing support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Direct deposit weekly payroll</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
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
