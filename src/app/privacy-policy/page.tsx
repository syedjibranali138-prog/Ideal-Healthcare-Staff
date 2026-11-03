import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy & Clinical Compliance | Ideal Healthcare Staffing",
  description:
    "Review Ideal Healthcare Staffing's privacy policy, candidate data protection practices, and clinical compliance protocols.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FBFBFA] dark:bg-[#070E1A] min-h-screen py-12 sm:py-16 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-dark-border pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 text-green-800 dark:text-green-300 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Healthcare Staffing Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-950 dark:text-white tracking-tight font-display">
            Privacy Policy & Compliance Terms
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last Updated: {new Date().getFullYear()} • Ideal Healthcare Staffing LLC
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border rounded-2xl p-8 sm:p-12 shadow-sm space-y-10 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-display">
              1. Commitment to Clinical Candidate Privacy
            </h2>
            <p>
              Ideal Healthcare Staffing (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects the confidentiality of healthcare professionals and institutional facility partners. This Privacy Policy governs the collection, use, transmission, and secure retention of personally identifiable information (PII) and professional clinical credentials submitted through our digital portal and recruitment communication channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-display">
              2. Information We Collect
            </h2>
            <p>
              To effectively match clinicians with hospital assignments and verify primary-source qualifications, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>Full legal name, contact telephone numbers, postal address, and email addresses.</li>
              <li>State professional nursing or allied health license numbers and expiration dates.</li>
              <li>Clinical certifications (AHA BLS, ACLS, PALS, TNCC, CCRN, etc.).</li>
              <li>Curriculum vitae / resume, work history, clinical specialties, and unit experience.</li>
              <li>Facility contact details, staffing requirements, and census coverage specifications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-display">
              3. Private Resume Storage & Candidate Representation
            </h2>
            <p>
              Resumes and clinical credential files uploaded through our portal are stored in private, encrypted cloud storage buckets. We enforce strict role-based access controls to guarantee that candidate files are never accessible to the public internet. Furthermore, we never submit a clinician&apos;s profile or credentials to any healthcare facility or vendor management system (VMS) without first discussing the assignment and obtaining explicit verbal or written authorization.
            </p>
          </section>

          <section id="eeo" className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-display">
              4. Equal Opportunity Employer (EOE) Policy
            </h2>
            <p>
              Ideal Healthcare Staffing is an Equal Opportunity Employer. We maintain a zero-tolerance policy against unlawful discrimination or harassment in recruitment, placement, pay rates, or terms of assignment based upon race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, genetic information, or any other characteristic protected by federal, state, or local laws.
            </p>
          </section>

          <section id="credentialing" className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-display">
              5. Primary Source Verification & Compliance Standards
            </h2>
            <p>
              In accordance with Joint Commission healthcare staffing standards, all candidates placed in hospital settings undergo rigorous primary-source verification, including active license status checks directly with state licensing boards, Office of Inspector General (OIG) exclusions, General Services Administration (GSA) checks, and 10-panel drug screening.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-navy-950 dark:text-white font-display">
              6. Communication & Unsubscribe Rights
            </h2>
            <p>
              By submitting an application or subscribing to job alerts, you consent to receive direct communications regarding clinical opportunities via email, phone, or SMS. You may opt out or unsubscribe from notifications at any time by following the instructions in alert messages or by contacting our office by phone at {COMPANY_INFO.phone}.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-100 dark:border-dark-border pt-6">
            <h2 className="text-lg font-bold text-navy-950 dark:text-white font-display">
              7. Contact Our Compliance Office
            </h2>
            <p>
              For questions regarding candidate data protection, state privacy rights (such as CCPA requests), or credentialing verification, please contact:
            </p>
            <div className="bg-slate-50 dark:bg-dark-card p-5 rounded-2xl border border-slate-200 dark:border-dark-border text-xs space-y-1.5 text-slate-800 dark:text-slate-300">
              <p className="font-bold text-navy-950 dark:text-white font-sans text-sm">{COMPANY_INFO.name}</p>
              <p>Address: {COMPANY_INFO.address}</p>
              <p>
                Phone:{" "}
                <a href={COMPANY_INFO.phoneHref} className="text-green-700 dark:text-green-400 font-bold hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </p>
              <p>Fax: {COMPANY_INFO.fax}</p>
              <p>
                Website:{" "}
                <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="text-green-700 dark:text-green-400 hover:underline">
                  {COMPANY_INFO.website}
                </a>
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
