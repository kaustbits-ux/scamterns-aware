import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Link2, FileText, Search, Loader2, AlertTriangle, ShieldCheck, Save, Flag, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// inline ScoreRing below
import { scanInput, type ScanInput, type ScanResult } from "@/lib/scam";
import { toast } from "sonner";

export const Route = createFileRoute("/checker")({
  head: () => ({ meta: [{ title: "Scam Checker — CyberSafety" }, { name: "description", content: "Scan suspicious emails, job links and listings instantly." }] }),
  component: Checker,
});

type Tab = "email" | "url" | "text";

function Checker() {
  const [tab, setTab] = useState<Tab>("email");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const reset = () => { setResult(null); setSender(""); setSubject(""); setBody(""); setUrl(""); setText(""); };

  const runScan = () => {
    let input: ScanInput;
    if (tab === "email") {
      if (!sender && !subject && !body) { toast.error("Paste an email to scan."); return; }
      input = { kind: "email", sender, subject, body };
    } else if (tab === "url") {
      if (!url) { toast.error("Paste a URL to scan."); return; }
      input = { kind: "url", url };
    } else {
      if (!text) { toast.error("Paste a job description to scan."); return; }
      input = { kind: "text", text };
    }
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const r = scanInput(input);
      setResult(r);
      setScanning(false);
      if (r.tone === "danger") toast.error(`High risk: ${r.redFlags.length} red flags detected`);
      else if (r.tone === "warn") toast.warning("Looks suspicious — verify independently");
      else toast.success("Scan complete — looks safe");
    }, 1100);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid -z-10" aria-hidden />
      <div className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Quick Check · No signup required
          </div>
          <h1 className="mt-4 text-3xl lg:text-4xl font-bold">Scan suspicious offers in seconds</h1>
          <p className="mt-3 text-muted-foreground">Email, URL, or job description — get an instant trust score and red-flag breakdown.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
          <div className="flex border-b border-border">
            <TabBtn active={tab === "email"} onClick={() => setTab("email")} icon={<Mail className="h-4 w-4" />}>Check Email</TabBtn>
            <TabBtn active={tab === "url"} onClick={() => setTab("url")} icon={<Link2 className="h-4 w-4" />}>Check Job Link</TabBtn>
            <TabBtn active={tab === "text"} onClick={() => setTab("text")} icon={<FileText className="h-4 w-4" />}>Check Description</TabBtn>
          </div>

          <div className="p-6 lg:p-8 space-y-4">
            {tab === "email" && (
              <>
                <Field label="Sender Email Address">
                  <Input placeholder="recruiter@company.com" value={sender} onChange={(e) => setSender(e.target.value)} />
                </Field>
                <Field label="Subject Line">
                  <Input placeholder="Internship offer — Action required" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </Field>
                <Field label="Email Body">
                  <Textarea rows={8} placeholder="Paste the full email body here…" value={body} onChange={(e) => setBody(e.target.value)} />
                </Field>
              </>
            )}
            {tab === "url" && (
              <Field label="Job / Internship URL">
                <Input placeholder="https://example.com/internship-apply" value={url} onChange={(e) => setUrl(e.target.value)} />
              </Field>
            )}
            {tab === "text" && (
              <Field label="Internship / Job Description">
                <Textarea rows={10} placeholder="Paste the full listing text here…" value={text} onChange={(e) => setText(e.target.value)} />
              </Field>
            )}

            <div className="pt-2 flex flex-wrap gap-3">
              <Button size="lg" onClick={runScan} disabled={scanning} className="gap-2 shadow-soft">
                {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {scanning ? "Scanning…" : tab === "email" ? "Scan Email" : tab === "url" ? "Scan Link" : "Scan Text"}
              </Button>
              {(result || scanning) && (
                <Button variant="ghost" size="lg" onClick={reset} className="gap-2">
                  <RotateCcw className="h-4 w-4" /> Scan Another
                </Button>
              )}
            </div>
          </div>
        </div>

        {scanning && <ScannerAnimation />}
        {result && <ResultCard result={result} onReset={reset} />}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition ${
        active ? "bg-accent text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
    >
      {icon}{children}
    </button>
  );
}

function ScannerAnimation() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
      <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-2xl scan-sweep" style={{ background: "var(--gradient-brand)" }}>
        <ShieldCheck className="absolute inset-0 m-auto h-10 w-10 text-white" />
      </div>
      <div className="mt-4 text-sm font-medium">CyberSafety Trusted Scan Engine</div>
      <div className="text-xs text-muted-foreground mt-1">Analyzing 30+ scam indicators…</div>
    </div>
  );
}

function ResultCard({ result, onReset }: { result: ScanResult; onReset: () => void }) {
  const toneColor = result.tone === "danger" ? "var(--danger)" : result.tone === "warn" ? "var(--warn)" : "var(--success)";
  const Icon = result.tone === "safe" ? CheckCircle2 : AlertTriangle;
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card shadow-soft overflow-hidden animate-fade-up">
      <div className="p-6 lg:p-8 grid gap-6 lg:grid-cols-[260px_1fr] border-b border-border">
        <div className="flex flex-col items-center justify-center text-center">
          <ScoreRing score={result.score} tone={result.tone} size={140} />
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `color-mix(in oklab, ${toneColor} 15%, transparent)`, color: toneColor }}>
            <Icon className="h-3.5 w-3.5" /> {result.status}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">AI Summary</div>
          <p className="mt-2 text-sm leading-relaxed">{result.summary}</p>
          <div className="mt-5 rounded-xl border border-border p-4" style={{ background: `color-mix(in oklab, ${toneColor} 8%, transparent)` }}>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Recommended Action</div>
            <div className="mt-1 font-semibold" style={{ color: toneColor }}>{result.action}</div>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-[color:var(--warn)]" /> Red flags detected ({result.redFlags.length})
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {result.redFlags.map((f) => (
            <li key={f} className="rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: toneColor }} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border bg-accent/30 p-4 flex flex-wrap gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={() => toast.success("Saved to your dashboard")} className="gap-2"><Save className="h-4 w-4" />Save Result</Button>
        <Button variant="outline" size="sm" onClick={() => toast.success("Reported to moderators")} className="gap-2"><Flag className="h-4 w-4" />Report Scam</Button>
        <Button size="sm" onClick={onReset} className="gap-2"><RotateCcw className="h-4 w-4" />Scan Another</Button>
      </div>
    </div>
  );
}
