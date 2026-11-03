import Link from "next/link";
import Image from "next/image";
import { 
  Phone, 
  MapPin, 
  Printer, 
  ExternalLink, 
  ShieldCheck, 
  HeartPulse, 
  Building2, 
  Briefcase, 
  Clock, 
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-[#050D1D] text-slate-300 border-t border-navy-900 transition-colors duration-200">
      
      {/* ==================================================================== */}
      {/* TIER 1: HIGH-IMPACT DUAL PATHWAY IMPACT BAND */}
      {/* ==================================================================== */}
      <div className="border-b border-navy-800/80 bg-gradient-to-b from-[#061530] to-[#050D1D] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Impact Headline */}
            <div className="lg:col-span-5 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Ideal Standard</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Powering Exceptional Healthcare Across the Nation
              </h2>
              <p className="text-sm text-slate-400 max-w-md">
                Connecting clinical talent with premier healthcare organizations through verified credentialing and responsive placement coordination.
              </p>
            </div>

            {/* Dual Action Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Clinician Card */}
              <div className="bg-navy-900/90 border border-navy-700/80 hover:border-green-500/60 rounded-2xl p-6 transition-all duration-300 group hover-lift flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/20">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-green-400">
                      For Clinicians
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 font-display">
                    Travel Nursing & Allied Jobs
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    High-paying contracts with full day-one health benefits and travel stipends.
                  </p>
                </div>
                <Link
                  href="/jobs"
                  className="btn-accent py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 w-full shadow-md"
                >
                  <span>Explore Open Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Facility Card */}
              <div className="bg-navy-900/90 border border-navy-700/80 hover:border-green-500/60 rounded-2xl p-6 transition-all duration-300 group hover-lift flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
                      For Health Systems
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 font-display">
                    Hospital Staffing Coverage
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Primary-source verified clinicians ready for acute census peaks and leaves.
                  </p>
                </div>
                <Link
                  href="/facilities#inquiry-form"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-navy-800 hover:bg-navy-700 border border-navy-600/80 transition-all w-full shadow-sm"
                >
                  <span>Request Staffing</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* TIER 2: ARCHITECTURAL DIRECTORY & VERIFIED INFORMATION */}
      {/* ==================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand & Verified Official Contact Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link 
              href="/" 
              className="inline-flex items-center py-1 group focus:outline-none"
            >
              <Image
                src="/images/logo.webp"
                alt="Ideal Healthcare Staffing"
                width={220}
                height={65}
                className="h-11 w-auto object-contain transition-transform group-hover:scale-[1.02] brightness-105"
              />
            </Link>
            
            <div className="space-y-1">
              <p className="text-sm font-extrabold text-white font-display">
                {COMPANY_INFO.tagline}
              </p>
              <p className="text-xs text-green-400 font-semibold tracking-wide">
                {COMPANY_INFO.subtagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Ideal Healthcare Staffing provides clinical recruitment and workforce solutions connecting travel nurses, allied health clinicians, and healthcare systems across the United States.
            </p>

            {/* Verified Official Contact Block */}
            <div className="space-y-3 text-xs text-slate-300 pt-3 border-t border-navy-800/80">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Direct Phone:</span>
                  <a 
                    href={COMPANY_INFO.phoneHref} 
                    className="font-bold text-white hover:text-green-400 transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
                  <Printer className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Secure Fax:</span>
                  <span className="font-semibold text-slate-200">{COMPANY_INFO.fax}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-slate-400">Headquarters: </span>
                  <span className="text-slate-200 leading-relaxed">
                    {COMPANY_INFO.address}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Web Portal:</span>
                  <a 
                    href={COMPANY_INFO.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-green-400 hover:text-green-300 font-semibold underline underline-offset-2"
                  >
                    {COMPANY_INFO.website.replace("https://", "").replace("/", "")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Healthcare Professionals */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-white font-display flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-green-400" />
              <span>For Clinicians</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/jobs" className="hover:text-green-400 transition-colors">
                  Explore Travel Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?search=ICU" className="hover:text-green-400 transition-colors">
                  ICU & Critical Care
                </Link>
              </li>
              <li>
                <Link href="/jobs?search=Emergency" className="hover:text-green-400 transition-colors">
                  Emergency Room (ER)
                </Link>
              </li>
              <li>
                <Link href="/jobs?search=OR" className="hover:text-green-400 transition-colors">
                  Operating Room (OR)
                </Link>
              </li>
              <li>
                <Link href="/jobs?department=Allied+Health" className="hover:text-green-400 transition-colors">
                  Allied Health & Therapy
                </Link>
              </li>
              <li>
                <Link href="/#specialties" className="hover:text-green-400 transition-colors">
                  Specialty Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Facilities & Hospitals */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-white font-display flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>For Facilities</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/facilities" className="hover:text-green-400 transition-colors">
                  Hospital Solutions
                </Link>
              </li>
              <li>
                <Link href="/facilities#services" className="hover:text-green-400 transition-colors">
                  Rapid Response Coverage
                </Link>
              </li>
              <li>
                <Link href="/facilities#services" className="hover:text-green-400 transition-colors">
                  13-Week Travel Contracts
                </Link>
              </li>
              <li>
                <Link href="/facilities#services" className="hover:text-green-400 transition-colors">
                  Allied Staffing Placement
                </Link>
              </li>
              <li>
                <Link 
                  href="/facilities#inquiry-form" 
                  className="font-bold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Submit Staffing Request</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance, Legal & Portal */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-white font-display flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              <span>Governance & Legal</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-green-400 transition-colors">
                  Privacy Policy & HIPAA
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#eeo" className="hover:text-green-400 transition-colors">
                  Equal Opportunity Employer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#credentialing" className="hover:text-green-400 transition-colors">
                  Primary-Source Verification
                </Link>
              </li>
              <li className="pt-2">
                <Link 
                  href="/admin" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 border border-navy-800 text-slate-300 hover:text-white transition-colors text-xs font-medium"
                >
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Staffing Coordinator Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ==================================================================== */}
      {/* TIER 3: COMPLIANCE & COPYRIGHT BOTTOM BAR */}
      {/* ==================================================================== */}
      <div className="border-t border-navy-900 bg-black/60 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left text-slate-400">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. {COMPANY_INFO.address}. Phone:{" "}
            <a href={COMPANY_INFO.phoneHref} className="text-slate-300 hover:text-green-400 font-bold transition-colors">
              {COMPANY_INFO.phone}
            </a>.
          </p>
          <div className="flex items-center gap-5 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/facilities#inquiry-form" className="hover:text-white transition-colors">
              Facility Coverage
            </Link>
            <span>•</span>
            <a 
              href={COMPANY_INFO.website} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-green-400 hover:text-green-300 transition-colors font-medium"
            >
              idealhealthcarestaff.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
