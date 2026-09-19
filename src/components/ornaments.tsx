export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M46 2H18C10 2 2 10 2 18v28"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M46 8H22C13.2 8 8 13.2 8 22v24"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function LotusMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 36" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 4c4 6 10 10 16 12-6 3-10 8-12 14-2-6-6-11-12-14 6-2 12-6 16-12z"
        fill="currentColor"
      />
      <path
        d="M8 22c8-2 14-8 16-16 2 8 8 14 16 16-8 1-14 6-16 14-2-8-8-13-16-14z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M32 20c6-1 10-5 12-10-2 6-6 10-12 12-6-2-10-6-12-12 2 5 6 9 12 10z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export function FrameCorners() {
  return (
    <>
      <CornerFlourish className="pointer-events-none absolute top-2 left-2 size-10 text-bronze" />
      <CornerFlourish className="pointer-events-none absolute top-2 right-2 size-10 rotate-90 text-bronze" />
      <CornerFlourish className="pointer-events-none absolute bottom-2 left-2 size-10 -rotate-90 text-bronze" />
      <CornerFlourish className="pointer-events-none absolute right-2 bottom-2 size-10 rotate-180 text-bronze" />
    </>
  );
}
