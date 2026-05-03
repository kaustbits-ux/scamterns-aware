export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-soft"
        style={{ background: "var(--gradient-brand)" }}
        aria-label="Scamterns logo"
      >
        <MailLockMark className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="font-display font-bold tracking-tight font-serif text-lg text-left">
          Scam<span className="text-gradient">terns</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Trusted Scan Engine
        </div>
      </div>
    </div>
  );
}

function MailLockMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Envelope */}
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.2" />
      <path d="M3 7l9 6.2L21 7" />
      {/* Lock stamp (top-right corner) */}
      <rect x="14.5" y="2.5" width="7" height="6.2" rx="1.2" fill="currentColor" stroke="none" opacity="0.18" />
      <rect x="15.6" y="4.6" width="4.8" height="3.4" rx="0.7" fill="currentColor" stroke="none" />
      <path d="M16.7 4.6V3.9a1.3 1.3 0 0 1 2.6 0v.7" stroke="currentColor" />
    </svg>
  );
}
