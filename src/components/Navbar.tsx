"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Briefcase, 
  Building2, 
  PhoneCall, 
  ChevronRight, 
  Stethoscope,
  Lock,
  MapPin,
  Sparkles
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Professional Ticker / Bar */}
      <div className="bg-navy-950 text-slate-300 text-[11px] py-2 px-4 sm:px-8 border-b border-navy-900 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-bold text-green-400 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{COMPANY_INFO.tagline}</span>
            </span>
            <span className="text-navy-700">•</span>
            <span className="text-slate-300 font-medium hidden lg:inline">
              {COMPANY_INFO.subtagline}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={COMPANY_INFO.phoneHref} 
              className="flex items-center gap-1.5 text-slate-200 hover:text-green-400 transition-colors font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-green-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-navy-700">|</span>
            <span className="text-slate-400 text-[11px] hidden xl:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>Los Angeles, CA</span>
            </span>
            <span className="text-navy-700 hidden xl:inline">|</span>
            <Link 
              href="/admin" 
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors font-medium"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Portal Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          
          {/* Official Attached Logo */}
          <Link href="/" className="flex items-center group py-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl">
            <div className="relative">
              <Image
                src="/images/logo.webp"
                alt="Ideal Healthcare Staffing"
                width={220}
                height={75}
                priority
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/jobs"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                isActive("/jobs") && !pathname.startsWith("/apply") 
                  ? "bg-green-50 text-green-800 border border-green-200 shadow-sm" 
                  : "text-slate-700 hover:text-navy-950 hover:bg-slate-50"
              }`}
            >
              <Briefcase className="w-4 h-4 text-green-600" />
              <span>Find Travel Jobs</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </Link>

            <Link
              href="/facilities"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                isActive("/facilities") 
                  ? "bg-green-50 text-green-800 border border-green-200 shadow-sm" 
                  : "text-slate-700 hover:text-navy-950 hover:bg-slate-50"
              }`}
            >
              <Building2 className="w-4 h-4 text-navy-900" />
              <span>For Healthcare Facilities</span>
              <span className="text-[10px] uppercase font-extrabold bg-navy-100 text-navy-900 px-1.5 py-0.5 rounded">
                B2B
              </span>
            </Link>

            <Link
              href="/#specialties"
              className="px-3.5 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-navy-950 hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <Stethoscope className="w-4 h-4 text-slate-400" />
              <span>Specialties</span>
            </Link>

            <Link
              href="/privacy-policy"
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive("/privacy-policy") 
                  ? "bg-green-50 text-green-800 border border-green-200 shadow-sm" 
                  : "text-slate-700 hover:text-navy-950 hover:bg-slate-50"
              }`}
            >
              Compliance & Privacy
            </Link>
          </nav>

          {/* Dual Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-navy-950 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200/90"
            >
              <Briefcase className="w-3.5 h-3.5 text-green-600" />
              <span>Search Open Jobs</span>
            </Link>

            <Link
              href="/facilities#inquiry-form"
              className="btn-accent text-xs font-bold px-5 py-2.5 shadow-sm hover:shadow-md flex items-center gap-1.5 rounded-xl"
            >
              <span>Request Staffing</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-700 hover:text-navy-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-5 pt-4 pb-6 space-y-4 shadow-2xl">
          <div className="space-y-1.5">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-slate-100"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-slate-100"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-green-600" />
                <span>Find Travel Jobs</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-green-500" />
            </Link>
            <Link
              href="/facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-slate-100"
            >
              <Building2 className="w-4 h-4 text-navy-900" />
              <span>For Healthcare Facilities</span>
            </Link>
            <Link
              href="/#specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-slate-100"
            >
              <Stethoscope className="w-4 h-4 text-slate-400" />
              <span>Specialties & Disciplines</span>
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 hover:bg-slate-100"
            >
              Compliance & Privacy
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 gap-3">
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-accent w-full py-3 text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Search Open Jobs</span>
            </Link>

            <Link
              href="/facilities#inquiry-form"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full py-3 text-center text-sm font-bold flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-green-400" />
              <span>Request Staffing Coverage</span>
            </Link>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5 text-xs text-slate-600 px-1">
              <a href={COMPANY_INFO.phoneHref} className="font-bold text-navy-950 hover:text-green-600 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-green-600" />
                <span>Call {COMPANY_INFO.phone}</span>
              </a>
              <div className="text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
