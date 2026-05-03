import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/recruiters")({
  head: () => ({ meta: [{ title: "Get CyberSafe Certified — CyberSafety" }] }),
  component: Recruiters,
});

function Recruiters() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ company: "", website: "", email: "", linkedin: "", listings: "" });

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_440px] items-start">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> For Recruiters
          </div>
          <h1 className="mt-4 text-3xl lg:text-4xl font-bold">Get CyberSafe Certified</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Join 1,200+ companies that have built trust with student applicants by getting verified.
            CyberSafe Certified employers see 3.4× higher application quality on average.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Verified badge on every listing",
              "Featured on the CyberSafety jobs board",
              "Free for non-profits and academic partners",
              "Compliance review by our trust team",
            ].map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--success)]/15 text-[color:var(--success)]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          {submitted ? (
            <div className="text-center py-8">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft" style={{ background: "var(--gradient-brand)" }}>
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Application received</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our trust team will review and respond within 3 business days.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Apply for the badge</h3>
              </div>
              <div className="space-y-3">
                {([
                  ["company", "Company name"],
                  ["website", "Company website"],
                  ["email", "Recruiter email"],
                  ["linkedin", "Company LinkedIn URL"],
                  ["listings", "Internship listings page"],
                ] as const).map(([k, label]) => (
                  <div key={k}>
                    <Label className="text-sm">{label}</Label>
                    <Input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                  </div>
                ))}
                <Button
                  className="w-full mt-2"
                  onClick={() => {
                    if (!form.company || !form.email) { toast.error("Company and email required"); return; }
                    setSubmitted(true);
                    toast.success("Application submitted");
                  }}
                >
                  Apply for CyberSafe Certified Badge
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
