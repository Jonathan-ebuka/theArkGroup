export function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-7xl px-6 lg:px-12"
    >
      <div className="grid h-full grid-cols-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-full ${
              i < 4 ? "border-r border-navy/[0.06]" : ""
            } ${i === 0 ? "border-l border-navy/[0.06]" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
