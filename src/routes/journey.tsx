import { createFileRoute } from "@tanstack/react-router";
import {
  Milestone, AlertTriangle, Users, HelpCircle, Lightbulb, ShieldCheck, PenTool, Rocket,
} from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Our Journey — Scamterns" },
      { name: "description", content: "The Design Thinking journey behind Scamterns — from problem discovery to prototype and impact." },
    ],
  }),
  component: Journey,
});

const STEPS = [
  {
    icon: AlertTriangle,
    tag: "Problem & Context",
    title: "Understanding the Problem",
    body: "Students frequently receive internship offers through emails and online platforms, but lack reliable ways to verify authenticity. Scam emails often mimic trusted brands and use urgency or payment requests to exploit students.",
  },
  {
    icon: Users,
    tag: "User Research",
    title: "User Research",
    body: "We interviewed 8 students actively applying for internships. Most struggled to distinguish real opportunities and relied on brand names or urgency cues when making decisions.",
  },
  {
    icon: HelpCircle,
    tag: "Defining the Challenge",
    title: "Problem Definition",
    body: "How might we help students quickly verify internship opportunities before sharing personal information or committing time to potentially fraudulent applications?",
  },
  {
    icon: Lightbulb,
    tag: "Ideation",
    title: "Ideation & Decision Making",
    body: "We used SCAMPER to generate solutions and a Decision Matrix to evaluate them. A web-based platform was selected as the most effective and accessible solution.",
  },
  {
    icon: ShieldCheck,
    tag: "Solution",
    title: "Our Solution",
    body: "CyberSafety is a web platform that analyzes internship listings and emails to identify scam indicators and provide clear, easy-to-understand risk feedback.",
  },
  {
    icon: PenTool,
    tag: "Prototyping",
    title: "Prototype Development",
    body: "We created low-fidelity wireframes, high-fidelity designs, and a functional prototype with simulated scam detection logic to test usability and effectiveness.",
  },
  {
    icon: Rocket,
    tag: "Implementation & Impact",
    title: "Execution & Impact",
    body: "Using the Design Thinking framework, we built a structured roadmap and validated our approach through testing — aiming to make internship applications safer and more reliable for students.",
  },
];

function Journey() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
        <Milestone className="h-3.5 w-3.5 text-primary" /> Our Journey
      </div>
      <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">A Design Thinking journey</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        Scamterns was built step by step using the Design Thinking framework — from understanding the problem to validating a working prototype.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <article
            key={s.title}
            className="rounded-xl border border-border bg-card p-6 shadow-soft hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-4.5 w-4.5" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Step {i + 1}
              </span>
            </div>
            <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {s.tag}
            </div>
            <h3 className="mt-1 font-semibold text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
