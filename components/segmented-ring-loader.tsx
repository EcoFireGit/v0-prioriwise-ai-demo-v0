export function SegmentedRingLoader() {
  return (
    <div className="relative h-16 w-16">
      <svg className="h-16 w-16 animate-spin" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left segment - Accent (Orange) */}
        <path
          d="M 50 10 A 40 40 0 0 1 76.5 23.5"
          fill="none"
          stroke="hsl(var(--color-accent))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Top-right segment - Primary (Indigo) */}
        <path
          d="M 76.5 23.5 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="hsl(var(--color-primary))"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Bottom-right segment - Accent (Orange) */}
        <path
          d="M 90 50 A 40 40 0 0 1 76.5 76.5"
          fill="none"
          stroke="hsl(var(--color-accent))"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Bottom-left segment - Primary (Indigo) */}
        <path
          d="M 76.5 76.5 A 40 40 0 0 1 50 90"
          fill="none"
          stroke="hsl(var(--color-primary))"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}
