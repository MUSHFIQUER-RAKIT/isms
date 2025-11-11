export default function Input2({ form, name, change, required }) {
  return (
    <input
      value={form[name]}
      name={name}
      onChange={(e) => change(name, e.target.value)}
      placeholder={name}
      required={!required}
      className="p-2 rounded-md bg-[var(--color-input)] border border-[var(--color-border)]"
    />
  );
}
