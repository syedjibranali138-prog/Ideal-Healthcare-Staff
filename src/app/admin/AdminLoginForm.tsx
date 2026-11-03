"use client";

import { useState } from "react";
import { adminLogin } from "@/app/actions/admin";
import { Lock, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const res = await adminLogin(password);
    setSubmitting(false);

    if (res.success) {
      window.location.reload();
    } else {
      setErrorMsg(res.error || "Authentication failed.");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC] dark:bg-[#070E1A] transition-colors">
      <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border rounded-2xl p-8 sm:p-10 shadow-lg max-w-md w-full">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-navy-950 dark:bg-dark-card text-green-400 flex items-center justify-center mx-auto mb-4 border border-navy-800 dark:border-dark-border shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-navy-950 dark:text-white tracking-tight font-display">
            Clinical Coordinator Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Restricted administrative access for Ideal Healthcare Staffing coordinators.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Administrative Passcode
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-dark-border bg-slate-50 dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-3 text-sm font-bold shadow-md rounded-xl"
          >
            {submitting ? "Authenticating..." : "Authorize Access"}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-slate-100 dark:border-dark-border text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            <span>Encrypted internal session • HIPAA compliant governance</span>
          </div>
        </div>

      </div>
    </div>
  );
}
