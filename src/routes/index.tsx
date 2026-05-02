import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MOCK_EMAILS } from "@/lib/mock-emails";
import { isExternal, scoreEmail } from "@/lib/scam";
import { EmailCard } from "@/components/EmailCard";
import { Inbox, Globe2, ShieldAlert, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

type Tab = "all" | "external" | "high";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("all");

  const enriched = useMemo(
    () =>
      MOCK_EMAILS.map((e) => ({
        email: e,
        breakdown: scoreEmail(e),
        external: isExternal(e.sender),
      })),
    [],
  );

  const counts = useMemo(() => {
    const all = enriched.length;
    const external = enriched.filter((x) => x.external && !x.breakdown.isVip).length;
    const high = enriched.filter((x) => x.external && !x.breakdown.isVip && x.breakdown.score >= 75).length;
    return { all, external, high };
  }, [enriched]);

  const filtered = useMemo(() => {
    let list = enriched;
    if (tab === "external") list = list.filter((x) => x.external && !x.breakdown.isVip);
    if (tab === "high") list = list.filter((x) => x.external && !x.breakdown.isVip && x.breakdown.score >= 75);
    return list.sort((a, b) => b.breakdown.score - a.breakdown.score);
  }, [enriched, tab]);

  return (
    <div className="min-h-screen bg-background">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(800px 400px at 10% -10%, oklch(0.62 0.18 255 / 0.18), transparent 60%), radial-gradient(600px 400px at 100% 0%, oklch(0.55 0.2 290 / 0.12), transparent 60%)",
        }}
      />

      <header className="border-b border-border/60 backdrop-blur sticky top-0 z-10 bg-background/70">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground font-black shadow-[var(--shadow-glow-blue)]"
              style={{ background: "var(--gradient-bits)" }}
            >
              S
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Scam<span className="text-primary">terns</span>
              </h1>
              <p className="text-xs text-muted-foreground">BITS Pilani · Phishing Sentinel</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[color:var(--safe)] animate-pulse" />
            Live monitoring
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <section className="grid gap-4 sm:grid-cols-3 mb-6">
          <Stat icon={<Inbox className="h-4 w-4" />} label="Total emails" value={counts.all} tone="primary" />
          <Stat icon={<Globe2 className="h-4 w-4" />} label="External" value={counts.external} tone="silver" />
          <Stat icon={<ShieldAlert className="h-4 w-4" />} label="High Risk" value={counts.high} tone="danger" />
        </section>

        <div className="flex flex-wrap items-center gap-2 mb-6 rounded-xl border border-border bg-card/60 p-1.5 backdrop-blur">
          <TabButton active={tab === "all"} onClick={() => setTab("all")} icon={<Inbox className="h-4 w-4" />}>
            All Mail <span className="ml-1 text-xs opacity-70">({counts.all})</span>
          </TabButton>
          <TabButton active={tab === "external"} onClick={() => setTab("external")} icon={<Globe2 className="h-4 w-4" />}>
            External <span className="ml-1 text-xs opacity-70">({counts.external})</span>
          </TabButton>
          <TabButton
            active={tab === "high"}
            onClick={() => setTab("high")}
            icon={<ShieldAlert className="h-4 w-4" />}
            tone="danger"
          >
            High Risk <span className="ml-1 text-xs opacity-70">({counts.high})</span>
          </TabButton>
        </div>

        <div className="grid gap-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-[color:var(--safe)]" />
              <p className="mt-3 text-sm text-muted-foreground">All clear in this view.</p>
            </div>
          ) : (
            filtered.map(({ email }) => <EmailCard key={email.id} email={email} />)
          )}
        </div>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          Scamterns © {new Date().getFullYear()} · Built for the BITS community
        </footer>
      </main>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: "primary" | "silver" | "danger";
}) {
  const accent =
    tone === "danger"
      ? "text-[color:var(--danger)]"
      : tone === "silver"
        ? "text-[color:var(--silver)]"
        : "text-primary";
  return (
    <div className="rounded-xl border border-border bg-card p-5" style={{ background: "var(--gradient-surface)" }}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className={`mt-2 text-3xl font-bold ${accent}`}>{value}</div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
  tone = "primary",
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
  tone?: "primary" | "danger";
}) {
  const activeStyles =
    tone === "danger"
      ? "bg-[color:var(--danger)]/15 text-[color:var(--danger)] border-[color:var(--danger)]/40"
      : "bg-primary/15 text-primary border-primary/40";
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
        active ? activeStyles : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
