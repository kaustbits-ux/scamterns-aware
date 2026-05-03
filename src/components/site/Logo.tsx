import { ShieldCheck } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-soft"
        style={{ background: "var(--gradient-brand)" }}
      >
        <ShieldCheck className="h-5 w-5" strokeWidth={2.4} />
      </div>
      <div className="leading-tight">
        <div className="font-display font-bold tracking-tight font-serif text-lg text-left">
          Cyber<span className="text-gradient">Safety</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Trusted Scan Engine
        </div>
      </div>
    </div>
  );
}
