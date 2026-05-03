import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Inbox, Star, Send, FileText, AlertTriangle, ShieldCheck, Trash2,
  Archive, Tag, Menu, Settings, HelpCircle, Plus, RefreshCw, MoreVertical,
  ChevronLeft, ChevronRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { scanInput } from "@/lib/scam";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Scamterns — Verified Inbox" }] }),
  component: InboxPage,
});

type Email = {
  id: string;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  starred: boolean;
  label?: "verified" | "external" | "internal";
};

const EMAILS: Email[] = [
  {
    id: "1", sender: "Career Services BPDC", email: "careers@bits-pilani.ac.in",
    subject: "Summer Internship Drive 2026 — Pre-placement talk",
    preview: "Dear students, the pre-placement talk for Stripe is scheduled on Monday at 4 PM in the auditorium…",
    body: "Dear students, the pre-placement talk for Stripe is scheduled on Monday at 4 PM in the auditorium. Please register through the portal.",
    time: "10:24 AM", unread: true, starred: true, label: "internal",
  },
  {
    id: "2", sender: "Riya — Stripe Recruiting", email: "riya.k@stripe.com",
    subject: "Interview invitation — Software Engineering Intern",
    preview: "Hi, thanks for applying. We'd like to schedule a technical screen next week. Please pick a slot…",
    body: "Hi, thanks for applying to the SWE Intern role at Stripe. We'd like to schedule a 45-min technical screen next week. Please pick a slot from the calendar link.",
    time: "9:02 AM", unread: true, starred: false, label: "verified",
  },
  {
    id: "3", sender: "Global HR Solutions", email: "hr-team@globaljobs-hire.xyz",
    subject: "URGENT: Confirm your selection — Pay registration fee within 24 hours",
    preview: "Congratulations! You have been selected for our remote internship. Pay ₹4,999 registration fee immediately via UPI…",
    body: "Congratulations! You have been selected for our amazing remote internship opportunity. Kindly do the needful and pay ₹4,999 registration fee immediately via UPI within 24 hours to confirm your selection. Send your Aadhaar copy and bank account details ASAP. This is a limited time offer, act now.",
    time: "Yesterday", unread: true, starred: false, label: "external",
  },
  {
    id: "4", sender: "LinkedIn Jobs", email: "jobs-noreply@linkedin.com",
    subject: "5 new internships matching your profile",
    preview: "Based on your profile, here are this week's top picks from companies hiring CS interns…",
    body: "Based on your profile, here are this week's top picks: Razorpay, Notion, Figma, Linear, GitHub.",
    time: "Yesterday", unread: false, starred: false, label: "external",
  },
  {
    id: "5", sender: "Microsoft Careers", email: "no-reply@micros0ft-careers.top",
    subject: "Final notice — verify your account to receive offer letter",
    preview: "Dear esteemed candidate, click the link below to verify your bank account and receive your offer letter…",
    body: "Dear esteemed candidate, click the link below to verify your bank account and receive your offer letter. Final notice. Please revert back with your password and OTP within 24 hours.",
    time: "Mon", unread: true, starred: false, label: "external",
  },
  {
    id: "6", sender: "Prof. Anand Iyer", email: "anand.iyer@bits-pilani.ac.in",
    subject: "Re: Project review on Friday",
    preview: "Sounds good. Please share your slides by Thursday evening so I can go through them before the meeting.",
    body: "Sounds good. Please share your slides by Thursday evening so I can go through them before the meeting.",
    time: "Mon", unread: false, starred: true, label: "internal",
  },
  {
    id: "7", sender: "Notion Talent", email: "talent@notion.so",
    subject: "Next steps — Product Design Intern",
    preview: "Hey! Thanks again for the chat. We'd love to move you to the design exercise round…",
    body: "Hey! Thanks again for the chat. We'd love to move you to the design exercise round. You'll have 5 days to complete it.",
    time: "Sun", unread: false, starred: false, label: "verified",
  },
  {
    id: "8", sender: "Crypto Jobs Daily", email: "rewards@cryptojobs-bonus.click",
    subject: "Earn $5000/week working from anywhere — no experience needed",
    preview: "Guaranteed selection. Send your passport copy and we'll wire transfer the joining bonus immediately…",
    body: "Guaranteed selection. Send your passport copy and we'll wire transfer the joining bonus immediately. Easy money, work from anywhere, no experience needed. Pay small processing fee in bitcoin.",
    time: "Sat", unread: false, starred: false, label: "external",
  },
];

const FOLDERS: { id: string; label: string; icon: typeof Inbox; count?: number }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 5 },
  { id: "starred", label: "Starred", icon: Star },
  { id: "verified", label: "Verified", icon: ShieldCheck, count: 2 },
  { id: "flagged", label: "Flagged", icon: AlertTriangle, count: 3 },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "trash", label: "Trash", icon: Trash2 },
];

type FolderId = string;

function scoreOf(e: Email) {
  return scanInput({ kind: "email", sender: e.email, subject: e.subject, body: e.body });
}

function InboxPage() {
  const [folder, setFolder] = useState<FolderId>("inbox");
  const [selected, setSelected] = useState<Email | null>(EMAILS[0]);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    let list = EMAILS.slice();
    if (folder === "starred") list = list.filter((e) => e.starred);
    if (folder === "verified") list = list.filter((e) => scoreOf(e).status === "Safe");
    if (folder === "flagged") list = list.filter((e) => scoreOf(e).status !== "Safe");
    if (folder === "sent" || folder === "drafts" || folder === "trash") list = [];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((e) =>
        `${e.sender} ${e.email} ${e.subject} ${e.preview}`.toLowerCase().includes(q)
      );
    }
    return list;
  }, [folder, query]);

  return (
    <div className="bg-[oklch(0.97_0.005_250)] dark:bg-background">
      {/* Top hero / pitch strip */}
      <section className="relative border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:py-14 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Verified Inbox by Scamterns
              <span className="rounded-full bg-primary/15 text-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                Beta
              </span>
            </div>
            <h1 className="mt-4 text-3xl lg:text-5xl font-semibold tracking-tight leading-[1.05]">
              The inbox that flags <span className="text-primary">scam internships</span> before you click.
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Built for BITS Pilani Dubai. Every recruiter email, offer letter and job link is scored in
              real time so students never fall for fake interviews, registration fees, or phishing offers.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/checker">
                <Button size="lg" className="shadow-soft gap-2">
                  Scan an email
                  <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    Beta
                  </span>
                </Button>
              </Link>
              <a
                href="https://phishingquiz.withgoogle.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Play scam-mail mini game
                </Button>
              </a>
            </div>
            <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[color:var(--success)]" /> SOC2-style heuristics</span>
              <span className="flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 text-[color:var(--warn)]" /> 12k+ scams blocked</span>
            </div>
          </div>
          <InboxStatsCard />
        </div>
      </section>

      {/* Gmail-style mail client */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
          {/* Mail toolbar */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-2.5 bg-card">
            <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-accent">
              <Menu className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <div className="grid h-7 w-7 place-items-center rounded-md text-white" style={{ background: "var(--gradient-brand)" }}>
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-sm">Verified Inbox</span>
            </div>
            <div className="ml-4 flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search mail"
                  className="pl-9 h-9 bg-secondary border-transparent focus-visible:bg-card"
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-accent" aria-label="Help"><HelpCircle className="h-4 w-4 text-muted-foreground" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-accent" aria-label="Settings"><Settings className="h-4 w-4 text-muted-foreground" /></button>
            </div>
          </div>

          <div className="grid grid-cols-12 min-h-[640px]">
            {/* Sidebar */}
            <aside className="col-span-3 lg:col-span-2 border-r border-border bg-card py-3">
              <div className="px-3">
                <Link to="/checker">
                  <button className="flex items-center gap-3 rounded-2xl bg-primary/10 hover:bg-primary/15 text-primary px-4 py-3 text-sm font-medium shadow-soft w-full transition">
                    <Plus className="h-5 w-5" /> <span className="hidden lg:inline">Compose</span>
                  </button>
                </Link>
              </div>
              <nav className="mt-3 px-1">
                {FOLDERS.map((f) => {
                  const Icon = f.icon;
                  const active = folder === f.id;
                  return (
                    <button
                      key={f.id} onClick={() => setFolder(f.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-sm rounded-r-full transition ${
                        active ? "bg-primary/12 text-primary font-semibold" : "text-foreground hover:bg-accent"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <span className="hidden lg:inline flex-1 text-left">{f.label}</span>
                      {f.count != null && (
                        <span className={`hidden lg:inline text-xs ${active ? "text-primary" : "text-muted-foreground"}`}>{f.count}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
              <div className="mt-4 px-4 hidden lg:block">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Labels</div>
                <LabelRow color="var(--success)" label="Verified" />
                <LabelRow color="var(--warn)" label="Suspicious" />
                <LabelRow color="var(--danger)" label="High Risk" />
              </div>
            </aside>

            {/* Email list */}
            <section className="col-span-9 lg:col-span-4 border-r border-border">
              <div className="flex items-center justify-between border-b border-border px-3 py-1.5 bg-card">
                <div className="flex items-center gap-1">
                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-accent"><Archive className="h-4 w-4 text-muted-foreground" /></button>
                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-accent"><RefreshCw className="h-4 w-4 text-muted-foreground" /></button>
                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-accent"><MoreVertical className="h-4 w-4 text-muted-foreground" /></button>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>1–{visible.length} of {visible.length}</span>
                  <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-accent"><ChevronLeft className="h-4 w-4" /></button>
                  <button className="grid h-7 w-7 place-items-center rounded-md hover:bg-accent"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
              <ul className="divide-y divide-border max-h-[640px] overflow-y-auto">
                {visible.map((e) => {
                  const r = scoreOf(e);
                  const active = selected?.id === e.id;
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => setSelected(e)}
                        className={`w-full text-left flex gap-3 px-4 py-3 transition border-l-2 ${
                          active ? "bg-accent border-l-primary" : "border-l-transparent hover:bg-accent/60"
                        } ${e.unread ? "font-medium" : ""}`}
                      >
                        <div className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-sm font-semibold ${avatarBg(e.sender)}`}>
                          {e.sender.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`truncate text-sm ${e.unread ? "text-foreground" : "text-muted-foreground"}`}>{e.sender}</span>
                            <RiskPill status={r.status} />
                            <span className="ml-auto text-[11px] text-muted-foreground flex-shrink-0">{e.time}</span>
                          </div>
                          <div className={`truncate text-sm mt-0.5 ${e.unread ? "text-foreground" : "text-muted-foreground"}`}>
                            {e.subject}
                          </div>
                          <div className="truncate text-xs text-muted-foreground mt-0.5">{e.preview}</div>
                        </div>
                      </button>
                    </li>
                  );
                })}
                {visible.length === 0 && (
                  <li className="px-6 py-16 text-center text-sm text-muted-foreground">Nothing here.</li>
                )}
              </ul>
            </section>

            {/* Email reader */}
            <section className="hidden lg:block col-span-6 bg-card">
              {selected ? <EmailReader email={selected} /> : (
                <div className="h-full grid place-items-center text-muted-foreground text-sm">Select an email</div>
              )}
            </section>
          </div>
        </div>
      </section>

      <FeatureGrid />
    </div>
  );
}

function InboxStatsCard() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-soft p-5 lg:p-6">
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md text-white" style={{ background: "var(--gradient-brand)" }}>
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">Today's scan summary</div>
            <div className="text-xs text-muted-foreground">Updated just now</div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">live</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Verified" value="142" tone="success" />
        <Stat label="Suspicious" value="38" tone="warn" />
        <Stat label="High Risk" value="11" tone="danger" />
      </div>
      <div className="mt-4 space-y-2">
        <PreviewRow status="High Risk" sender="hr-team@globaljobs-hire.xyz" subject="URGENT: Pay ₹4,999 to confirm…" />
        <PreviewRow status="Suspicious" sender="no-reply@micros0ft-careers.top" subject="Final notice — verify account" />
        <PreviewRow status="Safe" sender="riya.k@stripe.com" subject="Interview invitation — SWE Intern" />
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "warn" | "danger" }) {
  const color = tone === "success" ? "var(--success)" : tone === "warn" ? "var(--warn)" : "var(--danger)";
  return (
    <div className="rounded-lg border border-border bg-secondary/50 px-3 py-2.5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold mt-0.5" style={{ color }}>{value}</div>
    </div>
  );
}

function PreviewRow({ status, sender, subject }: { status: "Safe" | "Suspicious" | "High Risk"; sender: string; subject: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <RiskPill status={status} />
      <span className="text-muted-foreground truncate flex-1">{sender}</span>
      <span className="text-foreground truncate flex-[2]">{subject}</span>
    </div>
  );
}

function RiskPill({ status }: { status: "Safe" | "Suspicious" | "High Risk" }) {
  const map = {
    "Safe": { bg: "oklch(0.94 0.05 155)", fg: "oklch(0.35 0.12 155)", label: "Verified" },
    "Suspicious": { bg: "oklch(0.95 0.06 75)", fg: "oklch(0.42 0.14 60)", label: "Suspicious" },
    "High Risk": { bg: "oklch(0.94 0.06 25)", fg: "oklch(0.42 0.18 25)", label: "High Risk" },
  } as const;
  const s = map[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

function LabelRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 text-sm rounded-md hover:bg-accent cursor-pointer">
      <Tag className="h-3.5 w-3.5" style={{ color }} />
      <span className="text-foreground">{label}</span>
    </div>
  );
}

function avatarBg(name: string) {
  const palette = [
    "bg-[oklch(0.85_0.08_250)] text-[oklch(0.3_0.13_255)]",
    "bg-[oklch(0.88_0.07_180)] text-[oklch(0.32_0.12_200)]",
    "bg-[oklch(0.88_0.07_30)] text-[oklch(0.4_0.16_25)]",
    "bg-[oklch(0.88_0.08_140)] text-[oklch(0.34_0.13_155)]",
    "bg-[oklch(0.87_0.08_300)] text-[oklch(0.36_0.15_295)]",
  ];
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return palette[h % palette.length];
}

function EmailReader({ email }: { email: Email }) {
  const r = scoreOf(email);
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold leading-tight">{email.subject}</h2>
          <RiskPill status={r.status} />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${avatarBg(email.sender)}`}>
            {email.sender.split(" ").map((s) => s[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{email.sender} <span className="text-muted-foreground font-normal">&lt;{email.email}&gt;</span></div>
            <div className="text-xs text-muted-foreground">to me · {email.time}</div>
          </div>
        </div>
      </div>

      {/* Risk banner */}
      {r.status !== "Safe" && (
        <div
          className="mx-6 mt-4 rounded-lg border px-4 py-3 text-sm"
          style={{
            background: r.status === "High Risk" ? "oklch(0.97 0.04 25)" : "oklch(0.97 0.04 75)",
            borderColor: r.status === "High Risk" ? "oklch(0.85 0.12 25)" : "oklch(0.85 0.12 75)",
            color: r.status === "High Risk" ? "oklch(0.4 0.18 25)" : "oklch(0.4 0.14 60)",
          }}
        >
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4" /> CyberSafety flagged this message — Score {r.score}/100
          </div>
          <ul className="mt-2 list-disc pl-5 space-y-0.5 text-xs opacity-90">
            {r.redFlags.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
      {r.status === "Safe" && (
        <div className="mx-6 mt-4 rounded-lg border border-[oklch(0.85_0.1_155)] bg-[oklch(0.97_0.04_155)] px-4 py-3 text-sm text-[oklch(0.36_0.13_155)]">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-4 w-4" /> Verified sender — Score {r.score}/100
          </div>
        </div>
      )}

      <div className="px-6 py-5 text-sm leading-relaxed text-foreground">
        <p>{email.body}</p>
      </div>
      <div className="mt-auto border-t border-border px-6 py-3 flex items-center gap-2">
        <Button size="sm" variant="outline">Reply</Button>
        <Button size="sm" variant="outline">Forward</Button>
        <Link to="/checker" className="ml-auto">
          <Button size="sm">Run deep scan</Button>
        </Link>
      </div>
    </div>
  );
}

function FeatureGrid() {
  const items = [
    { icon: ShieldCheck, title: "Real-time scoring", desc: "Every email is analyzed by our heuristic engine — domains, content, urgency tactics, and impersonation." },
    { icon: AlertTriangle, title: "Block scam patterns", desc: "Recognizes registration-fee scams, fake offer letters, gift-card asks and crypto wire transfers." },
    { icon: Inbox, title: "Familiar inbox UX", desc: "Looks like Gmail. Acts like a security analyst. No new tool to learn — just a safer mailbox." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16">
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
