import { createFileRoute } from "@tanstack/react-router";
import { Milestone, Sparkles, Rocket, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Our Journey — Scamterns" },
      { name: "description", content: "How Scamterns started — from a campus problem at BITS Pilani Dubai to a beta scam-detection tool." },
    ],
  }),
  component: Journey,
});

const STEPS = [
  {
    icon: GraduationCap,
    date: "Early 2025",
    title: "The campus problem",
    body: "Students at BITS Pilani Dubai Campus kept receiving suspicious internship offers — fake recruiters asking for AED registration fees, Emirates ID copies, and crypto 'training' deposits. We started collecting samples.",
  },
  {
    icon: Sparkles,
    date: "Mid 2025",
    title: "First prototype",
    body: "A small classifier trained on flagged emails from peers. It ran in a notebook and could only score pasted text — but it caught 4 out of 5 known scams in our test set.",
  },
  {
    icon: Rocket,
    date: "Late 2025",
    title: "Scamterns beta",
    body: "We rebuilt the tool as a Gmail-style verifier with a Dubai-aware ruleset (BPDC domains, UAE recruiter patterns, AED-amount heuristics) and opened it to a small group of testers.",
  },
  {
    icon: Milestone,
    date: "2026",
    title: "Where we are now",
    body: "Still in active beta. Every detection is reviewed, the ruleset is updated weekly, and we're working with student volunteers to expand coverage beyond Dubai.",
  },
];

function Journey() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
        <Milestone className="h-3.5 w-3.5 text-primary" /> Our Journey
      </div>
      <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">From inbox frustration to a beta product</h1>
      <p className="mt-3 text-muted-foreground">
        Scamterns is a student-built project. Here's how it came together.
      </p>

      <ol className="mt-10 relative border-l border-border pl-6 space-y-8">
        {STEPS.map((s) => (
          <li key={s.title} className="relative">
            <span className="absolute -left-[33px] grid h-6 w-6 place-items-center rounded-full border border-border bg-card">
              <s.icon className="h-3.5 w-3.5 text-primary" />
            </span>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.date}</div>
            <div className="font-semibold mt-0.5">{s.title}</div>
            <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
