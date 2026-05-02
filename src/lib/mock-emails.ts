import type { Email } from "./scam";

const now = Date.now();
const t = (h: number) => new Date(now - h * 3600_000).toISOString();

export const MOCK_EMAILS: Email[] = [
  {
    id: "1",
    sender: "registrar@bits-pilani.ac.in",
    senderName: "BITS Registrar",
    subject: "Mid-semester examination schedule released",
    preview: "Dear Students, the mid-semester exam schedule has been published on the academic portal.",
    receivedAt: t(1),
  },
  {
    id: "2",
    sender: "bitserp@bits-pilani.ac.in",
    senderName: "BITS ERP",
    subject: "URGENT: Action Required to verify your account password immediately",
    preview: "Click here to claim now. This is a phishing-looking subject but VIP override applies.",
    receivedAt: t(2),
  },
  {
    id: "3",
    sender: "no-reply@classroom.google.com",
    senderName: "Google Classroom",
    subject: "New assignment posted in CS F213",
    preview: "Your instructor posted a new assignment. Due next week.",
    receivedAt: t(3),
  },
  {
    id: "4",
    sender: "rewards@lotto-prize-intl.com",
    senderName: "International Lottery",
    subject: "CONGRATULATIONS! You are a lottery winner — claim now",
    preview:
      "You have won a prize of $5,000,000. Immediate action required. Send your bank details and password to claim now within 24 hours.",
    receivedAt: t(4),
  },
  {
    id: "5",
    sender: "support@arnaz-crypto.io",
    senderName: "Crypto Support",
    subject: "Urgent: verify your account or lose your bitcoin",
    preview: "Final notice. Click here to verify your account. Wire transfer pending.",
    receivedAt: t(5),
  },
  {
    id: "6",
    sender: "friend@iitb.ac.in",
    senderName: "Aarav (IITB)",
    subject: "Hey, sending you the notes",
    preview: "Hi! Here are the notes from yesterday's lecture. Catch up soon!",
    receivedAt: t(6),
  },
  {
    id: "7",
    sender: "hod.cs@bits-pilani.ac.in",
    senderName: "HoD, CS Dept",
    subject: "Department meeting on Friday",
    preview: "All faculty are requested to attend the meeting at 4 PM in the conference room.",
    receivedAt: t(8),
  },
  {
    id: "8",
    sender: "promo@shop-deals.net",
    senderName: "Shop Deals",
    subject: "Free gift card just for you!",
    preview: "Claim now your free gift card. Act now before it expires today.",
    receivedAt: t(10),
  },
  {
    id: "9",
    sender: "noreply@github.com",
    senderName: "GitHub",
    subject: "[security] New sign-in to your account",
    preview: "We noticed a new sign-in to your account from a new device.",
    receivedAt: t(12),
  },
  {
    id: "10",
    sender: "ceo@randomstartup.xyz",
    senderName: "Mr. Anonymous",
    subject: "URGENT — wire transfer needed ASAP",
    preview:
      "I need you to process a wire transfer immediately. Action required. Send password and bank details.",
    receivedAt: t(14),
  },
];
