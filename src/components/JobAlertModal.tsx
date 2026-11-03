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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-slate-200/90 dark:border-dark-border max-w-md w-full overflow-hidden relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-dark-card transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4 border border-green-100 dark:border-green-900/50">
            <Bell className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-1 font-display">
            Clinical Job Alerts
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Receive immediate notifications when new travel contracts or hospital direct-hire openings match your specialty and preferred states.
          </p>

          {status ? (
            <div className={`p-4 rounded-xl text-xs leading-relaxed mb-4 ${
              status.success 
                ? "bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60" 
                : "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60"
            }`}>
              <div className="flex items-start gap-2.5">
                {status.success ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
              {status.success && (
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 font-bold text-green-900 dark:text-green-300 underline block"
                >
                  Close Window
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="nurse@hospital.org"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-dark-border bg-slate-50 dark:bg-dark-card text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Target Specialty
                </label>
                <select
                  name="specialty"
                  defaultValue=""
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Location / State
                </label>
                <select
                  name="state"
                  defaultValue=""
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full btn-accent py-3 text-xs font-bold rounded-xl"
                >
                  {submitting ? "Saving Preferences..." : "Subscribe to Job Alerts"}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-400 text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span>Zero spam. Unsubscribe anytime with 1 click.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
