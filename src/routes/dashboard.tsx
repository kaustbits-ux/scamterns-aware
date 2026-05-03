import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, Bell, User, CreditCard, Search, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CyberSafety" }] }),
  component: Dashboard,
});

const SCANS = [
  { id: "s1", target: "internshipoffer@global-tech.xyz", type: "Email", score: 22, status: "High Risk", date: "2h ago" },
  { id: "s2", external: "https://stripe.com/jobs/intern", type: "URL", score: 96, status: "Safe", date: "1d ago" },
  { id: "s3", target: "Marketing intern @ Notion", type: "Listing", score: 88, status: "Safe", date: "3d ago" },
  { id: "s4", target: "hr@quickearn-solutions.click", type: "Email", score: 18, status: "High Risk", date: "5d ago" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, Aanya 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Pro Student · 142 scans this month</p>
        </div>
        <Link to="/checker"><Button className="gap-2"><Search className="h-4 w-4" />New scan</Button></Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <KPI icon={<Search className="h-4 w-4" />} label="Total scans" value="142" tone="primary" />
        <KPI icon={<AlertTriangle className="h-4 w-4" />} label="Scams blocked" value="9" tone="danger" />
        <KPI icon={<ShieldCheck className="h-4 w-4" />} label="Verified offers" value="6" tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="rounded-2xl border border-border bg-card shadow-soft">
          <header className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Recent scans</h2>
            <button className="text-sm text-primary">View all</button>
          </header>
          <ul className="divide-y divide-border">
            {SCANS.map((s) => {
              const tone = s.score >= 75 ? "success" : s.score >= 50 ? "warn" : "danger";
              const color = tone === "success" ? "var(--success)" : tone === "warn" ? "var(--warn)" : "var(--danger)";
              return (
                <li key={s.id} className="px-5 py-4 flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${color} 15%, transparent)`, color }}>
                    {tone === "success" ? <ShieldCheck className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{("target" in s ? s.target : s.external) as string}</div>
                    <div className="text-xs text-muted-foreground">{s.type} · {s.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{ color }}>{s.status}</div>
                    <div className="text-xs text-muted-foreground">Score {s.score}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3"><Bell className="h-4 w-4 text-primary" /><h3 className="font-semibold">Recent alerts</h3></div>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><span className="h-2 w-2 rounded-full bg-[color:var(--danger)] mt-1.5" /><span>New scam pattern detected: "training fee" recruiters in your inbox.</span></li>
              <li className="flex gap-2"><span className="h-2 w-2 rounded-full bg-[color:var(--warn)] mt-1.5" /><span>Watched company "Acme Hire" flagged by 3 students this week.</span></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3"><Bookmark className="h-4 w-4 text-primary" /><h3 className="font-semibold">Saved reports</h3></div>
            <p className="text-sm text-muted-foreground">2 saved · last viewed 2 days ago</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-3"><User className="h-4 w-4 text-primary" /><h3 className="font-semibold">Profile</h3></div>
            <div className="text-sm">Aanya Mehta</div>
            <div className="text-xs text-muted-foreground">aanya@bits-pilani.ac.in</div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Pro Student</span>
              <Link to="/pricing" className="ml-auto text-xs text-primary">Manage</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function KPI({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "primary" | "danger" | "success" }) {
  const color = tone === "danger" ? "var(--danger)" : tone === "success" ? "var(--success)" : "var(--primary)";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">{icon}{label}</div>
      <div className="mt-2 text-3xl font-bold" style={{ color }}>{value}</div>
    </div>
  );
}
