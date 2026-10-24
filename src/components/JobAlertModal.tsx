"use client";

import { useState } from "react";
import { handleJobAlertSubscription } from "@/app/actions/alerts";
import { Bell, CheckCircle2, AlertCircle, X, ShieldCheck } from "lucide-react";
import { SPECIALTIES, US_STATES } from "@/lib/constants";

export default function JobAlertModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const res = await handleJobAlertSubscription(formData);

    setSubmitting(false);
    setStatus(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4 border border-teal-100">
            <Bell className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-navy-950 mb-1">
            Clinical Job Alerts
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Receive immediate notifications when new travel contracts or direct-hire openings match your clinical specialty and state preferences.
          </p>

          {status ? (
            <div className={`p-4 rounded-lg text-xs leading-relaxed mb-4 ${
              status.success ? "bg-teal-50 text-teal-800 border border-teal-200" : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}>
              <div className="flex items-start gap-2">
                {status.success ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
              {status.success && (
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 font-semibold text-teal-900 underline block"
                >
                  Close Window
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="nurse@hospital.org"
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Specialty
                </label>
                <select
                  name="specialty"
                  defaultValue=""
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Specialties</option>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Location / State
                </label>
                <select
                  name="state"
                  defaultValue=""
                  className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Any State (Nationwide)</option>
                  {US_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-accent py-2.5 text-sm font-semibold"
                >
                  {submitting ? "Saving Preferences..." : "Subscribe to Job Alerts"}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Zero spam. Unsubscribe anytime with 1 click.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
