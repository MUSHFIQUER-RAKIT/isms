export default function Divider({ text }) {
  return (
    <div className="flex items-center justify-center w-full">
      <span className="flex-1 h-px bg-border"></span>
      <span className="mx-3 text-muted-foreground text-sm">{text}</span>
      <span className="flex-1 h-px bg-border"></span>
    </div>
  );
}
