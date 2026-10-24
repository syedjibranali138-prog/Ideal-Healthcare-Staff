"use client";

import { useState } from "react";
import { handleApplicationSubmit } from "@/app/actions/application";
import { US_STATES, SPECIALTIES } from "@/lib/constants";
import { CheckCircle2, AlertCircle, UploadCloud, FileText, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  defaultSpecialty?: string;
}

export default function ApplicationForm({
  jobId,
  jobTitle,
  defaultSpecialty,
}: ApplicationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Size check (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("The selected resume file exceeds the 5MB size limit. Please upload a smaller document.");
        setSelectedFile(null);
        e.target.value = "";
        return;
      }
      // Type check
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setErrorMsg("Invalid file format. Please upload your resume in PDF (.pdf) or Word (.doc, .docx) format.");
        setSelectedFile(null);
        e.target.value = "";
        return;
      }
      setErrorMsg(null);
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Append jobId & jobTitle
    formData.set("jobId", jobId);
    formData.set("jobTitle", jobTitle);

    if (selectedFile) {
      formData.set("resume", selectedFile);
    }

    const res = await handleApplicationSubmit(formData);
    setSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error || "Submission failed. Please verify your details and try again.");
    } else {
      setSuccessData({
        id: res.applicationId || "IHS-APP",
        message: res.message || "Application received.",
      });
    }
  };

  if (successData) {
    return (
      <div className="bg-white border-2 border-green-200 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-navy-950 mb-2 font-display">
          Application Received
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Thank you for applying. Your application has been logged into our secure clinical recruitment database. A dedicated clinical recruiter will review your credentials and contact you directly.
        </p>
        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-700 mb-8 inline-block">
          Candidate Application ID: <span className="font-bold text-navy-950">{successData.id}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/jobs"
            className="btn-primary text-sm px-6 py-2.5"
          >
            Explore More Jobs
          </Link>
          <Link
            href="/"
            className="btn-secondary text-sm px-6 py-2.5"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">
          Candidate Application
        </span>
        <h3 className="text-xl font-bold text-navy-950">
          {jobTitle}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Complete the required fields below. Your information is processed under confidential healthcare staffing privacy safeguards.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Legal Name *
          </label>
          <input
            required
            type="text"
            name="fullName"
            placeholder="e.g. Christine Adams, RN"
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="candidate@email.com"
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Mobile / Telephone *
          </label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="(555) 000-0000"
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Primary Specialty */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Primary Specialty *
          </label>
          <select
            required
            name="specialty"
            defaultValue={defaultSpecialty || SPECIALTIES[0]}
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            {SPECIALTIES.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Years of Experience *
          </label>
          <select
            required
            name="yearsOfExperience"
            defaultValue="2-4 Years"
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            <option value="1-2 Years">1 - 2 Years</option>
            <option value="2-4 Years">2 - 4 Years</option>
            <option value="5-8 Years">5 - 8 Years</option>
            <option value="8+ Years">8+ Years</option>
          </select>
        </div>

        {/* Primary License State */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Primary Nursing / Clinical License State
          </label>
          <select
            name="primaryLicenseState"
            defaultValue="TX"
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            <option value="Compact (eNLC)">Multistate Compact License (eNLC)</option>
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* Resume Upload */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Resume / CV Document (PDF, DOC, DOCX — Max 5MB)
          </label>
          
          {!selectedFile ? (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-lg cursor-pointer bg-slate-50/50 hover:bg-teal-50/20 transition-all">
              <UploadCloud className="w-8 h-8 text-teal-600 mb-2" />
              <span className="text-sm font-semibold text-navy-950">
                Click to browse or drag resume file here
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Accepted: .pdf, .doc, .docx up to 5MB
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between p-3.5 bg-teal-50/70 border border-teal-200 rounded-lg">
              <div className="flex items-center gap-3 truncate">
                <FileText className="w-6 h-6 text-teal-700 shrink-0" />
                <div className="truncate text-xs">
                  <p className="font-semibold text-navy-950 truncate">{selectedFile.name}</p>
                  <p className="text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 hover:bg-teal-100 rounded text-slate-500 hover:text-slate-700"
                aria-label="Remove uploaded file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Clinical Note */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Optional Note to Clinical Recruiter
          </label>
          <textarea
            rows={3}
            name="coverNote"
            placeholder="Available start date, shift preference (day/night), current certifications (CCRN, TNCC, BLS, ACLS), or specific facility preferences..."
            className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Consent Checkbox */}
        <div className="sm:col-span-2 pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              required
              type="checkbox"
              name="consent"
              defaultChecked
              className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              I certify that the information provided is accurate and authorize Ideal Healthcare Staffing to contact me via phone, email, or SMS regarding healthcare staffing opportunities. Resumes are stored in secure, private candidate storage in compliance with our{" "}
              <Link href="/privacy-policy" className="text-teal-700 underline font-medium">
                Privacy Policy
              </Link>.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>Encrypted transmission & primary source license verification</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-accent px-8 py-3 text-sm font-semibold w-full sm:w-auto"
        >
          {submitting ? "Submitting Application..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
