import type { Metadata } from "next";
import Link from "next/link";
import { getJobById } from "@/lib/db";
import ApplicationForm from "@/components/ApplicationForm";
import { ArrowLeft, MapPin, Building, Clock, ShieldCheck } from "lucide-react";

interface ApplyPageProps {
  params: Promise<{ jobId: string }>;
}

export async function generateMetadata(props: ApplyPageProps): Promise<Metadata> {
  const { jobId } = await props.params;
  const job = await getJobById(jobId);

  return {
    title: job ? `Apply for ${job.title}` : "Submit Clinical Application",
    description: "Submit your application and resume to Ideal Healthcare Staffing for review by our clinical placement specialists.",
  };
}

export const revalidate = 60;

export default async function ApplyPage(props: ApplyPageProps) {
  const { jobId } = await props.params;
  const job = await getJobById(jobId);

  const jobTitle = job ? job.title : "General Clinical Candidate Application";
  const defaultSpecialty = job ? job.specialty : undefined;

  return (
    <div className="bg-[#FBFBFA] min-h-screen py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href={job ? `/jobs/${job.slug}` : "/jobs"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-950 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{job ? "Back to Job Details" : "Back to All Jobs"}</span>
          </Link>
        </div>

        {/* Position Summary Banner if specific job */}
        {job && (
          <div className="bg-navy-900 text-white rounded-lg p-5 sm:p-6 mb-8 border border-navy-800 shadow-sm">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-teal-400 block mb-1">
              Applying for Position
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {job.title}
            </h1>
            
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {job.locationCity}, {job.locationState}
              </span>
              <span>•</span>
              <span>{job.employmentType}</span>
              <span>•</span>
              <span>{job.shift}</span>
              {job.payRange && (
                <>
                  <span>•</span>
                  <span className="font-semibold text-teal-300">{job.payRange}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Candidate Application Form */}
        <ApplicationForm
          jobId={jobId}
          jobTitle={jobTitle}
          defaultSpecialty={defaultSpecialty}
        />

        {/* Confidentiality & Ethics Reminder */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Ideal Healthcare Staffing does not share candidate resumes or contact information without your prior consent. Review our{" "}
          <Link href="/privacy-policy" className="text-teal-700 underline font-medium">
            Privacy Policy
          </Link>{" "}
          and Equal Employment Opportunity commitments.
        </div>

      </div>
    </div>
  );
}
