export const PENDING_ORDER = "tutorspie-pending-order-v1";
const LEGACY_PENDING = "tutorspie-demo-pending-order-v1";
export const TYPE_OPTIONS = [
  "Short Essay",
  "Research Paper",
  "Case Study",
  "Dissertation Chapter",
  "Coursework",
  "Annotated Bibliography",
];
export const LEVEL_OPTIONS = ["High School", "Undergraduate", "Master", "PhD"];
export const SUBJECT_OPTIONS = [
  "Literature",
  "History",
  "Business",
  "Psychology",
  "Nursing",
  "Law",
  "Computer Science",
  "Economics",
  "Education",
  "Sociology",
];
export const DEADLINE_OPTIONS = [
  "6 hours",
  "12 hours",
  "24 hours",
  "2 days",
  "3 days",
  "5 days",
  "7 days",
  "10 days",
  "15 days",
];
export const SPACING_OPTIONS = ["Single Spaced", "Double Spaced"];
export const CITATION_OPTIONS = [
  "Non Specific",
  "APA",
  "MLA",
  "Chicago",
  "Harvard",
];
export const FONT_OPTIONS = ["Calibri (Standard)", "Times New Roman", "Arial"];
export const LANGUAGE_OPTIONS = ["US English", "UK English"];
export const ADDON_OPTIONS = [
  { id: "grammar", label: "Grammar Check Report", price: 8 },
  { id: "summary", label: "One Page Summary", price: 11 },
  { id: "abstract", label: "Abstract Page", price: 11 },
  { id: "quality", label: "Quality Double-check", price: 2.75 },
];
export const FREE_FEATURES = [
  { label: "Choose a 5-star Expert", was: 7 },
  { label: "Unlimited Revisions", was: 12 },
  { label: "Cover Page", was: 5 },
  { label: "Outline", was: 8 },
  { label: "Paper Formatting", was: 6 },
  { label: "Referencing & Bibliography", was: 9 },
  { label: "Turnitin Report", was: 15 },
  { label: "Dedicated User Area", was: 0 },
  { label: "24/7 Order Tracking", was: 0 },
  { label: "Periodic Email Alerts", was: 0 },
];
export function defaultOrder(partial) {
  return {
    typeOfWork: "Short Essay",
    academicLevel: "Undergraduate",
    subject: "History",
    topic: "",
    deadline: "3 days",
    pages: 1,
    lineSpacing: "Double Spaced",
    citation: "Non Specific",
    references: 0,
    font: "Calibri (Standard)",
    language: "US English",
    details: "",
    expert: "system",
    addons: [],
    ...partial,
  };
}
export function wordCount(pages, spacing) {
  return pages * (spacing === "Single Spaced" ? 550 : 275);
}
export function expertFee(expert) {
  if (expert === "rehire") return 5;
  if (expert === "choose") return 10;
  return 0;
}
export function addonTotal(addons) {
  return ADDON_OPTIONS.filter((a) => addons.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0,
  );
}
export function priceBreakdown(order) {
  const base = 44 + Math.max(0, order.pages - 1) * 22;
  const extras = expertFee(order.expert) + addonTotal(order.addons);
  const service = base + extras;
  const discount = service * 0.5;
  const final = service - discount;
  return { service, discount, addons: addonTotal(order.addons), final };
}
export function readPending() {
  try {
    const raw =
      sessionStorage.getItem(PENDING_ORDER) ||
      sessionStorage.getItem(LEGACY_PENDING);
    return raw ? { ...defaultOrder(), ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}
export function writePending(order) {
  sessionStorage.setItem(PENDING_ORDER, JSON.stringify(order));
}
export function clearPending() {
  sessionStorage.removeItem(PENDING_ORDER);
}
export function matchOption(value, options, fallback) {
  if (!value) return fallback;
  const found =
    options.find((o) => o.toLowerCase() === value.toLowerCase()) ||
    options.find(
      (o) =>
        o.toLowerCase().includes(value.toLowerCase()) ||
        value.toLowerCase().includes(o.toLowerCase()),
    );
  return found || fallback;
}
export function orderFromHero(values) {
  return defaultOrder({
    typeOfWork: matchOption(values[0], TYPE_OPTIONS, "Short Essay"),
    academicLevel: matchOption(values[1], LEVEL_OPTIONS, "Undergraduate"),
    subject: matchOption(values[2], SUBJECT_OPTIONS, "History"),
    deadline: matchOption(values[3], DEADLINE_OPTIONS, "3 days"),
  });
}
export function selectionsFromOrder(order) {
  return [order.typeOfWork, order.academicLevel, order.subject, order.deadline];
}
