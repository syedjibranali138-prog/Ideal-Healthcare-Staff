"use client";

import { useState } from "react";
import { handleFacilityInquirySubmit } from "@/app/actions/facility";
import { US_STATES, FACILITY_TYPES, STAFFING_NEED_CATEGORIES } from "@/lib/constants";
import { CheckCircle2, AlertCircle, Building2, Send, ShieldAlert } from "lucide-react";

export default function FacilityInquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await handleFacilityInquirySubmit(formData);

    setSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.error || "Submission failed. Please check your form fields.");
    } else {
      setSuccessData({
        id: res.inquiryId || "IHS-INQ",
        message: res.message || "Inquiry received.",
      });
    }
  };

  if (successData) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-8 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-navy-950 mb-2 font-display">
          Staffing Inquiry Received
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed mb-6">
          {successData.message}
        </p>
        <div className="inline-block bg-white px-4 py-2 rounded-xl border border-green-200 text-xs font-mono text-slate-700 mb-6">
          Reference File: <span className="font-semibold text-navy-950">{successData.id}</span>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setSuccessData(null)}
            className="btn-primary text-sm px-6 py-2"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl">
      <div className="border-b border-slate-100 pb-6 mb-8">
        <h3 className="text-2xl font-black text-navy-950 flex items-center gap-2.5 tracking-tight font-display">
          <Building2 className="w-6 h-6 text-green-600" />
          Request Staffing Support
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
          Complete this form to submit your staffing requirements to our clinical recruitment coordinators. We provide verified candidates within 24 to 48 hours for emergency surge needs.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Facility Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Healthcare Facility / System Name *
          </label>
          <input
            required
            type="text"
            name="facilityName"
            placeholder="e.g. St. Jude Regional Medical Center"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Contact Name *
          </label>
          <input
            required
            type="text"
            name="contactName"
            placeholder="e.g. Robert Miller"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Title / Department
          </label>
          <input
            type="text"
            name="contactTitle"
            placeholder="e.g. Chief Nursing Officer / Staffing Specialist"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Work Email */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Business Email *
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="name@hospital.org"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Direct Telephone Number *
          </label>
          <input
            required
            type="tel"
            name="phone"
            placeholder="(555) 000-0000"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            City *
          </label>
          <input
            required
            type="text"
            name="city"
            placeholder="e.g. Houston"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            State *
          </label>
          <select
            required
            name="state"
            defaultValue="TX"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            {US_STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* Facility Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Facility Type *
          </label>
          <select
            required
            name="facilityType"
            defaultValue="Acute Care Hospital"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            {FACILITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Staffing Needs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Primary Staffing Solution *
          </label>
          <select
            required
            name="staffingNeeds"
            defaultValue={STAFFING_NEED_CATEGORIES[0]}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            {STAFFING_NEED_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Start Timeline / Urgency */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Start Timeline / Coverage Urgency
          </label>
          <select
            name="urgency"
            defaultValue="Standard (2-4 Weeks)"
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          >
            <option value="Immediate / Crisis (24-48 hrs)">Immediate / Crisis Need (24 - 48 Hours)</option>
            <option value="Standard (2-4 Weeks)">Standard Assignment Start (2 - 4 Weeks)</option>
            <option value="Future Seasonal / Planned Expansion">Future Seasonal / Planned Unit Opening</option>
          </select>
        </div>

        {/* Details / Shift Specifications */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Staffing Requirements & Unit Specifications
          </label>
          <textarea
            rows={4}
            name="details"
            placeholder="Please detail required specialties (e.g. 4 ICU Night Shift RNs, 2 Cath Lab Techs), EMR requirements (Epic, Cerner), patient ratio targets, or specific onboarding requirements..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-teal-600 shrink-0" />
          <span>All inquiries are handled under non-disclosure confidentiality.</span>
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="btn-accent px-8 py-3 text-sm font-semibold w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {submitting ? (
            <span>Transmitting Request...</span>
          ) : (
            <>
              <span>Submit Staffing Order</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
