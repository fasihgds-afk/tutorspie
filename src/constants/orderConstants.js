import {
  assignmentType,
  academicLevel,
  subject,
  deadline,
} from "@/config/dropdown-fields.config";
import { extractLabelsFromConfig, getDefaultLabel } from "@/utils/dropdownUtils";

export const PENDING_ORDER_KEY = "tutorspie-pending-order-v1";

// Extract options from dynamic config
export const TYPE_OPTIONS = extractLabelsFromConfig(assignmentType);
export const LEVEL_OPTIONS = extractLabelsFromConfig(academicLevel);
export const SUBJECT_OPTIONS = extractLabelsFromConfig(subject);
export const DEADLINE_OPTIONS = extractLabelsFromConfig(deadline);

// Get default values from config
export const DEFAULT_TYPE = getDefaultLabel(assignmentType) || TYPE_OPTIONS[0];
export const DEFAULT_LEVEL = getDefaultLabel(academicLevel) || LEVEL_OPTIONS[0];
export const DEFAULT_SUBJECT = getDefaultLabel(subject) || SUBJECT_OPTIONS[0];
export const DEFAULT_DEADLINE = getDefaultLabel(deadline) || DEADLINE_OPTIONS[0];

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

// Reverse mapping: Add-on name -> ID
export const ADDON_NAME_TO_ID = {
  "Grammar Check Report": "grammar",
  "One Page Summary": "summary",
  "Abstract Page": "abstract",
  "Quality Double-check": "quality",
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
  { label: "Choose a 5-star Expert", was: 0 },
  { label: "Unlimited Revisions", was: 0 },
  { label: "Cover Page", was: 0 },
  { label: "Outline", was: 0 },
  { label: "Paper Formatting", was: 0 },
  { label: "Referencing & Bibliography", was: 0 },
  { label: "Turnitin Report", was: 0 },
  { label: "Dedicated User Area", was: 0 },
  { label: "24/7 Order Tracking", was: 0 },
  { label: "Periodic Email Alerts", was: 0 },
];

export const ORDER_STATUS = {
  DRAFT: "draft",
  AWAITING_PAYMENT: "awaiting_payment",
  PAID: "paid",
  IN_PROGRESS: "in_progress",
  UNDER_REVIEW: "under_review",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};
