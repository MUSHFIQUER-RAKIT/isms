export default function Label({ children, label }) {
  return (
    <div>
      <label
        htmlFor={label.toLowerCase()}
        className="block text-foreground/90 mb-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
