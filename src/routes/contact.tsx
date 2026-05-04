import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Scamterns" },
      { name: "description", content: "Report a scam, share feedback, or get in touch with the Scamterns team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-3 py-1 text-xs">
        <MessageSquare className="h-3.5 w-3.5 text-primary" /> Contact Us
      </div>
      <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">Get in touch</h1>
      <p className="mt-3 text-muted-foreground max-w-xl">
        Found a scam Scamterns missed? Want to test the beta? Drop us a note — we read every message.
      </p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_280px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent — we'll get back to you soon.");
            setForm({ name: "", email: "", message: "" });
          }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" /> Send message
          </Button>
        </form>

        <aside className="space-y-4 text-sm">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 font-semibold">
              <Mail className="h-4 w-4 text-primary" /> Email
            </div>
            <a href="mailto:team@scamterns.app" className="mt-2 block text-muted-foreground hover:text-foreground">
              team@scamterns.app
            </a>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="font-semibold">Based in</div>
            <p className="mt-2 text-muted-foreground">Dubai, UAE — built by students at BITS Pilani Dubai Campus.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
