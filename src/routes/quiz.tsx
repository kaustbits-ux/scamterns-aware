import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, ShieldCheck, Sparkles, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Scam Mail Mini Game — Scamterns" },
      { name: "description", content: "Test your awareness — can you tell a real internship offer from a scam?" },
    ],
  }),
  component: Quiz,
});

type Question = {
  sender: string;
  email: string;
  subject: string;
  body: string;
  isScam: boolean;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    sender: "Gulf HR Solutions",
    email: "hr-team@gulfjobs-hire.xyz",
    subject: "URGENT: Confirm your Dubai internship — Pay AED 850 within 24 hours",
    body: "Congratulations! You've been selected for a remote internship with a Dubai firm. Pay an AED 850 registration fee via bank transfer within 24 hours and send a copy of your Emirates ID to confirm.",
    isScam: true,
    explanation:
      "Real employers never charge a registration fee, ask for your Emirates ID upfront, or pressure you with a 24-hour deadline. The domain (.xyz) and urgency are classic scam signals.",
  },
  {
    sender: "Aisha — Careem Recruiting",
    email: "aisha.r@careem.com",
    subject: "Interview invitation — SWE Intern, Dubai Internet City",
    body: "Hi! Thanks for applying to Careem. We'd like to schedule a 45-minute technical screen next week at our Dubai HQ. Please pick a slot from the calendar link below.",
    isScam: false,
    explanation:
      "Sent from a legitimate corporate domain (careem.com), with no payment, no document requests, and no pressure. A normal recruiter follow-up.",
  },
  {
    sender: "Emirates Group Careers",
    email: "no-reply@em1rates-careers.top",
    subject: "Final notice — verify your bank account to receive offer letter",
    body: "Dear esteemed candidate, click the link below to verify your UAE bank account and receive your offer letter. Reply with your password and OTP within 24 hours or your offer will be cancelled.",
    isScam: true,
    explanation:
      "Look at the domain: em1rates-careers.top — a typo-squatted lookalike, not emirates.com. No real employer asks for your password or OTP, ever.",
  },
  {
    sender: "Career Services BPDC",
    email: "careers@dubai.bits-pilani.ac.in",
    subject: "Pre-placement talk by Emirates NBD — Monday 4 PM",
    body: "Dear students, the pre-placement talk by Emirates NBD is scheduled on Monday at 4 PM in the BPDC auditorium, Academic City. Please register through the placement portal.",
    isScam: false,
    explanation:
      "Comes from the official BPDC domain, references a known company and on-campus venue, and links to the official placement portal — no personal info or payment requested.",
  },
  {
    sender: "Dubai Crypto Jobs",
    email: "rewards@dubaicrypto-bonus.click",
    subject: "Earn AED 18,000/week from your JBR apartment — no experience needed",
    body: "Guaranteed selection for a Dubai-based remote role. Send a copy of your passport and Emirates ID and we'll wire your joining bonus immediately. Pay a small AED processing fee in bitcoin to start.",
    isScam: true,
    explanation:
      "Unrealistic pay, 'no experience needed', a suspicious .click domain, requests for ID copies, and a crypto 'processing fee' — almost every scam red flag in one email.",
  },
  {
    sender: "Talabat Talent",
    email: "talent@talabat.com",
    subject: "Next steps — Product Design Intern, Dubai",
    body: "Hey! Thanks again for the chat. We'd love to move you to the design exercise round for our Dubai HQ team. You'll have 5 days to complete it, no rush.",
    isScam: false,
    explanation:
      "Legitimate corporate domain, references a real prior conversation, gives a reasonable deadline, asks for nothing personal or financial.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Quiz() {
  const [seed, setSeed] = useState(0);
  const deck = useMemo(() => shuffle(QUESTIONS), [seed]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);

  const q = deck[idx];
  const done = idx >= deck.length;

  const answer = (guessScam: boolean) => {
    if (answered) return;
    const correct = guessScam === q.isScam;
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setAnswered(true);
  };

  const next = () => {
    setAnswered(false);
    setIdx((i) => i + 1);
  };

  const restart = () => {
    setSeed((s) => s + 1);
    setIdx(0);
    setScore(0);
    setAnswered(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to inbox
      </Link>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
        <Sparkles className="h-3.5 w-3.5 text-primary" /> Scam Mail Mini Game
      </div>
      <h1 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight">Scam or legit?</h1>
      <p className="mt-2 text-muted-foreground">
        Read each email and decide. We'll explain why every time — so you sharpen your instincts.
      </p>

      {!done ? (
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Question {idx + 1} of {deck.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${((idx + (answered ? 1 : 0)) / deck.length) * 100}%` }}
            />
          </div>

          <article className="mt-6 rounded-xl border border-border bg-card shadow-soft overflow-hidden">
            <header className="border-b border-border px-5 py-3">
              <div className="text-sm font-semibold">{q.sender}</div>
              <div className="text-xs text-muted-foreground">&lt;{q.email}&gt;</div>
            </header>
            <div className="px-5 py-4">
              <div className="text-base font-semibold">{q.subject}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{q.body}</p>
            </div>
          </article>

          {!answered ? (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button size="lg" variant="outline" onClick={() => answer(false)} className="gap-2">
                <ShieldCheck className="h-4 w-4 text-[color:var(--success)]" /> Looks legit
              </Button>
              <Button size="lg" onClick={() => answer(true)} className="gap-2">
                <AlertTriangle className="h-4 w-4" /> It's a scam
              </Button>
            </div>
          ) : (
            <div
              className={`mt-6 rounded-xl border p-5 ${
                lastCorrect
                  ? "border-[color:var(--success)]/30 bg-[color:var(--success)]/10"
                  : "border-[color:var(--danger)]/30 bg-[color:var(--danger)]/10"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                {lastCorrect ? (
                  <><ShieldCheck className="h-4 w-4 text-[color:var(--success)]" /> Correct — this is {q.isScam ? "a scam" : "legit"}.</>
                ) : (
                  <><AlertTriangle className="h-4 w-4 text-[color:var(--danger)]" /> Not quite — this one is actually {q.isScam ? "a scam" : "legit"}.</>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
              <Button onClick={next} className="mt-4">
                {idx + 1 === deck.length ? "See results" : "Next email"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-border bg-card p-8 text-center shadow-soft">
          <div className="text-5xl font-bold text-gradient">{score}/{deck.length}</div>
          <p className="mt-3 text-muted-foreground">
            {score === deck.length
              ? "Perfect score — your scam radar is sharp."
              : score >= deck.length - 1
              ? "Great work — almost flawless."
              : score >= deck.length / 2
              ? "Solid start — keep practicing those red flags."
              : "Worth another round — the more you see, the easier it gets."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={restart} className="gap-2"><RefreshCw className="h-4 w-4" /> Play again</Button>
            <Link to="/checker"><Button variant="outline">Try the real scanner</Button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
