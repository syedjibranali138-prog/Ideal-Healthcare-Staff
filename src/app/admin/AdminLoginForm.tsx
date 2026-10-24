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
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC]">
      <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-lg max-w-md w-full">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-navy-950 text-teal-400 flex items-center justify-center mx-auto mb-4 border border-navy-800 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-navy-950 tracking-tight">
            Clinical Coordinator Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Restricted administrative access for Ideal Healthcare Staffing coordinators.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Administrative Passcode
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password..."
              className="w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-2.5 text-sm font-semibold shadow-md"
          >
            {submitting ? "Authenticating..." : "Authorize Access"}
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-slate-100 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Encrypted internal session • HIPAA compliant governance</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Development Default Passcode: <span className="font-mono text-slate-600 font-semibold">ideal2025!</span>
          </p>
        </div>

      </div>
    </div>
  );
}
