import { ENV } from "@/config/env";
import { ADDON_ID_TO_NAME, ADDON_NAME_TO_ID } from "@/constants/orderConstants";

/**
 * Maps backend add-ons (array of objects or strings) to frontend add-on IDs
 */
export function mapBackendAddOnsToIds(backendAddOns) {
  if (!Array.isArray(backendAddOns)) return [];
  
  return backendAddOns
    .map((addon) => {
      // Backend can send either string or object with name property
      const addonName = typeof addon === 'string' ? addon : addon?.name;
      return ADDON_NAME_TO_ID[addonName];
    })
    .filter(Boolean); // Remove undefined values
}

/**
 * Transforms UI form data into the exact schema required by POST /orders and PATCH /orders/:id
 */
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
    // Match "15 days" or "24 hours" at the start
    const match = fullDeadline.match(/^([\d]+\s+(days|hours))/i);
    return match ? match[1] : fullDeadline.split("/")[0].trim();
  };

  return {
    tag: ENV.SITE_TAG,
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

/**
 * Normalizes backend order representation for presentation in frontend UI
 */
export function mapBackendOrderToUi(order) {
  if (!order) return null;

  const id = order._id || order.id;
  const orderCode =
    order.orderNumber || (id ? `TP-${String(id).slice(-8).toUpperCase()}` : "Order");

  return {
    ...order,
    id,
    orderCode,
    selections: [
      order.assignmentType || "Assignment",
      order.academicLevel || "Not set",
      order.subject || "Not set",
      order.deadline || "Not set",
    ],
    details: order.guidelines || "",
    created: order.createdAt || order.created,
  };
}

export default {
  buildBackendOrderPayload,
  mapBackendOrderToUi,
  mapBackendAddOnsToIds,
};
