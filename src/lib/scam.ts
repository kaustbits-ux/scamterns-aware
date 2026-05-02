export type Email = {
  id: string;
  sender: string;
  senderName: string;
  subject: string;
  preview: string;
  receivedAt: string; // ISO
};

export const VIP_LIST = new Set<string>([
  "bitserp@bits-pilani.ac.in",
  "no-reply@classroom.google.com",
]);

export const SCAM_KEYWORDS = [
  "lottery",
  "winner",
  "prize",
  "bitcoin",
  "crypto",
  "wire transfer",
  "bank details",
  "password",
  "verify your account",
  "click here",
  "free gift",
  "congratulations",
  "claim now",
  "social security",
  "iphone",
  "gift card",
];

export const URGENCY_PHRASES = [
  "immediate",
  "action required",
  "urgent",
  "as soon as possible",
  "asap",
  "final notice",
  "expires today",
  "within 24 hours",
  "act now",
];

const INTERNAL_DOMAIN = "@bits-pilani.ac.in";

export function isExternal(sender: string) {
  return !sender.toLowerCase().endsWith(INTERNAL_DOMAIN);
}

export type ScoreBreakdown = {
  score: number;
  isVip: boolean;
  external: boolean;
  matchedKeywords: string[];
  matchedUrgency: string[];
};

export function scoreEmail(e: Email): ScoreBreakdown {
  const lowerSender = e.sender.toLowerCase();
  if (VIP_LIST.has(lowerSender)) {
    return { score: 0, isVip: true, external: false, matchedKeywords: [], matchedUrgency: [] };
  }
  let score = 0;
  const external = isExternal(e.sender);
  if (external) score += 40;

  const haystack = `${e.subject} ${e.preview}`.toLowerCase();
  const matchedKeywords = SCAM_KEYWORDS.filter((k) => haystack.includes(k));
  score += matchedKeywords.length * 15;

  const matchedUrgency = URGENCY_PHRASES.filter((u) => haystack.includes(u));
  if (matchedUrgency.length > 0) score += 20;

  return { score, isVip: false, external, matchedKeywords, matchedUrgency };
}

export function riskLabel(score: number, isVip: boolean) {
  if (isVip) return { label: "Safe (VIP)", tone: "safe" as const };
  if (score >= 75) return { label: "DANGER", tone: "danger" as const };
  if (score >= 40) return { label: "Suspicious", tone: "warn" as const };
  return { label: "Safe", tone: "safe" as const };
}
