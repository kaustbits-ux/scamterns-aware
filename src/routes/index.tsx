import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck, Search, Sparkles, AlertTriangle, ArrowRight, Lock,
  Mail, Link2, FileText, CheckCircle2, TrendingUp, Users, Building2, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div>
      <Hero />
      <LogoStrip />
      <HowItWorks />
      <WhyStudents />
      <Stats />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 lg:pt-28 lg:pb-32 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium animate-fade-up">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          New · AI-powered scam detection for students
        </div>
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] animate-fade-up">
          Don't Get Scammed Applying for{" "}
          <span className="text-gradient">Internships</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-up">
          Analyze suspicious internships, recruiter emails, and job listings instantly.
          Get a trust score, red-flag breakdown, and recommended next step in seconds.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 animate-fade-up">
          <Link to="/checker">
            <Button size="lg" className="shadow-glow gap-2">
              <Search className="h-4 w-4" /> Scan Now
            </Button>
          </Link>
          <Link to="/jobs">
            <Button size="lg" variant="outline" className="gap-2">
              <ShieldCheck className="h-4 w-4" /> View Verified Internships
            </Button>
          </Link>
        </div>

        <div className="mt-16 mx-auto max-w-4xl animate-fade-up">
          <div className="relative rounded-2xl border border-border glass p-6 shadow-soft">
            <MockResultPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function MockResultPreview() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr] text-left">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Trust Score</div>
        <div className="mt-3 flex items-center gap-4">
          <ScoreRing score={28} tone="danger" />
          <div>
            <div className="text-sm font-semibold text-[color:var(--danger)]">High Risk</div>
            <div className="text-xs text-muted-foreground">Avoid and report</div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold mb-2">Red flags detected</div>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {[
            "Sender domain mismatch",
            "Asks for bank details",
            "Urgency tactics: 'within 24h'",
            "Vague company info",
            "Unrealistic stipend",
            "No online presence",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2">
              <AlertTriangle className="h-3.5 w-3.5 text-[color:var(--danger)]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ScoreRing({ score, tone, size = 88 }: { score: number; tone: "safe" | "warn" | "danger"; size?: number }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = tone === "safe" ? "var(--success)" : tone === "warn" ? "var(--warn)" : "var(--danger)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border)" strokeWidth={8} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth={8} fill="none"
          strokeDasharray={c} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-xl font-bold">{score}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">/ 100</div>
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  const orgs = ["BITS Pilani", "IIT Delhi", "NUS", "TU Munich", "UC Berkeley", "Imperial College"];
  return (
    <section className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-5 py-6 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
        <span className="text-xs uppercase tracking-widest">Trusted by students at</span>
        {orgs.map((o) => (
          <span key={o} className="font-semibold opacity-70">{o}</span>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Mail, title: "Paste it in", desc: "Drop the email, link, or job description into our scanner. No signup required." },
    { icon: Sparkles, title: "AI analyzes", desc: "We scan for 30+ scam signals — domains, urgency, payment requests, and more." },
    { icon: ShieldCheck, title: "Decide safely", desc: "Get a trust score, red flags, and a clear recommended action in seconds." },
  ];
  return (
    <Section title="How it works" subtitle="Three steps from suspicious to certain.">
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-glow transition">
            <div className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-soft" style={{ background: "var(--gradient-brand)" }}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Step {i + 1}</div>
            <div className="mt-1 text-lg font-semibold">{s.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhyStudents() {
  const points = [
    { icon: Lock, title: "Your data stays yours", desc: "Quick scans run client-side. We never store messages without your consent." },
    { icon: TrendingUp, title: "Updated daily", desc: "Our scam pattern database is updated with new tactics every 24 hours." },
    { icon: Users, title: "Built with universities", desc: "Co-designed with career services and student safety officers globally." },
  ];
  return (
    <Section title="Why students need this" subtitle="Internship scams cost students more than money — they cost trust.">
      <div className="grid gap-5 md:grid-cols-3">
        {points.map((p) => (
          <div key={p.title} className="rounded-2xl border border-border glass p-6">
            <p.icon className="h-6 w-6 text-primary" />
            <div className="mt-3 font-semibold">{p.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Stats() {
  const stats = [
    { v: "67%", l: "of students received a scam offer in the last year" },
    { v: "$2.1B", l: "lost globally to job & internship scams in 2024" },
    { v: "1 in 4", l: "Gen Z grads can't reliably spot phishing recruiters" },
    { v: "92%", l: "scam accuracy from CyberSafety's detection engine" },
  ];
  return (
    <section className="bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-4xl font-bold text-gradient">{s.v}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Mail, title: "Email scanner", desc: "Detects spoofed senders, payload links, and impersonation." },
    { icon: Link2, title: "URL inspector", desc: "Checks domain reputation, redirects, and clone sites." },
    { icon: FileText, title: "Listing analyzer", desc: "Reads JD text for unrealistic offers and red-flag patterns." },
    { icon: ShieldCheck, title: "Verified jobs board", desc: "Only listings from CyberSafe Certified employers." },
    { icon: Building2, title: "Recruiter verification", desc: "Free certification for legitimate companies." },
    { icon: AlertTriangle, title: "Community reports", desc: "Crowdsourced scam intel from students globally." },
  ];
  return (
    <Section title="Everything you need to apply with confidence" subtitle="A complete safety layer for your career hunt.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <it.icon className="h-5 w-5 text-primary" />
            <div className="mt-3 font-semibold">{it.title}</div>
            <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const t = [
    { name: "Aanya Mehta", role: "CS Student, BITS Pilani", quote: "Caught a fake recruiter offer in under 10 seconds. Saved me from sending my Aadhaar." },
    { name: "Daniel Ortiz", role: "Fresh Graduate, NUS", quote: "I run every job offer through CyberSafety now. The trust score is dead-on." },
    { name: "Dr. Lin Zhao", role: "Career Services, IIT Delhi", quote: "We rolled it out to 3,000 students. Reports of phishing dropped by half." },
  ];
  return (
    <Section title="Loved by students worldwide">
      <div className="grid gap-5 md:grid-cols-3">
        {t.map((x) => (
          <div key={x.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex gap-0.5 text-[color:var(--warn)]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-3 text-sm leading-relaxed">"{x.quote}"</p>
            <div className="mt-4 text-sm font-semibold">{x.name}</div>
            <div className="text-xs text-muted-foreground">{x.role}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is CyberSafety free to use?", a: "Yes — quick scans are free with no signup. Pro plans add unlimited scans and alerts." },
    { q: "Do you store the emails I scan?", a: "No. Quick-mode scans are processed in your browser. Saved scans are only stored if you opt in." },
    { q: "How accurate is the trust score?", a: "Our detection engine reaches 92% accuracy on a benchmark of 25k known scam communications." },
    { q: "Can my university use it?", a: "Yes — our University plan includes bulk verification and dashboards for career services teams." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section title="Frequently asked questions">
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="rounded-xl border border-border bg-card overflow-hidden">
            <button
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-medium">{f.q}</span>
              <ArrowRight className={`h-4 w-4 transition ${open === i ? "rotate-90" : ""}`} />
            </button>
            {open === i && <div className="px-5 pb-4 text-sm text-muted-foreground">{f.a}</div>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-border p-10 lg:p-16 text-center" style={{ background: "var(--gradient-brand)" }}>
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="relative">
          <CheckCircle2 className="mx-auto h-10 w-10 text-white" />
          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">Apply with confidence today</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">Run your first scan in under 10 seconds. No signup required.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/checker">
              <Button size="lg" variant="secondary" className="gap-2">
                <Search className="h-4 w-4" /> Scan Now — Free
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20">
                See plans <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
