export default function Divider({ text }) {
  return (
    <div className="flex items-center justify-center w-full">
      <span className="flex-1 h-px bg-[var(--border)]"></span>
      <span className="mx-3 text-[var(--muted)] text-sm">{text}</span>
      <span className="flex-1 h-px bg-[var(--border)]"></span>
    </div>
  );
}
