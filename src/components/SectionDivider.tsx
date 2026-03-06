interface SectionDividerProps {
  variant?: "light" | "dark";
}

export function SectionDivider({ variant = "light" }: SectionDividerProps) {
  const lineColor = variant === "dark" ? "bg-offwhite/15" : "bg-navy/10";
  const crossColor = variant === "dark" ? "bg-offwhite/25" : "bg-navy/15";

  // 6 positions: left edge + 4 internal column lines + right edge
  const positions = [0, 20, 40, 60, 80, 100];

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative">
          {/* Horizontal line */}
          <div className={`h-px w-full ${lineColor}`} />

          {/* Crosshair markers at each column intersection */}
          {positions.map((pos) => (
            <span
              key={pos}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${pos}%` }}
            >
              {/* Vertical stroke */}
              <span
                className={`absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 ${crossColor}`}
              />
              {/* Horizontal stroke */}
              <span
                className={`absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 ${crossColor}`}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
