// Heuristic scam scoring — runs entirely client-side for Quick Check Mode.

export type ScanInput =
  | { kind: "email"; sender: string; subject: string; body: string }
  | { kind: "url"; url: string }
  | { kind: "text"; text: string };

export type ScanResult = {
  score: number; // 0-100, higher = safer
  tone: "safe" | "warn" | "danger";
  status: "Safe" | "Suspicious" | "High Risk";
  redFlags: string[];
  summary: string;
  action: string;
};

const SUSPICIOUS_TLDS = [".xyz", ".top", ".click", ".gq", ".tk", ".ml", ".cf", ".work", ".loan"];
const FREE_MAIL = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "proton.me", "icloud.com"];
const URGENCY = ["urgent", "immediately", "act now", "within 24 hours", "expires today", "final notice", "asap", "limited time"];
const MONEY_REQ = ["registration fee", "training fee", "security deposit", "processing fee", "wire transfer", "bitcoin", "crypto", "gift card", "western union"];
const PERSONAL_REQ = ["aadhaar", "ssn", "social security", "bank account", "credit card", "password", "otp", "passport copy"];
const VAGUE = ["amazing opportunity", "work from anywhere", "no experience needed", "earn $", "easy money", "guaranteed selection"];
const GRAMMAR = ["kindly do the needful", "revert back", "esteemed candidate", "dear beloved", "pls"];

export function scanInput(input: ScanInput): ScanResult {
  const flags: string[] = [];
  let score = 100;

  const allText = (
    input.kind === "email" ? `${input.sender} ${input.subject} ${input.body}` :
    input.kind === "url" ? input.url :
    input.text
  ).toLowerCase();

  if (input.kind === "email") {
    const domain = (input.sender.split("@")[1] || "").toLowerCase().trim();
    if (!domain) {
      flags.push("Missing or malformed sender domain");
      score -= 25;
    } else {
      if (FREE_MAIL.includes(domain)) {
        flags.push("Recruiter using free webmail (gmail/yahoo) — major red flag");
        score -= 25;
      }
      if (SUSPICIOUS_TLDS.some((t) => domain.endsWith(t))) {
        flags.push(`Suspicious top-level domain: ${domain}`);
        score -= 20;
      }
      if (/\d{3,}/.test(domain)) {
        flags.push("Sender domain contains unusual number sequences");
        score -= 8;
      }
      // impersonation check
      if (/(g00gle|micros0ft|amaz0n|payp[a4]l|appl3)/.test(domain)) {
        flags.push("Possible brand impersonation in sender domain");
        score -= 30;
      }
    }
  }

  if (input.kind === "url") {
    let host = "";
    try { host = new URL(input.url.startsWith("http") ? input.url : `https://${input.url}`).hostname.toLowerCase(); } catch { /* */ }
    if (!host) {
      flags.push("Could not parse URL");
      score -= 20;
    } else {
      if (SUSPICIOUS_TLDS.some((t) => host.endsWith(t))) { flags.push(`Suspicious TLD: ${host}`); score -= 25; }
      if (host.split(".").length > 3) { flags.push("Excessive subdomain depth"); score -= 10; }
      if (/-/.test(host) && host.length > 25) { flags.push("Long hyphenated hostname (typosquatting pattern)"); score -= 10; }
      if (/(g00gle|micr0soft|payp[a4]l|amaz0n)/.test(host)) { flags.push("Possible brand impersonation"); score -= 30; }
      if (input.url.startsWith("http://")) { flags.push("Insecure HTTP (no TLS)"); score -= 8; }
    }
  }

  // text-based heuristics
  const matchedUrgency = URGENCY.filter((k) => allText.includes(k));
  if (matchedUrgency.length) { flags.push(`Urgency tactics: ${matchedUrgency.slice(0, 3).join(", ")}`); score -= 8 * matchedUrgency.length; }

  const matchedMoney = MONEY_REQ.filter((k) => allText.includes(k));
  if (matchedMoney.length) { flags.push(`Asks for payment / money transfer (${matchedMoney[0]})`); score -= 15 * matchedMoney.length; }

  const matchedPersonal = PERSONAL_REQ.filter((k) => allText.includes(k));
  if (matchedPersonal.length) { flags.push(`Requests sensitive personal info (${matchedPersonal[0]})`); score -= 15 * matchedPersonal.length; }

  const matchedVague = VAGUE.filter((k) => allText.includes(k));
  if (matchedVague.length >= 2) { flags.push("Vague, too-good-to-be-true language"); score -= 10; }

  const matchedGrammar = GRAMMAR.filter((k) => allText.includes(k));
  if (matchedGrammar.length) { flags.push("Common scam phrasing & grammar patterns"); score -= 10; }

  if (input.kind === "text" && input.text.length < 80) {
    flags.push("Job description is unusually short / vague");
    score -= 8;
  }

  score = Math.max(0, Math.min(100, score));

  let tone: ScanResult["tone"] = "safe";
  let status: ScanResult["status"] = "Safe";
  let action = "Safe to proceed — but always verify the company independently.";
  if (score < 50) {
    tone = "danger"; status = "High Risk";
    action = "Avoid and report immediately. Do not send personal info or money.";
  } else if (score < 75) {
    tone = "warn"; status = "Suspicious";
    action = "Verify independently before responding. Search the company on LinkedIn & official sites.";
  }

  const summary = buildSummary(input, status, flags);
  return { score, tone, status, redFlags: flags.length ? flags : ["No major red flags detected."], summary, action };
}

function buildSummary(input: ScanInput, status: string, flags: string[]) {
  const target =
    input.kind === "email" ? "this email" :
    input.kind === "url" ? "this link" :
    "this listing";
  if (flags.length === 0 || flags[0].startsWith("No major")) {
    return `${target} appears legitimate on the signals we checked, but always confirm the recruiter on LinkedIn and the company's official careers page.`;
  }
  return `Our engine rated ${target} as ${status.toLowerCase()}. We detected ${flags.length} red flag${flags.length === 1 ? "" : "s"}, including ${flags.slice(0, 2).map((f) => f.toLowerCase()).join(" and ")}.`;
}
