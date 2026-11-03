"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, RotateCcw, SlidersHorizontal, Check } from "lucide-react";
import { US_STATES, DEPARTMENTS, SPECIALTIES, EMPLOYMENT_TYPES } from "@/lib/constants";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [department, setDepartment] = useState(searchParams.get("department") || "all");
  const [specialty, setSpecialty] = useState(searchParams.get("specialty") || "all");
  const [state, setState] = useState(searchParams.get("state") || "all");
  const [employmentType, setEmploymentType] = useState(searchParams.get("employmentType") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");

  // Apply filters by pushing query params to URL
  const applyFilters = (overrides?: {
    search?: string;
    department?: string;
    specialty?: string;
    state?: string;
    employmentType?: string;
    sortBy?: string;
  }) => {
    const params = new URLSearchParams();

    const currentSearch = overrides?.search !== undefined ? overrides.search : search;
    const currentDept = overrides?.department !== undefined ? overrides.department : department;
    const currentSpec = overrides?.specialty !== undefined ? overrides.specialty : specialty;
    const currentState = overrides?.state !== undefined ? overrides.state : state;
    const currentEmp = overrides?.employmentType !== undefined ? overrides.employmentType : employmentType;
    const currentSort = overrides?.sortBy !== undefined ? overrides.sortBy : sortBy;

    if (currentSearch.trim()) params.set("search", currentSearch.trim());
    if (currentDept && currentDept !== "all") params.set("department", currentDept);
    if (currentSpec && currentSpec !== "all") params.set("specialty", currentSpec);
    if (currentState && currentState !== "all") params.set("state", currentState);
    if (currentEmp && currentEmp !== "all") params.set("employmentType", currentEmp);
    if (currentSort && currentSort !== "newest") params.set("sortBy", currentSort);

    router.push(`/jobs?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleDepartmentTab = (dept: string) => {
    setDepartment(dept);
    applyFilters({ department: dept });
  };

  const handleReset = () => {
    setSearch("");
    setDepartment("all");
    setSpecialty("all");
    setState("all");
    setEmploymentType("all");
    setSortBy("newest");
    router.push("/jobs");
  };

  const removeFilter = (key: "search" | "department" | "specialty" | "state" | "employmentType") => {
    if (key === "search") {
      setSearch("");
      applyFilters({ search: "" });
    } else if (key === "department") {
      setDepartment("all");
      applyFilters({ department: "all" });
    } else if (key === "specialty") {
      setSpecialty("all");
      applyFilters({ specialty: "all" });
    } else if (key === "state") {
      setState("all");
      applyFilters({ state: "all" });
    } else if (key === "employmentType") {
      setEmploymentType("all");
      applyFilters({ employmentType: "all" });
    }
  };

  const hasActiveFilters = Boolean(
    search.trim() ||
    (department && department !== "all") ||
    (specialty && specialty !== "all") ||
    (state && state !== "all") ||
    (employmentType && employmentType !== "all") ||
    (sortBy && sortBy !== "newest")
  );

  return (
    <div className="bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border rounded-2xl p-5 sm:p-6 shadow-sm mb-8 transition-colors">
      
      {/* 1. Segmented Department Quick Filter Tabs (HiringMine Inspired) */}
      <div className="mb-4 pb-4 border-b border-slate-100 dark:border-dark-border overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mr-1">
            Discipline:
          </span>
          <button
            type="button"
            onClick={() => handleDepartmentTab("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              department === "all"
                ? "bg-navy-950 dark:bg-green-500 text-white shadow-sm"
                : "bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border"
            }`}
          >
            All Disciplines
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => handleDepartmentTab(dept)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                department === dept
                  ? "bg-navy-950 dark:bg-green-500 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, specialty, or city (e.g. ICU RN, Dallas, Travel)..."
            className="w-full pl-11 pr-10 py-3 text-sm rounded-xl border border-slate-300 dark:border-dark-border bg-slate-50/60 dark:bg-dark-card text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                applyFilters({ search: "" });
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="btn-accent px-7 py-3 text-sm font-bold shrink-0 rounded-xl"
        >
          Search Jobs
        </button>

        {/* Mobile Filter Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold border border-slate-200 dark:border-dark-border rounded-xl bg-slate-50 dark:bg-dark-card text-slate-700 dark:text-slate-200"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters {hasActiveFilters && "•"}</span>
        </button>
      </form>

      {/* 3. Detailed Dropdown Filter Console */}
      <div className={`mt-4 pt-4 border-t border-slate-100 dark:border-dark-border ${mobileOpen ? "block" : "hidden sm:block"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Clinical Specialty */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Clinical Specialty
            </label>
            <select
              value={specialty}
              onChange={(e) => {
                setSpecialty(e.target.value);
                applyFilters({ specialty: e.target.value });
              }}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            >
              <option value="all">All Specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Location / US State */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              US State
            </label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                applyFilters({ state: e.target.value });
              }}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            >
              <option value="all">All States (Nationwide)</option>
              {US_STATES.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code})
                </option>
              ))}
            </select>
          </div>

          {/* Employment Contract Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Contract Type
            </label>
            <select
              value={employmentType}
              onChange={(e) => {
                setEmploymentType(e.target.value);
                applyFilters({ employmentType: e.target.value });
              }}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            >
              <option value="all">All Contract Types</option>
              {EMPLOYMENT_TYPES.map((emp) => (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                applyFilters({ sortBy: e.target.value });
              }}
              className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-dark-border bg-white dark:bg-dark-card text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
            >
              <option value="newest">Most Recent Postings</option>
              <option value="pay">Highest Weekly Pay</option>
            </select>
          </div>
        </div>

        {/* 4. Active Filter Tags & Reset Action */}
        {hasActiveFilters && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">
                Active Filters:
              </span>

              {search.trim() && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60 font-semibold">
                  Keyword: {search}
                  <button type="button" onClick={() => removeFilter("search")} aria-label="Remove search filter">
                    <X className="w-3 h-3 hover:text-green-950 dark:hover:text-white" />
                  </button>
                </span>
              )}

              {department && department !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60 font-semibold">
                  {department}
                  <button type="button" onClick={() => removeFilter("department")} aria-label="Remove department filter">
                    <X className="w-3 h-3 hover:text-green-950 dark:hover:text-white" />
                  </button>
                </span>
              )}

              {specialty && specialty !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60 font-semibold">
                  {specialty}
                  <button type="button" onClick={() => removeFilter("specialty")} aria-label="Remove specialty filter">
                    <X className="w-3 h-3 hover:text-green-950 dark:hover:text-white" />
                  </button>
                </span>
              )}

              {state && state !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60 font-semibold">
                  State: {state}
                  <button type="button" onClick={() => removeFilter("state")} aria-label="Remove state filter">
                    <X className="w-3 h-3 hover:text-green-950 dark:hover:text-white" />
                  </button>
                </span>
              )}

              {employmentType && employmentType !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/60 font-semibold">
                  Type: {employmentType}
                  <button type="button" onClick={() => removeFilter("employmentType")} aria-label="Remove employment type filter">
                    <X className="w-3 h-3 hover:text-green-950 dark:hover:text-white" />
                  </button>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 font-bold transition-colors ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
