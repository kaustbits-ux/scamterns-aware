import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Briefcase, ShieldCheck, ExternalLink, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Verified Internships — CyberSafety" }] }),
  component: Jobs,
});

type Job = {
  id: string; company: string; title: string; location: string; mode: "Remote" | "Onsite" | "Hybrid";
  industry: string; stipend: string; paid: boolean; deadline: string; country: string; logo: string;
};

const JOBS: Job[] = [
  { id: "1", company: "Stripe", title: "Software Engineering Intern", location: "Bangalore, IN", mode: "Hybrid", industry: "Fintech", stipend: "₹1,20,000/mo", paid: true, deadline: "2026-06-15", country: "India", logo: "S" },
  { id: "2", company: "Notion", title: "Product Design Intern", location: "Remote (Global)", mode: "Remote", industry: "SaaS", stipend: "$5,500/mo", paid: true, deadline: "2026-05-30", country: "Global", logo: "N" },
  { id: "3", company: "Linear", title: "Frontend Intern", location: "Remote (EU)", mode: "Remote", industry: "Developer Tools", stipend: "€3,800/mo", paid: true, deadline: "2026-07-01", country: "EU", logo: "L" },
  { id: "4", company: "Airbnb", title: "Data Science Intern", location: "San Francisco, US", mode: "Onsite", industry: "Travel", stipend: "$8,000/mo", paid: true, deadline: "2026-06-10", country: "USA", logo: "A" },
  { id: "5", company: "Razorpay", title: "Security Research Intern", location: "Bangalore, IN", mode: "Hybrid", industry: "Fintech", stipend: "₹90,000/mo", paid: true, deadline: "2026-05-20", country: "India", logo: "R" },
  { id: "6", company: "GitHub", title: "Open Source Intern", location: "Remote (Global)", mode: "Remote", industry: "Developer Tools", stipend: "$6,200/mo", paid: true, deadline: "2026-08-01", country: "Global", logo: "G" },
  { id: "7", company: "UNICEF Innovation", title: "Tech for Good Fellow", location: "Remote", mode: "Remote", industry: "Non-profit", stipend: "Unpaid · stipend for travel", paid: false, deadline: "2026-09-12", country: "Global", logo: "U" },
  { id: "8", company: "Figma", title: "Designer in Residence", location: "New York, US", mode: "Onsite", industry: "SaaS", stipend: "$7,500/mo", paid: true, deadline: "2026-06-30", country: "USA", logo: "F" },
];

const COUNTRIES = ["All", "India", "USA", "EU", "Global"];
const MODES = ["All", "Remote", "Onsite", "Hybrid"];
const INDUSTRIES = ["All", "Fintech", "SaaS", "Developer Tools", "Travel", "Non-profit"];
const PAYS = ["All", "Paid", "Unpaid"];

function Jobs() {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("All");
  const [mode, setMode] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [pay, setPay] = useState("All");

  const filtered = useMemo(() => JOBS.filter((j) => {
    if (q && !`${j.title} ${j.company}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (country !== "All" && j.country !== country) return false;
    if (mode !== "All" && j.mode !== mode) return false;
    if (industry !== "All" && j.industry !== industry) return false;
    if (pay === "Paid" && !j.paid) return false;
    if (pay === "Unpaid" && j.paid) return false;
    return true;
  }), [q, country, mode, industry, pay]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> 100% CyberSafe Certified
        </div>
        <h1 className="mt-4 text-3xl lg:text-4xl font-bold">Verified Internships</h1>
        <p className="mt-3 text-muted-foreground">Every listing is vetted by CyberSafety. No scams. No fees. No surprises.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 shadow-soft mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role or company…" className="pl-9" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterGroup label="Country" value={country} options={COUNTRIES} onChange={setCountry} />
          <FilterGroup label="Mode" value={mode} options={MODES} onChange={setMode} />
          <FilterGroup label="Industry" value={industry} options={INDUSTRIES} onChange={setIndustry} />
          <FilterGroup label="Pay" value={pay} options={PAYS} onChange={setPay} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((j) => (
          <article key={j.id} className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-glow transition">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl text-white text-lg font-bold shadow-soft" style={{ background: "var(--gradient-brand)" }}>
                {j.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold truncate">{j.company}</span>
                  <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--success)] flex-shrink-0" />
                </div>
                <div className="text-sm font-medium mt-0.5 truncate">{j.title}</div>
              </div>
            </div>
            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{j.location} · {j.mode}</div>
              <div className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{j.industry} · {j.stipend}</div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Apply by {new Date(j.deadline).toLocaleDateString()}</span>
              <Button size="sm" className="gap-1.5">Apply <ExternalLink className="h-3 w-3" /></Button>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
          <Filter className="mx-auto h-8 w-8 mb-2" />
          No internships match those filters.
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background/60 p-1">
      <span className="px-2 text-xs font-medium text-muted-foreground">{label}:</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-md px-2.5 py-1 text-xs transition ${value === o ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground hover:bg-accent"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
