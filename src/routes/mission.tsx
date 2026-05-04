import { createFileRoute } from "@tanstack/react-router";
import { Target, ShieldCheck, BookOpen, Users } from "lucide-react";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Our Mission — Scamterns" },
      {
        name: "description",
        content:
          "How Scamterns supports the NAE Grand Challenge to Secure Cyberspace by helping students spot phishing internships and scam recruiters.",
      },
    ],
  }),
  component: Mission,
});

function Mission() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
        <Target className="h-3.5 w-3.5 text-primary" /> Our Mission
      </div>
      <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">
        Securing cyberspace, one inbox at a time
      </h1>
      <p className="mt-4 text-muted-foreground">
        Scamterns is built around one of the National Academy of Engineering's{" "}
        <a
          href="https://www.engineeringchallenges.org/challenges/cyberspace.aspx"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          14 Grand Challenges for Engineering
        </a>
        : <strong className="text-foreground">Secure Cyberspace</strong>.
      </p>

      <section className="mt-10 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck className="h-4 w-4 text-primary" /> Why Secure Cyberspace matters
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          The NAE identifies cyberspace security as critical because nearly every part of modern life — banking,
          healthcare, education, infrastructure — runs on networked systems. The challenge calls on engineers to design
          systems that resist intrusion, protect personal data, and keep ordinary users safe from social engineering,
          not just sophisticated attackers.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Phishing remains the entry point for a large share of cyber incidents. Verizon's 2024 Data Breach
          Investigations Report attributes roughly <strong className="text-foreground">68% of breaches</strong> to a
          non-malicious human element, with phishing and pretexting at the top. Students and fresh graduates are
          especially exposed: they apply to many unfamiliar companies, share resumes freely, and rarely have formal
          security training.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-4 w-4 text-primary" /> What Scamterns contributes
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Scamterns focuses on a narrow but high-impact slice of the challenge: <strong className="text-foreground">internship
          and entry-level job scams</strong>. We combine a pattern-based detector with a small, reviewed corpus of
          UAE-context scam emails (fake AED registration fees, Emirates ID phishing, fraudulent recruiter domains) and
          surface the reasoning to the user — so people learn to spot the next scam themselves, not just the one we
          flagged.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
          <li>• Transparent, explainable flags instead of a black-box score</li>
          <li>• Dubai-specific ruleset tuned for BPDC students and UAE recruiters</li>
          <li>• A learning mini-game to build long-term recognition skills</li>
          <li>• Open feedback loop — users can report misses to improve the model</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 font-semibold">
          <Users className="h-4 w-4 text-primary" /> Where we are (honest numbers)
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">120+</div>
            <div className="text-xs text-muted-foreground mt-1">scam emails flagged in beta</div>
          </div>
          <div>
            <div className="text-2xl font-bold">~40</div>
            <div className="text-xs text-muted-foreground mt-1">student testers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-muted-foreground mt-1">campus served (BPDC)</div>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          We're a beta project, not a finished product. These numbers will grow as more students try the tool — and
          we'd rather report small, real figures than inflated ones.
        </p>
      </section>
    </div>
  );
}
