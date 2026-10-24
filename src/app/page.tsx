import Link from "next/link";
import Image from "next/image";
import { getJobs } from "@/lib/db";
import JobCard from "@/components/JobCard";
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  HeartPulse, 
  Stethoscope, 
  Clock, 
  FileCheck2, 
  ChevronRight,
  Briefcase,
  CheckCircle2,
  Sparkles,
  MapPin,
  PhoneCall,
  Activity,
  Printer
} from "lucide-react";
import { SPECIALTIES, US_STATES, COMPANY_INFO } from "@/lib/constants";

export const revalidate = 60;

export default async function HomePage() {
  const { jobs } = await getJobs();
  const featuredJobs = jobs.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ==================================================================== */}
      {/* 1. HERO SECTION: OFFICIAL NAVY & FRESH GREEN BRANDING */}
      {/* ==================================================================== */}
      <section className="relative bg-navy-950 text-white pt-12 pb-24 lg:pt-16 lg:pb-32 border-b border-navy-900 overflow-hidden">
        {/* Ambient fresh green & navy glow accents matching logo */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-600/25 rounded-full blur-[140px] pointer-events-none" />
        {/* Subtle dot matrix pattern */}
        <div className="absolute inset-0 bg-clinical-grid-dark opacity-35 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-7">
              
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-navy-900/90 border border-green-500/40 text-green-300 text-xs font-bold tracking-wide shadow-lg animate-fade-in">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span>{COMPANY_INFO.tagline}</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.08] font-display text-white">
                  The Right Professionals. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-white">
                    The Right Place. The Right Time.™
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal pt-1">
                  Ideal Healthcare Staffing connects dedicated travel nurses, allied health clinicians, and specialized providers with leading acute care hospitals and health systems nationwide.
                </p>
              </div>

              {/* Direct Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/jobs"
                  className="btn-accent py-4 px-8 text-base font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-green-950/40 group hover-lift"
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Find Travel Jobs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/facilities#inquiry-form"
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-base font-bold text-white bg-navy-900 hover:bg-navy-800 border border-navy-700/80 transition-all shadow-md group hover-lift"
                >
                  <Building2 className="w-5 h-5 text-green-400" />
                  <span>Request Staffing Coverage</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Embedded Fast Job Search Console */}
              <div className="pt-4">
                <div className="bg-navy-900/90 backdrop-blur-md p-5 rounded-2xl border border-navy-700/80 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-extrabold text-green-300 uppercase tracking-wider flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-green-400" />
                      <span>Search Clinical Positions</span>
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Direct hospital orders • Weekly pay packages
                    </span>
                  </div>
                  
                  <form action="/jobs" method="GET" className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        name="search"
                        placeholder="Role or specialty (e.g. ICU RN)"
                        className="w-full px-3.5 py-3 text-xs rounded-xl border border-navy-700 bg-navy-950/80 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 font-medium"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <select
                        name="specialty"
                        defaultValue="all"
                        className="w-full px-3.5 py-3 text-xs rounded-xl border border-navy-700 bg-navy-950/80 text-white focus:outline-none focus:ring-2 focus:ring-green-400 font-medium"
                      >
                        <option value="all" className="bg-navy-950 text-white">All Specialties</option>
                        {SPECIALTIES.slice(0, 10).map((s) => (
                          <option key={s} value={s} className="bg-navy-950 text-white">{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <select
                        name="state"
                        defaultValue="all"
                        className="w-full px-3.5 py-3 text-xs rounded-xl border border-navy-700 bg-navy-950/80 text-white focus:outline-none focus:ring-2 focus:ring-green-400 font-medium"
                      >
                        <option value="all" className="bg-navy-950 text-white">All States</option>
                        {US_STATES.slice(0, 10).map((st) => (
                          <option key={st.code} value={st.code} className="bg-navy-950 text-white">
                            {st.name} ({st.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <button
                        type="submit"
                        className="w-full btn-accent py-3 text-xs font-black flex items-center justify-center gap-1.5"
                      >
                        <Search className="w-3.5 h-3.5 text-white" />
                        <span>Search Jobs</span>
                      </button>
                    </div>
                  </form>

                  {/* Quick Filters */}
                  <div className="mt-3.5 pt-3 border-t border-navy-800/80 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span className="font-bold text-slate-300">Popular:</span>
                    <Link href="/jobs?search=ICU" className="text-green-300 hover:text-white bg-navy-950/60 px-2.5 py-0.5 rounded border border-navy-800 transition-colors">
                      ICU RN
                    </Link>
                    <Link href="/jobs?search=Emergency" className="text-green-300 hover:text-white bg-navy-950/60 px-2.5 py-0.5 rounded border border-navy-800 transition-colors">
                      ER Registered Nurse
                    </Link>
                    <Link href="/jobs?search=OR" className="text-green-300 hover:text-white bg-navy-950/60 px-2.5 py-0.5 rounded border border-navy-800 transition-colors">
                      Operating Room
                    </Link>
                    <Link href="/jobs?search=Telemetry" className="text-green-300 hover:text-white bg-navy-950/60 px-2.5 py-0.5 rounded border border-navy-800 transition-colors">
                      Telemetry
                    </Link>
                    <Link href="/jobs?department=Allied+Health" className="text-green-300 hover:text-white bg-navy-950/60 px-2.5 py-0.5 rounded border border-navy-800 transition-colors">
                      Allied Health
                    </Link>
                  </div>
                </div>
              </div>

              {/* Verified Contact Details Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <a href={COMPANY_INFO.phoneHref} className="flex items-center gap-2 hover:text-green-300 transition-colors">
                  <PhoneCall className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="font-bold text-white">{COMPANY_INFO.phone}</span>
                </a>
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Fax: {COMPANY_INFO.fax}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Los Angeles, CA</span>
                </div>
              </div>

            </div>

            {/* Right Visual Clinical Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Clinical Image Frame */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-navy-700/80 shadow-2xl bg-navy-900 aspect-[4/5] group">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
                    alt="Clinical nurse manager in modern healthcare hospital"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                  
                  {/* Bottom Image Overlay Text */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="badge-green text-[11px] mb-2 inline-block bg-green-500/20 text-green-300 border-green-400/40">
                      Ideal Healthcare Network
                    </span>
                    <p className="text-xl font-bold leading-tight font-display">
                      Empowering dedicated clinicians. Supporting hospital care teams.
                    </p>
                    <p className="text-xs text-slate-300 mt-1.5">
                      Direct deposit weekly payroll • Comprehensive day-one health benefits
                    </p>
                  </div>
                </div>

                {/* Floating Metric Pill 1 (Top Left) */}
                <div className="absolute -top-5 -left-4 sm:-left-6 bg-white text-navy-950 p-4 rounded-2xl border border-slate-200/90 shadow-2xl hidden sm:block animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Weekly Compensation</div>
                      <div className="text-base font-black text-navy-950 font-sans">$2,450 – $3,450/wk</div>
                    </div>
                  </div>
                </div>

                {/* Floating Metric Pill 2 (Bottom Right) */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-navy-900/95 backdrop-blur-md text-white p-4 rounded-2xl border border-green-500/40 shadow-2xl hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-400/30">
                      <Building2 className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-green-300">Hospital Staffing Support</div>
                      <a href={COMPANY_INFO.phoneHref} className="text-sm font-bold text-white font-sans hover:text-green-300 transition-colors">
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. VALUE PROPOSITION STRIP */}
      {/* ==================================================================== */}
      <section className="bg-slate-50 border-b border-slate-200/90 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0 border border-green-100">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-base font-bold text-navy-950 font-display">Primary Verification</div>
                <div className="text-xs text-slate-500">License & credentials checked</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0 border border-green-100">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-base font-bold text-navy-950 font-display">Rapid Coverage</div>
                <div className="text-xs text-slate-500">Responsive placement coordinators</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0 border border-green-100">
                <HeartPulse className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-base font-bold text-navy-950 font-display">Clinician First</div>
                <div className="text-xs text-slate-500">Transparent weekly pay packages</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0 border border-green-100">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-base font-bold text-navy-950 font-display">Nationwide Reach</div>
                <div className="text-xs text-slate-500">Headquartered in Los Angeles, CA</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. DUAL AUDIENCE PATHWAYS */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-green-700 tracking-wider uppercase bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              Two Audiences, One Mission
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight font-display">
              Tailored staffing solutions for every healthcare need.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Whether you are advancing your travel career or staffing an acute care hospital unit, Ideal Healthcare Staffing delivers responsive service and professional integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* For Healthcare Professionals */}
            <div className="bg-slate-50 border-2 border-slate-200/90 hover:border-green-500/60 rounded-3xl p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center border border-green-200 group-hover:scale-105 transition-transform">
                    <UserCheck className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold text-green-800 bg-green-100 border border-green-300 px-3 py-1 rounded-full uppercase">
                    For Clinicians
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-navy-950 tracking-tight font-display">
                    Travel Nurses & Clinicians
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Earn competitive weekly pay with non-taxed travel stipends, comprehensive day-one benefits, and dedicated placement coordinator support on every hospital contract.
                  </p>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-700 font-medium pt-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Transparent weekly pay packages with maximum IRS per diem travel stipends.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Personalized placement coordination and ongoing assignment support.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Day-one comprehensive medical, dental, vision, and retirement options.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span>Smooth credentialing assistance and primary license verification.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-200">
                <Link
                  href="/jobs"
                  className="btn-accent w-full text-center py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Explore Open Travel Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* For Healthcare Facilities */}
            <div className="bg-navy-950 text-white border-2 border-navy-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-navy-900 text-green-400 rounded-2xl flex items-center justify-center border border-navy-800 group-hover:scale-105 transition-transform">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-extrabold text-green-300 bg-navy-900 border border-green-400/30 px-3 py-1 rounded-full uppercase">
                    For Facilities
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight font-display">
                    Healthcare Facilities
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Safeguard clinical staffing continuity, minimize nurse burnout, and solve urgent census surges with credentialed travel nurses, allied professionals, and per diem staff.
                  </p>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-300 font-medium pt-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Primary-source verified clinical credentials, background checks, and certifications.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Rapid candidate matching for acute census peaks, unit vacancies, and leaves.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Verified skill checklists, health screenings, and professional references.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Flexible contracts from 13-week travelers to direct-hire conversion options.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 pt-6 border-t border-navy-800 relative z-10">
                <Link
                  href="/facilities#inquiry-form"
                  className="btn-primary bg-white text-navy-950 hover:bg-slate-100 w-full text-center py-4 text-sm font-black flex items-center justify-center gap-2 border-0 shadow-lg"
                >
                  <span>Request Staffing Partnership</span>
                  <ArrowRight className="w-4 h-4 text-green-700" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. FEATURED JOB DISCOVERY SECTION */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-slate-50/60 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-green-700 tracking-wider uppercase bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                Verified Clinical Openings
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 tracking-tight font-display">
                Featured Hospital Positions
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Browse verified 13-week travel contracts and direct hospital orders with competitive weekly compensation packages.
              </p>
            </div>

            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 group"
            >
              <span>View all open positions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/jobs"
              className="btn-secondary px-8 py-4 text-sm font-bold inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Explore All Jobs & Filter by State</span>
            </Link>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. CLINICAL SPECIALTY DISCIPLINES */}
      {/* ==================================================================== */}
      <section id="specialties" className="py-20 lg:py-24 bg-white border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-green-700 tracking-wider uppercase bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              Clinical Disciplines
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 tracking-tight font-display">
              Supported Specialties
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              We specialize across high-demand clinical units, providing primary credentialing and responsive placement coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Intensive Care */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-green-500/60 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 border border-green-100 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
                Critical Care & ICU
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Experienced Registered Nurses for Medical ICU, Surgical ICU, Neuro ICU, and Cardiovascular ICU units.
              </p>
              <Link href="/jobs?search=ICU" className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                <span>View ICU Contracts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Emergency */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-green-500/60 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 border border-green-100 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
                Emergency & Trauma
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Triage, Level I/II Trauma, and Emergency Department clinicians ready for acute hospital census demands.
              </p>
              <Link href="/jobs?search=Emergency" className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                <span>View ER Contracts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Surgical Services */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-green-500/60 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 border border-green-100 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
                Surgical Services & OR
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Circulating nurses, scrub nurses, and PACU recovery specialists for acute perioperative hospital suites.
              </p>
              <Link href="/jobs?search=OR" className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                <span>View OR Contracts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Telemetry / Stepdown */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-green-500/60 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 border border-green-100 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
                Telemetry & Progressive Care
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Cardiac telemetry, intermediate stepdown, and continuous cardiac monitoring expertise.
              </p>
              <Link href="/jobs?search=Telemetry" className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                <span>View Telemetry Contracts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Allied Health */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-green-500/60 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 border border-green-100 group-hover:scale-105 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
                Allied Health & Therapy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Physical therapists (PT), occupational therapists (OT), and certified speech pathologists.
              </p>
              <Link href="/jobs?department=Allied+Health" className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                <span>View Allied Health</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Diagnostic Imaging */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/90 hover:border-green-500/60 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-5 border border-green-100 group-hover:scale-105 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
                Diagnostic Imaging & Cath Lab
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                ARRT certified Radiologic Technologists, CT specialists, MRI techs, and Cath Lab technologists.
              </p>
              <Link href="/jobs?department=Imaging" className="text-xs font-bold text-green-700 hover:text-green-800 inline-flex items-center gap-1">
                <span>View Imaging Contracts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. PLACEMENT METHODOLOGY ("THE IDEAL WAY") */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-green-700 tracking-wider uppercase bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              Our Methodology
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 tracking-tight font-display">
              The Ideal Staffing Process
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              A straightforward, transparent process designed to support clinician careers and hospital staffing continuity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-green-400 flex items-center justify-center font-black text-lg shadow-md font-display">
                01
              </div>
              <h3 className="text-lg font-bold text-navy-950 font-display">
                Intake & Goal Alignment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We review clinical experience, certifications, target shift hours, and location preferences to identify the right match.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-green-400 flex items-center justify-center font-black text-lg shadow-md font-display">
                02
              </div>
              <h3 className="text-lg font-bold text-navy-950 font-display">
                Primary-Source Verification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct state licensing verification, background screenings, health clearance, and clinical competency checklists.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-green-400 flex items-center justify-center font-black text-lg shadow-md font-display">
                03
              </div>
              <h3 className="text-lg font-bold text-navy-950 font-display">
                Submittal & Interview
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct file presentation to hospital hiring managers, interview coordination, and transparent contract confirmations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-navy-950 text-green-400 flex items-center justify-center font-black text-lg shadow-md font-display">
                04
              </div>
              <h3 className="text-lg font-bold text-navy-950 font-display">
                Assignment Support
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                On-time weekly payroll, liaison check-ins, floor orientation assistance, and seamless contract extension options.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. OFFICIAL HEADQUARTERS & CONTACT BANNER */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-navy-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-clinical-grid-dark opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900 border border-green-500/40 text-green-300 text-xs font-bold">
            <MapPin className="w-4 h-4 text-green-400" />
            <span>Official Los Angeles Headquarters</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-display text-white">
              {COMPANY_INFO.name}
            </h2>
            <p className="text-green-400 text-lg sm:text-xl font-bold font-display">
              {COMPANY_INFO.tagline}
            </p>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              {COMPANY_INFO.address}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href={COMPANY_INFO.phoneHref}
              className="btn-accent w-full sm:w-auto py-4 px-8 text-base font-bold flex items-center justify-center gap-2 shadow-xl shadow-green-950/50"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call {COMPANY_INFO.phone}</span>
            </a>

            <Link
              href="/facilities#inquiry-form"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto py-4 px-8 rounded-xl text-base font-bold text-white bg-navy-900 hover:bg-navy-800 border border-navy-700 transition-all shadow-md"
            >
              <Building2 className="w-5 h-5 text-green-400" />
              <span>Submit Inquiry</span>
            </Link>
          </div>

          <div className="pt-8 border-t border-navy-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-green-400" />
              Fax: {COMPANY_INFO.fax}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-green-400" />
              Los Angeles, CA 90035
            </span>
            <a 
              href={COMPANY_INFO.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 font-medium"
            >
              idealhealthcarestaff.com
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
