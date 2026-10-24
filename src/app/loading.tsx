export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-semibold tracking-wider uppercase text-slate-500">
        Loading Clinical Content...
      </p>
    </div>
  );
}
