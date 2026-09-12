import {
  assignmentType,
  academicLevel,
  subject,
  deadline,
} from "@/config/dropdown-fields.config";
import { extractLabelsFromConfig, getDefaultLabel } from "@/utils/dropdownUtils";

export const PENDING_ORDER = "tutorspie-pending-order-v1";
const LEGACY_PENDING = "tutorspie-demo-pending-order-v1";
const HERO_LEAD_KEY = "heroLeadData";

// Extract options from dynamic config
export const TYPE_OPTIONS = extractLabelsFromConfig(assignmentType);
export const LEVEL_OPTIONS = extractLabelsFromConfig(academicLevel);
export const SUBJECT_OPTIONS = extractLabelsFromConfig(subject);
export const DEADLINE_OPTIONS = extractLabelsFromConfig(deadline);

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
  { id: "grammar", label: "Grammar Check Report", price: 5.75 },
  { id: "summary", label: "One Page Summary", price: 14.7 },
  { id: "abstract", label: "Abstract Page", price: 14.7 },
  { id: "quality", label: "Quality Double-check", price: 2.92 },
];

export const ADDON_ID_TO_NAME = {
  grammar: "Grammar Check Report",
  summary: "One Page Summary",
  abstract: "Abstract Page",
  quality: "Quality Double-check",
};

// Deadline rates per page (backend pricing)
export const DEADLINE_RATES = {
  "15 days": 8.0,
  "10 days": 9.2,
  "7 days": 9.25,
  "5 days": 9.3,
  "4 days": 10.1,
  "3 days": 10.15,
  "2 days": 11.15,
  "24 hours": 12.0,
  "12 hours": 12.85,
  "6 hours": 14.65,
  "3 hours": 14.7,
};

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
    typeOfWork: getDefaultLabel(assignmentType) || TYPE_OPTIONS[0] || "Short Essay",
    academicLevel: getDefaultLabel(academicLevel) || LEVEL_OPTIONS[0] || "Undergraduate",
    subject: getDefaultLabel(subject) || SUBJECT_OPTIONS[0] || "History",
    topic: "",
    deadline: getDefaultLabel(deadline) || DEADLINE_OPTIONS[0] || "3 days",
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

export function priceBreakdown(order, backendPricing) {
  if (backendPricing) {
    const service =
      backendPricing.calculatedAmount ??
      backendPricing.assignmentAmount ??
      backendPricing.finalAmount ??
      0;
    const discount = backendPricing.discountAmount || 0;
    const addons = backendPricing.addOnsAmount || 0;
    const final = backendPricing.finalAmount ?? service;
    return {
      service,
      discount,
      addons,
      final,
      currency: backendPricing.currency || "usd",
    };
  }
  const base = 44 + Math.max(0, (order?.pages || 1) - 1) * 22;
  const extras = expertFee(order?.expert) + addonTotal(order?.addons || []);
  const service = base + extras;
  const discount = service * 0.5;
  const final = service - discount;
  return {
    service,
    discount,
    addons: addonTotal(order?.addons || []),
    final,
    currency: "usd",
  };
}

export function buildBackendOrderPayload(order) {
  const spacing = String(order.lineSpacing || "")
    .toLowerCase()
    .includes("single")
    ? "single"
    : "double";
  const pages = Math.max(1, Number(order.pages) || 1);
  const calculatedWords = pages * (spacing === "single" ? 550 : 275);
  const selectedAddOns = (order.addons || []).map(
    (id) => ADDON_ID_TO_NAME[id] || id,
  );
  
  // Extract deadline period from full label (e.g., "15 days / Sep 10, 2026" -> "15 days")
  const extractDeadline = (fullDeadline) => {
    if (!fullDeadline) return "3 days";
    const match = fullDeadline.match(/^([\d]+\s+(days|hours))/i);
    return match ? match[1] : fullDeadline.split("/")[0].trim();
  };

  return {
    tag: import.meta.env.VITE_SITE_TAG || "tutorspath",
    assignmentType: order.typeOfWork || "Short Essay",
    academicLevel: order.academicLevel || "Undergraduate",
    subject: order.subject || "History",
    title: (order.topic || "Writing Project").trim(),
    deadline: extractDeadline(order.deadline),
    numberOfPages: pages,
    wordCount: calculatedWords,
    lineSpacing: spacing,
    guidelines: (order.details || "").trim(),
    citationStyle: order.citation || "Non Specific",
    references: Math.max(0, Number(order.references) || 0),
    fontStyle: order.font || "Calibri (Standard)",
    language: order.language || "US English",
    addOns: selectedAddOns,
  };
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
    typeOfWork: matchOption(values[0], TYPE_OPTIONS, getDefaultLabel(assignmentType) || TYPE_OPTIONS[0] || "Short Essay"),
    academicLevel: matchOption(values[1], LEVEL_OPTIONS, getDefaultLabel(academicLevel) || LEVEL_OPTIONS[0] || "Undergraduate"),
    subject: matchOption(values[2], SUBJECT_OPTIONS, getDefaultLabel(subject) || SUBJECT_OPTIONS[0] || "History"),
    deadline: matchOption(values[3], DEADLINE_OPTIONS, getDefaultLabel(deadline) || DEADLINE_OPTIONS[0] || "3 days"),
  });
}

export function selectionsFromOrder(order) {
  return [order.typeOfWork, order.academicLevel, order.subject, order.deadline];
}

/**
 * Read hero lead data from localStorage
 * This contains the 4 fields selected on the home page hero form
 */
export function readHeroLeadData() {
  try {
    const raw = localStorage.getItem(HERO_LEAD_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    
    // Convert value IDs to labels for matching
    const typeLabel = findLabelByValue(assignmentType, data.type);
    const levelLabel = findLabelByValue(academicLevel, data.level);
    const subjectLabel = findLabelByValue(subject, data.subject);
    const deadlineLabel = findLabelByValue(deadline, data.deadline);
    
    return {
      typeOfWork: typeLabel,
      academicLevel: levelLabel,
      subject: subjectLabel,
      deadline: deadlineLabel,
    };
  } catch {
    return null;
  }
}

/**
 * Clear hero lead data from localStorage after it's been used
 */
export function clearHeroLeadData() {
  localStorage.removeItem(HERO_LEAD_KEY);
}

/**
 * Find option label by value from config
 */
function findLabelByValue(config, value) {
  if (!config || !value) return null;
  
  // Handle grouped structure (assignmentType, subject)
  if (config.groups) {
    for (const group of config.groups) {
      const option = group.options.find((opt) => String(opt.value) === String(value));
      if (option) return option.label;
    }
  }
  
  // Handle flat structure (academicLevel, deadline)
  if (config.options) {
    const option = config.options.find((opt) => String(opt.value) === String(value));
    if (option) return option.label;
  }
  
  return null;
}
