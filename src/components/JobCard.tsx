import Link from "next/link";
import { Job } from "@/types";
import { MapPin, Clock, ArrowRight, Sparkles, Building2, ShieldCheck, DollarSign } from "lucide-react";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white border-2 border-slate-200/90 hover:border-green-500/70 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="badge-navy text-[11px] font-bold">
              {job.department}
            </span>
            <span className="badge-green text-[11px] font-bold">
              {job.specialty}
            </span>
          </div>
          
          {job.isUrgent ? (
            <span className="badge-urgent text-[11px] font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Priority Urgent Need
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-green-600" />
              Verified Order
            </span>
          )}
        </div>

        {/* Job Title */}
        <Link 
          href={`/jobs/${job.slug}`}
          className="block group-hover:text-green-700 transition-colors"
        >
          <h3 className="text-xl sm:text-2xl font-black text-navy-950 line-clamp-2 tracking-tight leading-snug font-display">
            {job.title}
          </h3>
        </Link>

        {/* Clinical Specs Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-green-50 text-green-700 flex items-center justify-center shrink-0">
              <MapPin className="w-3.5 h-3.5 text-green-600" />
            </div>
            <span className="font-bold text-slate-900 truncate">
              {job.locationCity}, {job.locationState}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <span className="text-slate-700 font-semibold truncate">{job.employmentType}</span>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2">
            <div className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <span className="truncate text-slate-700 font-semibold">
              {job.shift} {job.durationWeeks ? `• ${job.durationWeeks}-Week Contract` : ""}
            </span>
          </div>
        </div>

        {/* Description snippet */}
        <p className="mt-4 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Prominent Compensation & Action Bar */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {job.payRange ? (
          <div className="bg-gradient-to-r from-green-50/90 via-emerald-50/40 to-white border border-green-200/90 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-green-700" />
              <span className="text-[10px] uppercase tracking-wider text-green-900 font-extrabold">
                Estimated Weekly Pay
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-navy-950 tracking-tight font-sans mt-0.5">
              {job.payRange}
            </div>
          </div>
        ) : (
          <div className="text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            Competitive Standard Rate
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/jobs/${job.slug}`}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-navy-950 hover:text-green-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-center border border-slate-200/70"
          >
            Details
          </Link>
          <Link
            href={`/apply/${job.id}`}
            className="flex-1 sm:flex-initial btn-accent px-5 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
