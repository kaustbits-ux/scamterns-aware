import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/checker", label: "Checker" },
  { to: "/journey", label: "Our Journey" },
  { to: "/mission", label: "Our Mission" },
  { to: "/contact", label: "Contact Us" },
  { to: "/reviews", label: "Reviews" },
] as const;

export function Navbar({ theme, onToggleTheme }: { theme: "light" | "dark"; onToggleTheme: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground bg-accent" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-accent/60" }}
              className="rounded-md px-3 py-2 text-sm font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-foreground transition hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/checker" className="hidden sm:block">
            <Button size="sm" className="shadow-soft">Scan Now</Button>
          </Link>
          <button
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-border bg-card"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-5 py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Login</Button>
              </Link>
              <Link to="/checker" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" className="w-full">Scan Now</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
