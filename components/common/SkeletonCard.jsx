export default function SkeletonCard() {
  return (
    <div
      className="
      w-full sm:w-32 lg:w-52 xl:w-72 min-w-[250px]
      border border-[var(--border)] bg-[var(--surface)] 
      rounded-lg shadow-sm 
      animate-pulse
    "
    >
      <div className="flex gap-2 flex-col items-center p-6 sm:p-8 md:p-10 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--border)]" />
        <div className="h-6 w-3/4 mt-4 rounded bg-[var(--border)]" />
        <div className="h-4 w-1/2 mt-1 rounded bg-[var(--border)]" />
        <div className="flex mt-6 md:mt-8">
          <div className="h-8 w-16 rounded-lg bg-[var(--border)]" />
          <div className="h-8 w-20 ms-2 rounded-lg bg-[var(--border)]" />
        </div>
      </div>
    </div>
  );
}
