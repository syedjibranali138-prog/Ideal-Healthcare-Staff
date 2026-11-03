import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FacilityInquiryForm from "@/components/FacilityInquiryForm";
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  FileCheck2, 
  HeartPulse, 
  PhoneCall, 
  HelpCircle,
  Stethoscope,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Users,
  MapPin,
  Printer
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Healthcare Facilities Staffing Solutions | Hospital Clinical Coverage",
  description:
    "Partner with Ideal Healthcare Staffing for pre-credentialed travel nurses, allied health specialists, and responsive staffing coverage across acute care hospitals.",
};

export default function FacilitiesPage() {
  return (
    <div className="bg-[#FBFBFA] dark:bg-[#070E1A] min-h-screen transition-colors duration-200">
      
      {/* ==================================================================== */}
      {/* 1. B2B HERO SECTION: OFFICIAL NAVY & FRESH GREEN */}
      {/* ==================================================================== */}
      <section className="bg-navy-950 dark:bg-black text-white py-20 lg:py-28 border-b border-navy-900 dark:border-dark-border relative overflow-hidden">
        {/* Subtle geometric pattern & ambient green glow */}
        <div className="absolute inset-0 bg-clinical-grid-dark opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 dark:bg-dark-surface border border-green-500/30 text-green-300 text-xs font-bold shadow-md">
                <Building2 className="w-3.5 h-3.5 text-green-400" />
                <span>Hospital & Facility Workforce Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
                Dependable healthcare staffing to protect patient care continuity.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                Ideal Healthcare Staffing delivers pre-screened, primary-source verified travel nurses, allied clinicians, and per diem staff to acute care health systems nationwide.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#inquiry-form"
                  className="btn-accent py-4 px-8 text-base font-bold text-center shadow-xl shadow-green-950/40"
                >
                  Request Staffing Coverage
                </a>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-navy-900 dark:bg-dark-surface hover:bg-navy-800 dark:hover:bg-dark-card border border-navy-700 dark:border-dark-border transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4 text-green-400" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>

              <div className="pt-6 border-t border-navy-800 dark:border-dark-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="font-semibold">Primary-Source Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="font-semibold">Responsive Coordinators</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="font-semibold">Los Angeles & Nationwide</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-navy-700/80 dark:border-dark-border shadow-2xl bg-navy-900 group">
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern accredited hospital facility campus"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                </div>
                <div className="p-6 bg-navy-950 dark:bg-dark-surface border-t border-navy-800 dark:border-dark-border text-xs text-slate-300 space-y-2">
                  <p className="font-bold text-white text-sm font-display">
                    Adaptive Healthcare Workforce Partnerships
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    From single traveler placements to multi-unit census coverage, our staffing coordinators match the precise clinical qualifications and shift requirements of your hospital.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. STAFFING SERVICE CATEGORIES */}
      {/* ==================================================================== */}
      <section id="services" className="py-20 lg:py-24 bg-white dark:bg-dark-bg border-b border-slate-200/90 dark:border-dark-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-green-700 dark:text-green-400 tracking-wider uppercase bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 px-3 py-1 rounded-full">
              Clinical Solutions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight font-display">
              Hospital & Healthcare Staffing Services
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Structured around actual operational hospital requirements and verifiable compliance standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Travel Nursing */}
            <div className="p-8 rounded-3xl border border-slate-200/90 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-green-500/60 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 flex items-center justify-center mb-6 border border-green-100 dark:border-green-900/50 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-navy-950 dark:text-white mb-3 font-display">
                  Travel Nursing (13-Week Contracts)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Experienced Registered Nurses ready for immediate floor integration across ICU, Emergency, Med/Surg, Telemetry, OR, and NICU units.
                </p>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Hospital bedside experience across specialized units</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Standard 36 or 48-hour weekly contract commitments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Contract extensions and direct permanent conversion terms</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-border">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 dark:text-green-400 hover:text-green-800 transition-colors"
                >
                  <span>Request Travel Nurses</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Rapid Response & Crisis */}
            <div className="p-8 rounded-3xl border border-slate-200/90 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-green-500/60 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 flex items-center justify-center mb-6 border border-green-100 dark:border-green-900/50 group-hover:scale-105 transition-transform">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-navy-950 dark:text-white mb-3 font-display">
                  Rapid Response Coverage
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Fast candidate matching for unexpected census surges, unit expansions, EMR rollouts, or critical hospital leaves.
                </p>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Expedited candidate profile presentation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Short-term and flexible duration crisis assignments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Adaptable, pre-screened critical care clinicians</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-border">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 dark:text-green-400 hover:text-green-800 transition-colors"
                >
                  <span>Request Rapid Coverage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Allied Health */}
            <div className="p-8 rounded-3xl border border-slate-200/90 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-green-500/60 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400 flex items-center justify-center mb-6 border border-green-100 dark:border-green-900/50 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-navy-950 dark:text-white mb-3 font-display">
                  Allied Health & Therapy
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Diagnostic imaging technicians, respiratory care practitioners, and rehabilitation therapists to keep departmental workflows on schedule.
                </p>
                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>ARRT certified CT, MRI, and Rad Technologists</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Certified Respiratory Care Practitioners (RRT)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                    <span>Licensed PT, OT, and SLP rehabilitation therapists</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-border">
                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 dark:text-green-400 hover:text-green-800 transition-colors"
                >
                  <span>Request Allied Staff</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. VERIFICATION & QUALITY STANDARDS */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-slate-50 dark:bg-dark-surface/50 border-b border-slate-200/90 dark:border-dark-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-green-700 dark:text-green-400 tracking-wider uppercase bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 px-3 py-1 rounded-full">
              Quality Assurance
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight font-display">
              Rigorous Credentialing Standards
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Every clinician file submitted to your hospital undergoes comprehensive primary-source verification before presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white dark:bg-dark-surface p-7 rounded-2xl border border-slate-200/90 dark:border-dark-border shadow-sm">
              <span className="text-2xl font-black text-green-600/40 font-display">STEP 1</span>
              <h3 className="text-base font-bold text-navy-950 dark:text-white mt-2 mb-2 font-display">
                Licensure & Background
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct state licensing verification with disciplinary action checks and nationwide multi-jurisdiction criminal background clearance.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface p-7 rounded-2xl border border-slate-200/90 dark:border-dark-border shadow-sm">
              <span className="text-2xl font-black text-green-600/40 font-display">STEP 2</span>
              <h3 className="text-base font-bold text-navy-950 dark:text-white mt-2 mb-2 font-display">
                Clinical Health Screenings
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Comprehensive 10-panel drug screens, TB clearance, immunization titers (MMR, Varicella, Hep B), and annual fit testing.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface p-7 rounded-2xl border border-slate-200/90 dark:border-dark-border shadow-sm">
              <span className="text-2xl font-black text-green-600/40 font-display">STEP 3</span>
              <h3 className="text-base font-bold text-navy-950 dark:text-white mt-2 mb-2 font-display">
                Interview & Confirmation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Conduct brief manager interviews with your unit director and issue clear working confirmations with start dates.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-surface p-7 rounded-2xl border border-slate-200/90 dark:border-dark-border shadow-sm">
              <span className="text-2xl font-black text-green-600/40 font-display">STEP 4</span>
              <h3 className="text-base font-bold text-navy-950 dark:text-white mt-2 mb-2 font-display">
                Orientation & Support
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Candidate reports for hospital orientation. Our staffing coordinator conducts ongoing check-ins to ensure quality care.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. FACILITY INQUIRY FORM */}
      {/* ==================================================================== */}
      <section id="inquiry-form" className="py-20 lg:py-24 bg-white dark:bg-dark-bg border-b border-slate-200/90 dark:border-dark-border scroll-mt-20 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-green-700 dark:text-green-400 tracking-wider uppercase bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 px-3 py-1 rounded-full">
              Facility Inquiries
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight font-display">
              Submit a Healthcare Facility Staffing Request
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Our staffing coordinators will review your clinical requirements and contact you promptly with qualified candidate profiles. You can also call us directly at <a href={COMPANY_INFO.phoneHref} className="text-green-700 dark:text-green-400 font-bold hover:underline">{COMPANY_INFO.phone}</a>.
            </p>
          </div>

          <FacilityInquiryForm />

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. FACILITY FAQ */}
      {/* ==================================================================== */}
      <section className="py-20 lg:py-24 bg-slate-50 dark:bg-dark-surface/50 border-b border-slate-200/90 dark:border-dark-border transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-green-700 dark:text-green-400 tracking-wider uppercase bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 px-3 py-1 rounded-full">
              Facility Questions
            </span>
            <h2 className="mt-3 text-3xl font-black text-navy-950 dark:text-white tracking-tight font-display">
              Frequently Asked Facility Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-dark-border bg-white dark:bg-dark-surface shadow-sm">
              <h3 className="text-sm font-bold text-navy-950 dark:text-white flex items-center gap-2 font-display">
                <HelpCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                What primary source credentialing documents are provided?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                Every candidate file includes direct state board license verification, AHA BLS/ACLS/PALS certification cards, 10-panel drug screening, nationwide criminal background checks, immunization/titer records, and clinical competency checklists.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-dark-border bg-white dark:bg-dark-surface shadow-sm">
              <h3 className="text-sm font-bold text-navy-950 dark:text-white flex items-center gap-2 font-display">
                <HelpCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                What happens if a placed clinician is not an optimal clinical fit?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                We maintain an orientation guarantee period during which the facility may request an immediate replacement if a clinician does not meet the unit’s clinical performance standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-dark-border bg-white dark:bg-dark-surface shadow-sm">
              <h3 className="text-sm font-bold text-navy-950 dark:text-white flex items-center gap-2 font-display">
                <HelpCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                Can our facility convert a traveler to full-time hospital staff?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                Yes. Our agreements outline straightforward permanent conversion terms after completion of standard contract commitments.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
