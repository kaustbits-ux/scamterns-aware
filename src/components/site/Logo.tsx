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
      <path d="M3 7l9 6.2L21 7" opacity="0.55" />
      {/* Lock stamp — centered */}
      <rect x="8.4" y="9.2" width="7.2" height="6.6" rx="1.1" fill="currentColor" stroke="currentColor" />
      <path d="M9.9 9.2V8.1a2.1 2.1 0 0 1 4.2 0v1.1" stroke="currentColor" fill="none" strokeWidth={1.6} />
      <circle cx="12" cy="12.4" r="0.7" fill="var(--primary, #1e3a8a)" stroke="none" />
      <path d="M12 12.7v1.3" stroke="var(--primary, #1e3a8a)" strokeWidth={1.2} />
    </svg>
  );
}
