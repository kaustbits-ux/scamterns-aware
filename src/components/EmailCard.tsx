import { type Email, scoreEmail, riskLabel } from "@/lib/scam";
import { ShieldAlert, ShieldCheck, AlertTriangle, Mail } from "lucide-react";

export function EmailCard({ email }: { email: Email }) {
  const breakdown = scoreEmail(email);
  const risk = riskLabel(breakdown.score, breakdown.isVip);
  const isDanger = risk.tone === "danger";

  return (
    <article
      className={`relative rounded-xl border bg-card p-5 transition-all hover:translate-y-[-1px] hover:border-primary/50 ${
        isDanger ? "danger-glow" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-[color:var(--silver)]">
            <Mail className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-foreground truncate">{email.senderName}</span>
              <span className="text-xs text-muted-foreground truncate">&lt;{email.sender}&gt;</span>
            </div>
            <h3 className="mt-1 font-medium text-foreground line-clamp-1">{email.subject}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{email.preview}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <RiskBadge tone={risk.tone} label={risk.label} />
          <ScorePill score={breakdown.score} tone={risk.tone} />
        </div>
      </div>

      {(breakdown.matchedKeywords.length > 0 || breakdown.matchedUrgency.length > 0 || breakdown.external) && (
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-3">
          {breakdown.external && <Chip>+40 External</Chip>}
          {breakdown.matchedKeywords.map((k) => (
            <Chip key={k} tone="warn">+15 “{k}”</Chip>
          ))}
          {breakdown.matchedUrgency.length > 0 && (
            <Chip tone="warn">+20 Urgency: {breakdown.matchedUrgency.slice(0, 2).join(", ")}</Chip>
          )}
          {breakdown.isVip && <Chip tone="safe">VIP override → 0</Chip>}
        </div>
      )}
    </article>
  );
}

function RiskBadge({ tone, label }: { tone: "danger" | "warn" | "safe"; label: string }) {
  const Icon = tone === "danger" ? ShieldAlert : tone === "warn" ? AlertTriangle : ShieldCheck;
  const styles =
    tone === "danger"
      ? "bg-[color:var(--danger)]/15 text-[color:var(--danger)] border-[color:var(--danger)]/40"
      : tone === "warn"
        ? "bg-[color:var(--warn)]/15 text-[color:var(--warn)] border-[color:var(--warn)]/40"
        : "bg-[color:var(--safe)]/15 text-[color:var(--safe)] border-[color:var(--safe)]/40";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${styles}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function ScorePill({ score, tone }: { score: number; tone: "danger" | "warn" | "safe" }) {
  const color =
    tone === "danger" ? "text-[color:var(--danger)]" : tone === "warn" ? "text-[color:var(--warn)]" : "text-[color:var(--safe)]";
  return (
    <div className="text-right">
      <div className={`text-2xl font-bold leading-none ${color}`}>{score}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Scam Score</div>
    </div>
  );
}

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "warn" | "safe" }) {
  const styles =
    tone === "warn"
      ? "bg-[color:var(--warn)]/10 text-[color:var(--warn)] border-[color:var(--warn)]/30"
      : tone === "safe"
        ? "bg-[color:var(--safe)]/10 text-[color:var(--safe)] border-[color:var(--safe)]/30"
        : "bg-secondary text-muted-foreground border-border";
  return <span className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${styles}`}>{children}</span>;
}
