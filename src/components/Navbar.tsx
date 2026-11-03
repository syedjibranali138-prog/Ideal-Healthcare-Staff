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
  Bell,
  ShieldCheck
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import ThemeToggle from "@/components/ThemeToggle";
import JobAlertModal from "@/components/JobAlertModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#030A16]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm transition-colors duration-300">
        {/* Top Institutional Ticker / Bar */}
        <div className="bg-[#02060E] text-slate-300 text-[11px] py-2 px-4 sm:px-8 border-b border-white/10 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5 font-bold text-green-400 tracking-wide">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>{COMPANY_INFO.tagline}</span>
              </span>
              <span className="text-slate-600 dark:text-slate-700">•</span>
              <span className="text-slate-300 dark:text-slate-400 font-medium hidden lg:inline">
                {COMPANY_INFO.subtagline}
              </span>
            </div>

            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setAlertModalOpen(true)}
                className="flex items-center gap-1.5 text-slate-300 hover:text-green-400 transition-colors font-medium cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 text-green-400" />
                <span>Job Alerts</span>
              </button>
              <span className="text-slate-700">|</span>
              <a 
                href={COMPANY_INFO.phoneHref} 
                className="flex items-center gap-1.5 text-slate-200 hover:text-green-400 transition-colors font-bold"
              >
                <PhoneCall className="w-3.5 h-3.5 text-green-400" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400 text-[11px] hidden xl:flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Los Angeles, CA</span>
              </span>
              <span className="text-slate-700 hidden xl:inline">|</span>
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

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Official Logo */}
            <Link 
              href="/" 
              className="flex items-center group py-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl"
            >
              <div className="relative flex items-center">
                <Image
                  src="/images/logo.webp"
                  alt="Ideal Healthcare Staffing"
                  width={215}
                  height={65}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] dark:brightness-105"
                />
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/jobs"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive("/jobs") && !pathname.startsWith("/apply") 
                    ? "bg-green-500/10 dark:bg-green-950/50 text-green-800 dark:text-green-300 border border-green-500/30 dark:border-green-500/40 shadow-sm" 
                    : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-100/80 dark:hover:bg-white/5"
                }`}
              >
                <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Find Travel Jobs</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </Link>

              <Link
                href="/facilities"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive("/facilities") 
                    ? "bg-green-500/10 dark:bg-green-950/50 text-green-800 dark:text-green-300 border border-green-500/30 dark:border-green-500/40 shadow-sm" 
                    : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-100/80 dark:hover:bg-white/5"
                }`}
              >
                <Building2 className="w-4 h-4 text-navy-900 dark:text-sky-400" />
                <span>For Facilities</span>
                <span className="text-[10px] uppercase font-extrabold bg-navy-100 dark:bg-navy-900/80 text-navy-900 dark:text-sky-300 px-1.5 py-0.5 rounded border border-navy-200 dark:border-navy-700">
                  B2B
                </span>
              </Link>

              <Link
                href="/#specialties"
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all duration-200 flex items-center gap-1.5"
              >
                <Stethoscope className="w-4 h-4 text-slate-400" />
                <span>Specialties</span>
              </Link>

              <Link
                href="/privacy-policy"
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive("/privacy-policy") 
                    ? "bg-green-500/10 dark:bg-green-950/50 text-green-800 dark:text-green-300 border border-green-500/30 dark:border-green-500/40 shadow-sm" 
                    : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-100/80 dark:hover:bg-white/5"
                }`}
              >
                Compliance & Privacy
              </Link>
            </nav>

            {/* Actions: Theme Toggle, Job Alerts, and Staffing CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Dark/Light Theme Toggle */}
              <ThemeToggle />

              {/* Quick Job Alert Bell */}
              <button
                type="button"
                onClick={() => setAlertModalOpen(true)}
                className="group relative p-2.5 rounded-xl border border-slate-200 dark:border-navy-700/80 bg-slate-100/90 dark:bg-navy-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-navy-800 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/40 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                title="Subscribe to Job Alerts"
                aria-label="Subscribe to Job Alerts"
              >
                <Bell className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              </button>

              <Link
                href="/facilities#inquiry-form"
                className="btn-accent text-xs font-bold px-5 py-2.5 shadow-md hover:shadow-xl flex items-center gap-1.5 rounded-xl hover-lift cursor-pointer"
              >
                <span>Request Staffing</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger & Theme Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-dark-border bg-white dark:bg-dark-surface px-5 pt-4 pb-6 space-y-4 shadow-2xl transition-colors">
            <div className="space-y-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                Home
              </Link>
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>Find Travel Jobs</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </Link>
              <Link
                href="/facilities"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                <Building2 className="w-4 h-4 text-navy-900 dark:text-sky-400" />
                <span>For Healthcare Facilities</span>
              </Link>
              <Link
                href="/#specialties"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                <Stethoscope className="w-4 h-4 text-slate-400" />
                <span>Specialties & Disciplines</span>
              </Link>
              <Link
                href="/privacy-policy"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-dark-card"
              >
                Compliance & Privacy
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAlertModalOpen(true);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-base font-bold text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-dark-card"
              >
                <Bell className="w-4 h-4" />
                <span>Subscribe to Job Alerts</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-dark-border grid grid-cols-1 gap-3">
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

              <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex flex-col gap-1.5 text-xs text-slate-600 dark:text-slate-400 px-1">
                <a href={COMPANY_INFO.phoneHref} className="font-bold text-navy-950 dark:text-white hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
                <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Embedded Job Alert Modal */}
      <JobAlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
      />
    </>
  );
}
