import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, AlertTriangle, ShieldCheck, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews & Community Reports — CyberSafety" }] }),
  component: Reviews,
});

type Review = {
  id: string; company: string; rating: number; warnings: number;
  text: string; tag: "Verified internship" | "Suspicious recruiter"; author: string; date: string;
};

const SEED: Review[] = [
  { id: "r1", company: "Stripe", rating: 5, warnings: 0, text: "Genuine offer, fast HR response, clear stipend agreement. Loved working there.", tag: "Verified internship", author: "Aanya M.", date: "2 days ago" },
  { id: "r2", company: "GlobalTech Hire", rating: 1, warnings: 12, text: "They asked for a ₹2,500 'training fee' before joining. Gmail recruiter. Classic scam.", tag: "Suspicious recruiter", author: "Rohan S.", date: "5 days ago" },
  { id: "r3", company: "Notion", rating: 5, warnings: 0, text: "Smooth process. Real Notion HR confirmed via LinkedIn before signing.", tag: "Verified internship", author: "Daniel O.", date: "1 week ago" },
  { id: "r4", company: "Quickearn Solutions", rating: 1, warnings: 8, text: "Promised $4000/mo for 'data entry'. Asked for bank details. Avoid.", tag: "Suspicious recruiter", author: "Priya V.", date: "1 week ago" },
];

function Reviews() {
  const [reviews, setReviews] = useState(SEED);
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="flex items-end justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">Community Reports</h1>
          <p className="mt-2 text-muted-foreground">Real student experiences. Verified internships and confirmed scams.</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2"><Plus className="h-4 w-4" />Submit Review</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r) => {
          const isScam = r.tag === "Suspicious recruiter";
          return (
            <article key={r.id} className={`rounded-2xl border bg-card p-5 shadow-soft ${isScam ? "border-[color:var(--danger)]/50" : "border-border"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{r.company}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "text-[color:var(--warn)] fill-current" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${isScam ? "bg-[color:var(--danger)]/15 text-[color:var(--danger)]" : "bg-[color:var(--success)]/15 text-[color:var(--success)]"}`}>
                  {isScam ? <AlertTriangle className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}{r.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>by {r.author} · {r.date}</span>
                {r.warnings > 0 && (
                  <span className="inline-flex items-center gap-1 text-[color:var(--danger)] font-semibold">
                    <AlertTriangle className="h-3 w-3" /> {r.warnings} scam reports
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {open && <ReviewModal onClose={() => setOpen(false)} onSubmit={(r) => { setReviews([r, ...reviews]); toast.success("Review submitted — thank you"); }} />}
    </div>
  );
}

function ReviewModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: Review) => void }) {
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [scam, setScam] = useState(false);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4 animate-fade-up" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Submit a review</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-3">
          <div><Label className="text-sm">Company</Label><Input value={company} onChange={(e) => setCompany(e.target.value)} /></div>
          <div>
            <Label className="text-sm">Rating</Label>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button key={i} onClick={() => setRating(i + 1)}>
                  <Star className={`h-6 w-6 ${i < rating ? "text-[color:var(--warn)] fill-current" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
          </div>
          <div><Label className="text-sm">Your experience</Label><Textarea rows={4} value={text} onChange={(e) => setText(e.target.value)} /></div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={scam} onChange={(e) => setScam(e.target.checked)} />
            Mark as suspicious recruiter
          </label>
          <Button
            className="w-full"
            onClick={() => {
              if (!company || !text) { toast.error("Fill in company and review"); return; }
              onSubmit({
                id: Math.random().toString(36).slice(2), company, rating, warnings: scam ? 1 : 0, text,
                tag: scam ? "Suspicious recruiter" : "Verified internship", author: "You", date: "just now",
              });
              onClose();
            }}
          >Submit Review</Button>
        </div>
      </div>
    </div>
  );
}
