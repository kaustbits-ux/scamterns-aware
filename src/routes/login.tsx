import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Chrome } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — CyberSafety" }] }),
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="relative min-h-[80vh]">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />
      <div className="relative mx-auto max-w-md px-5 py-16">
        <div className="rounded-2xl border border-border bg-card shadow-soft p-8">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="mt-6 text-center text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to access your dashboard" : "Start scanning with confidence"}
          </p>

          <Button variant="outline" className="w-full mt-6 gap-2" onClick={() => toast.info("Connect Lovable Cloud to enable Google login")}>
            <Chrome className="h-4 w-4" /> Continue with Google
          </Button>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" />or continue with email<div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="email" placeholder="you@university.edu" className="pl-9" />
              </div>
            </div>
            <div>
              <Label className="text-sm">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-9" />
              </div>
            </div>
            <Button className="w-full mt-2" onClick={() => toast.info("Connect Lovable Cloud to enable auth")}>
              {mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </div>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>New to CyberSafety? <button className="text-primary font-medium" onClick={() => setMode("signup")}>Create account</button></>
            ) : (
              <>Already have an account? <button className="text-primary font-medium" onClick={() => setMode("login")}>Sign in</button></>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Want to skip signup? <Link to="/checker" className="text-primary">Try Quick Check</Link>
        </p>
      </div>
    </div>
  );
}
