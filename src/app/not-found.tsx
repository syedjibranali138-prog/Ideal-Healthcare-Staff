import Link from "next/link";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <span className="text-sm font-bold text-teal-700 tracking-wider uppercase">
          404 Error
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          The requested clinical resource, job listing, or portal directory could not be located or may have been updated.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/jobs"
            className="w-full sm:w-auto btn-accent text-sm py-2.5 px-6 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search Available Jobs</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto btn-secondary text-sm py-2.5 px-6 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
