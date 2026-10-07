export function ProgressBar({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full"
      style={{ background: "var(--surface-muted)" }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${clamped}%`, background: "var(--accent)" }}
      />
    </div>
  );
}
