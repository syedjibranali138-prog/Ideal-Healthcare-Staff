import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Printer, ExternalLink, ShieldCheck, HeartPulse } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-900">
      {/* Upper Footer: Value Proposition & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Official Logo Card */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block bg-white p-3.5 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <Image
                src="/images/logo.webp"
                alt="Ideal Healthcare Staffing"
                width={220}
                height={80}
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>
            
            <div className="space-y-1">
              <p className="text-base font-extrabold text-white font-display">
                {COMPANY_INFO.tagline}
              </p>
              <p className="text-xs text-green-400 font-semibold tracking-wide">
                {COMPANY_INFO.subtagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Ideal Healthcare Staffing delivers clinical workforce solutions connecting dedicated healthcare professionals with premier acute care hospitals and health systems.
            </p>

            {/* Official Contact Info */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-navy-800">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-slate-400">Phone:</span>
                <a 
                  href={COMPANY_INFO.phoneHref} 
                  className="font-bold text-white hover:text-green-400 transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Printer className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-slate-400">Fax:</span>
                <span className="font-semibold text-slate-200">{COMPANY_INFO.fax}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">Address:</span>
                <span className="text-slate-200 leading-relaxed">
                  {COMPANY_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-slate-400">Website:</span>
                <a 
                  href={COMPANY_INFO.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-400 hover:text-green-300 transition-colors font-medium underline underline-offset-2"
                >
                  {COMPANY_INFO.website.replace("https://", "").replace("/", "")}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links: Professionals */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4 font-display">
              Healthcare Professionals
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/jobs" className="hover:text-green-400 transition-colors">
                  Explore Travel Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs?department=Nursing" className="hover:text-green-400 transition-colors">
                  Nursing Specialties
                </Link>
              </li>
              <li>
                <Link href="/jobs?department=Allied+Health" className="hover:text-green-400 transition-colors">
                  Allied Health Careers
                </Link>
              </li>
              <li>
                <Link href="/jobs?department=Therapy" className="hover:text-green-400 transition-colors">
                  Therapy & Rehab Positions
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-green-400 transition-colors">
                  Traveler Pay & Benefits
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Facilities */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4 font-display">
              Healthcare Facilities
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/facilities" className="hover:text-green-400 transition-colors">
                  Hospital Staffing Solutions
                </Link>
              </li>
              <li>
                <Link href="/facilities#services" className="hover:text-green-400 transition-colors">
                  Rapid Response Coverage
                </Link>
              </li>
              <li>
                <Link href="/facilities#services" className="hover:text-green-400 transition-colors">
                  Travel Nurse Contracts
                </Link>
              </li>
              <li>
                <Link href="/facilities#services" className="hover:text-green-400 transition-colors">
                  Allied Health Placement
                </Link>
              </li>
              <li>
                <Link href="/facilities#inquiry-form" className="hover:text-green-400 transition-colors font-bold text-green-400">
                  Submit Staffing Request →
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Administration */}
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase text-white mb-4 font-display">
              Governance & Admin
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#eeo" className="hover:text-green-400 transition-colors">
                  Equal Opportunity Employer
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#credentialing" className="hover:text-green-400 transition-colors">
                  Clinical Verification
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-green-400 transition-colors text-slate-400">
                  Staffing Coordinator Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Compliance & Copyright Bottom Bar */}
      <div className="border-t border-navy-900 bg-black/40 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. {COMPANY_INFO.address}. Phone: <a href={COMPANY_INFO.phoneHref} className="text-slate-300 hover:text-green-400 font-bold">{COMPANY_INFO.phone}</a>.
          </p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/facilities#inquiry-form" className="hover:text-white transition-colors">
              Facility Inquiries
            </Link>
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
