export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-dark-500 bg-white dark:bg-dark-600 overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-dark-500" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 dark:bg-dark-500 rounded-lg w-3/4" />
        <div className="h-4 bg-slate-200 dark:bg-dark-500 rounded-lg w-full" />
        <div className="h-4 bg-slate-200 dark:bg-dark-500 rounded-lg w-5/6" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-slate-200 dark:bg-dark-500 rounded-full" />
          <div className="h-6 w-16 bg-slate-200 dark:bg-dark-500 rounded-full" />
          <div className="h-6 w-12 bg-slate-200 dark:bg-dark-500 rounded-full" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-9 w-24 bg-slate-200 dark:bg-dark-500 rounded-xl" />
          <div className="h-9 w-28 bg-slate-200 dark:bg-dark-500 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
