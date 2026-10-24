"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, RotateCcw, SlidersHorizontal } from "lucide-react";
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

  const handleReset = () => {
    setSearch("");
    setDepartment("all");
    setSpecialty("all");
    setState("all");
    setEmploymentType("all");
    setSortBy("newest");
    router.push("/jobs");
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
    <div className="bg-white border-2 border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-md mb-8">
      {/* Search Header Bar */}
      <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by specialty, role, city (e.g. ICU RN, Dallas, Travel)..."
            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-slate-50/50 font-medium"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                applyFilters({ search: "" });
              }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters {hasActiveFilters && "•"}</span>
        </button>
      </form>

      {/* Filter Dropdowns Grid */}
      <div className={`mt-4 pt-4 border-t border-slate-100 ${mobileOpen ? "block" : "hidden sm:block"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                applyFilters({ department: e.target.value });
              }}
              className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Clinical Specialty
            </label>
            <select
              value={specialty}
              onChange={(e) => {
                setSpecialty(e.target.value);
                applyFilters({ specialty: e.target.value });
              }}
              className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Specialties</option>
              {SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Location / State */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              US State
            </label>
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                applyFilters({ state: e.target.value });
              }}
              className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All States (Nationwide)</option>
              {US_STATES.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name} ({st.code})
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Contract Type
            </label>
            <select
              value={employmentType}
              onChange={(e) => {
                setEmploymentType(e.target.value);
                applyFilters({ employmentType: e.target.value });
              }}
              className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Contract Types</option>
              {EMPLOYMENT_TYPES.map((emp) => (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Sort Order
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                applyFilters({ sortBy: e.target.value });
              }}
              className="w-full text-xs py-2 px-3 rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="newest">Most Recent</option>
              <option value="pay">Highest Compensation</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Reset Button */}
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">
              Filters applied to active positions
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-green-700 hover:text-green-900 font-semibold transition-colors"
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
