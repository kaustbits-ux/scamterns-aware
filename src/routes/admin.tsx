import { createFileRoute } from "@tanstack/react-router";
import { Users, Briefcase, MessageSquare, BarChart3, AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — CyberSafety" }] }),
  component: Admin,
});

const TREND = [12, 18, 14, 22, 28, 24, 33, 41, 38, 47, 52, 60];

function Admin() {
  const max = Math.max(...TREND);
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">Admin Console</div>
          <h1 className="text-2xl lg:text-3xl font-bold mt-1">Trust & Safety Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-[color:var(--success)] animate-pulse" /> Systems healthy
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <KPI icon={<Users />} label="Active users" value="24,182" delta="+12%" />
        <KPI icon={<Briefcase />} label="Verified jobs" value="486" delta="+8" />
        <KPI icon={<AlertTriangle />} label="Open reports" value="37" tone="danger" />
        <KPI icon={<ShieldCheck />} label="Scams blocked (30d)" value="1,204" tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" /><h2 className="font-semibold">Flagged scam trends</h2></div>
            <div className="text-xs text-muted-foreground">Last 12 weeks</div>
          </div>
          <div className="flex items-end gap-2 h-44">
            {TREND.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md transition-all" style={{ height: `${(v / max) * 100}%`, background: "var(--gradient-brand)" }} />
                <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-4"><BarChart3 className="h-4 w-4 text-primary" /><h2 className="font-semibold">Top scam patterns</h2></div>
          <ul className="space-y-3 text-sm">
            {[
              { l: "Training fee scams", v: 38 },
              { l: "Brand impersonation", v: 27 },
              { l: "Crypto / wire transfer", v: 19 },
              { l: "Aadhaar / SSN requests", v: 16 },
            ].map((x) => (
              <li key={x.l}>
                <div className="flex items-center justify-between mb-1"><span>{x.l}</span><span className="text-muted-foreground">{x.v}%</span></div>
                <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                  <div className="h-full" style={{ width: `${x.v * 2.5}%`, background: "var(--gradient-brand)" }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
        <header className="px-6 py-4 border-b border-border flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" /><h2 className="font-semibold">Moderation queue</h2>
        </header>
        <table className="w-full text-sm">
          <thead className="bg-accent/40 text-left">
            <tr><th className="px-6 py-3 font-medium">Type</th><th className="px-6 py-3 font-medium">Subject</th><th className="px-6 py-3 font-medium">Reports</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 font-medium text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { t: "Review", s: "GlobalTech Hire — training fee", r: 12, st: "Pending" },
              { t: "Job", s: "Apply: Marketing Intern @ Notion", r: 0, st: "Verified" },
              { t: "User", s: "user@suspicious-recruiter.xyz", r: 4, st: "Investigating" },
              { t: "Review", s: "Quickearn Solutions — bank details", r: 8, st: "Pending" },
            ].map((row, i) => (
              <tr key={i}>
                <td className="px-6 py-3 text-muted-foreground">{row.t}</td>
                <td className="px-6 py-3 font-medium">{row.s}</td>
                <td className="px-6 py-3">{row.r}</td>
                <td className="px-6 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  row.st === "Verified" ? "bg-[color:var(--success)]/15 text-[color:var(--success)]" :
                  row.st === "Pending" ? "bg-[color:var(--warn)]/15 text-[color:var(--warn)]" :
                  "bg-[color:var(--danger)]/15 text-[color:var(--danger)]"
                }`}>{row.st}</span></td>
                <td className="px-6 py-3 text-right">
                  <button className="text-primary text-xs font-medium hover:underline">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function KPI({ icon, label, value, delta, tone }: { icon: React.ReactNode; label: string; value: string; delta?: string; tone?: "danger" | "success" }) {
  const color = tone === "danger" ? "var(--danger)" : tone === "success" ? "var(--success)" : "var(--foreground)";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <span className="h-4 w-4">{icon}</span>{label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold" style={{ color }}>{value}</span>
        {delta && <span className="text-xs text-[color:var(--success)] font-semibold">{delta}</span>}
      </div>
    </div>
  );
}
