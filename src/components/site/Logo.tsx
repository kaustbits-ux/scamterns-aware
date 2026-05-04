import logoLight from "@/assets/logo-light.jpeg";
import logoDark from "@/assets/logo-dark.jpeg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="h-10 w-10 rounded-xl overflow-hidden shadow-soft" aria-label="Scamterns logo">
        <img src={logoLight} alt="Scamterns" className="h-full w-full object-cover block dark:hidden" />
        <img src={logoDark} alt="Scamterns" className="h-full w-full object-cover hidden dark:block" />
      </div>
      <div className="leading-tight">
        <div className="font-display font-bold tracking-tight font-serif text-lg text-left">
          Scam<span className="text-gradient">terns</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Trusted Scan Engine
        </div>
      </div>
    </div>
  );
}
