export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-secondary/30 bg-secondary/15">
        <svg
          aria-hidden="true"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2L14 9L22 12L14 15L12 22L10 15L2 12L10 9L12 2Z"
            fill="#0F857D"
          />
          <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      <div>
        <p className="text-lg font-bold tracking-tight">NorthStar Academy</p>
        <p className="text-xs tracking-widest opacity-70">CAMPUS VIRTUAL</p>
      </div>
    </div>
  );
}
