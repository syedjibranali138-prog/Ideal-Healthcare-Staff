import Link from "next/link";
import { Job } from "@/types";
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  DollarSign,
  ChevronRight
} from "lucide-react";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border hover:border-green-500/70 dark:hover:border-green-500/60 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group relative">
      <div>
        {/* Top Badges & Priority Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-navy-50 dark:bg-dark-card text-navy-900 dark:text-sky-300 border border-navy-200/80 dark:border-dark-border">
              {job.department}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60">
              {job.specialty}
            </span>
          </div>
          
          {job.isUrgent ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Priority Need
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-dark-card px-2.5 py-0.5 rounded-full border border-slate-200/60 dark:border-dark-border">
              <ShieldCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
              Verified Order
            </span>
          )}
        </div>

        {/* Job Title */}
        <Link 
          href={`/jobs/${job.slug}`}
          className="block group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors"
        >
          <h3 className="text-xl sm:text-2xl font-black text-navy-950 dark:text-white line-clamp-2 tracking-tight leading-snug font-display">
            {job.title}
          </h3>
        </Link>

        {/* Specifications Meta Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 flex items-center justify-center shrink-0 border border-green-100 dark:border-green-900/50">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
              {job.locationCity}, {job.locationState}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-dark-border">
              <Building2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300 font-semibold truncate">
              {job.employmentType}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2">
            <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-dark-border">
              <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </div>
            <span className="truncate text-slate-700 dark:text-slate-300 font-semibold">
              {job.shift} {job.durationWeeks ? `• ${job.durationWeeks}-Week Contract` : ""}
            </span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Prominent Compensation & Action Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {job.payRange ? (
          <div className="bg-gradient-to-r from-green-50/90 via-emerald-50/40 to-white dark:from-green-950/30 dark:via-dark-card dark:to-dark-surface border border-green-200/90 dark:border-green-800/50 px-3.5 py-2 rounded-xl">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-green-700 dark:text-green-400" />
              <span className="text-[10px] uppercase tracking-wider text-green-900 dark:text-green-300 font-extrabold">
                Estimated Weekly Pay
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-navy-950 dark:text-white tracking-tight font-sans mt-0.5">
              {job.payRange}
            </div>
          </div>
        ) : (
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-dark-card px-3.5 py-2 rounded-xl border border-slate-200 dark:border-dark-border">
            Competitive Standard Rate
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={`/jobs/${job.slug}`}
            className="flex-1 sm:flex-initial px-3.5 py-2.5 text-xs font-bold text-navy-950 dark:text-slate-200 hover:text-green-700 dark:hover:text-green-400 bg-slate-100 dark:bg-dark-card hover:bg-slate-200 dark:hover:bg-dark-border rounded-xl transition-colors text-center border border-slate-200/70 dark:border-dark-border"
          >
            Details
          </Link>
          <Link
            href={`/apply/${job.id}`}
            className="flex-1 sm:flex-initial btn-accent px-4 sm:px-5 py-2.5 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
