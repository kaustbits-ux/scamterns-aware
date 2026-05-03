import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — CyberSafety" }] }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Free", price: "$0", period: "forever", desc: "Perfect for the occasional check.",
    features: ["3 scans per day", "Email + URL + text scanner", "Basic trust score", "Community reports access"],
    cta: "Start free", highlight: false,
  },
  {
    name: "Pro Student", price: "$5", period: "/month", desc: "For active job hunters.",
    features: ["Unlimited scans", "Real-time alerts on saved companies", "Detailed AI summaries", "Saved scan history", "Priority support"],
    cta: "Get Pro", highlight: true,
  },
  {
    name: "University", price: "Custom", period: "", desc: "For career services & faculty.",
    features: ["Bulk verification dashboard", "Student usage analytics", "Branded scam awareness portal", "SSO + admin controls", "Dedicated success manager"],
    cta: "Talk to sales", highlight: false,
  },
  {
    name: "API", price: "$0.01", period: "/scan", desc: "For job boards & ATS providers.",
    features: ["Trust scoring API", "Webhook delivery", "99.9% uptime SLA", "10K+ free scans / month", "Volume discounts"],
    cta: "Get API access", highlight: false,
  },
];

function Pricing() {
  return (
    <div className="relative">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Simple, transparent pricing
          </div>
          <h1 className="mt-4 text-3xl lg:text-4xl font-bold">Plans for every kind of seeker</h1>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-6 flex flex-col ${
                p.highlight ? "border-primary shadow-glow bg-card" : "border-border bg-card shadow-soft"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-5 space-y-2 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 text-[color:var(--success)] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={p.name === "Free" ? "/checker" : "/login"} className="mt-6">
                <Button className="w-full" variant={p.highlight ? "default" : "outline"}>{p.cta}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
