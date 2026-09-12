import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Info, Minus, Plus } from "lucide-react";
import { useAuth } from "@/auth/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { orderService } from "@/services/orderService";
import { isUnpaidOrder, pendingFromBackendOrder } from "@/utils/orderMapper";
import { SiteHeader, SiteFooter } from "@/components/site-account";
import { OrderStepper } from "./OrderStepper";
import { OrderSidebar } from "./OrderSidebar";
import {
  assignmentType,
  academicLevel,
  subject,
  deadline,
} from "@/config/dropdown-fields.config";
import {
  SPACING_OPTIONS,
  CITATION_OPTIONS,
  FONT_OPTIONS,
  LANGUAGE_OPTIONS,
  ADDON_OPTIONS,
} from "@/constants/orderConstants";
import {
  defaultOrder,
  readPending,
  writePending,
  wordCount,
  orderFromHero,
  readHeroLeadData,
  clearHeroLeadData,
} from "@/components/order-data";
import { ROUTES } from "@/constants/routeConstants";

function FieldLabel({ children, tip }) {
  return (
    <span className="field-label">
      {children}
      {tip ? (
        <span className="info-tip" title={tip}>
          <Info size={13} />
        </span>
      ) : null}
    </span>
  );
}

function GroupedSelect({ config, value, onChange }) {
  if (config.groups) {
    // Grouped dropdown with optgroup (assignmentType, subject)
    return (
      <select value={value} onChange={onChange}>
        {config.groups.map((group) => (
          <optgroup key={group.group} label={group.group}>
            {group.options.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  } else {
    // Flat dropdown (academicLevel, deadline)
    return (
      <select value={value} onChange={onChange}>
        {config.options.map((option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
}

function NumberStepper({ value, onChange, min = 0 }) {
  return (
    <div className="number-stepper">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || min))}
      />
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export function OrderDetailsPanel() {
  const { user, logout, isAuthenticated, ready } = useAuth();
  const { updateDraft } = useOrder();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [order, setOrder] = useState(() => defaultOrder());
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [checkingExistingOrder, setCheckingExistingOrder] = useState(false);

  // Check for existing unpaid orders from DB when user is authenticated
  // BUT allow creating new orders with ?new=true query parameter
  // OR editing existing order with ?edit=orderId parameter
  useEffect(() => {
    // Allow bypassing the redirect with ?new=true
    const allowNewOrder = params.get("new") === "true";
    const editOrderId = params.get("edit");
    
    if (!ready || !isAuthenticated || allowNewOrder || editOrderId) {
      setCheckingExistingOrder(false);
      
      // If editing an existing order, load it from API
      if (editOrderId && isAuthenticated) {
        let isCurrent = true;
        setCheckingExistingOrder(true);
        
        async function loadOrderForEdit() {
          try {
            const orderToEdit = await orderService.getOrder(editOrderId);
            if (!isCurrent || !orderToEdit) return;

            // Populate form with order data from API
            setOrder(pendingFromBackendOrder(orderToEdit));
          } catch (err) {
            console.error("Failed to load order for edit:", err);
            setFormError("Failed to load order. Please try again.");
          } finally {
            if (isCurrent) setCheckingExistingOrder(false);
          }
        }
        
        loadOrderForEdit();
        
        return () => {
          isCurrent = false;
        };
      }
      
      return;
    }
    
    let isCurrent = true;
    let hasChecked = false; // Prevent duplicate checks
    
    setCheckingExistingOrder(true);
    
    async function checkExistingOrder() {
      if (hasChecked) return; // Prevent duplicate API calls
      hasChecked = true;
      
      try {
        // Fetch orders directly from API
        const orders = await orderService.getMyOrders();
        if (!isCurrent) return;
        
        // Find draft/awaiting-payment orders (status check centralized in orderMapper.isUnpaidOrder)
        const unpaidOrder = orders?.find(isUnpaidOrder);

        if (unpaidOrder) {
          // Redirect to confirm page with existing order
          writePending(pendingFromBackendOrder(unpaidOrder));
          navigate(ROUTES.ORDER_CONFIRM, { replace: true });
          return;
        }
        
      } catch (err) {
        console.error("Failed to check existing orders:", err);
      } finally {
        if (isCurrent) setCheckingExistingOrder(false);
      }
    }
    
    checkExistingOrder();
    
    return () => {
      isCurrent = false;
    };
  }, [ready, isAuthenticated, navigate, params]);

  useEffect(() => {
    const fromQuery = [
      params.get("type") || "",
      params.get("level") || "",
      params.get("subject") || "",
      params.get("deadline") || "",
    ];
    if (fromQuery.some(Boolean)) {
      setOrder(orderFromHero(fromQuery));
      return;
    }
    
    // Check for hero lead data from home page
    const heroData = readHeroLeadData();
    if (heroData && (heroData.typeOfWork || heroData.academicLevel || heroData.subject || heroData.deadline)) {
      setOrder((prev) => ({ ...prev, ...heroData }));
      // Clear the data after using it once
      clearHeroLeadData();
      return;
    }
    
    const pending = readPending();
    if (pending) {
      setOrder(pending);
    }
  }, [params]);

  function set(key, value) {
    setOrder((prev) => ({ ...prev, [key]: value }));
    if (formError) setFormError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      const invalid = form.querySelector(":invalid");
      invalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reportValidity();
      setFormError(
        "Please fill in Project Title and Project Guidelines before confirming.",
      );
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      if (isAuthenticated && order.backendOrderId) {
        // Update existing draft
        await updateDraft(order.backendOrderId, order);
        writePending(order);
        navigate(ROUTES.ORDER_CONFIRM);
      } else if (isAuthenticated) {
        // Create new order (this should happen in ORDER_CONFIRM page)
        writePending(order);
        navigate(ROUTES.ORDER_CONFIRM);
      } else {
        // Not authenticated - save to session and go to confirm
        writePending(order);
        navigate(ROUTES.ORDER_CONFIRM);
      }
    } catch (err) {
      // Show error to user
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to save order. Please try again.";
      setFormError(errorMessage);
      setSaving(false);
    }
  }

  if (checkingExistingOrder) {
    return <div className="account-loading">Checking for existing orders…</div>;
  }

  return (
    <div className="app-page order-flow-page">
      <SiteHeader
        user={user}
        onLogout={() => {
          logout();
          navigate(ROUTES.LOGIN);
        }}
      />
      <OrderStepper active={0} loggedIn={isAuthenticated} />
      <div className="order-layout">
        <main>
          <h1 className="order-title">
            Describe the requirements of your order
          </h1>
          {formError ? (
            <p className="order-form-error" role="alert">
              {formError}
            </p>
          ) : null}
          <form className="order-form" onSubmit={handleSubmit} noValidate>
            <section className="order-section-card">
              <h2>Order Details</h2>
              <div className="order-grid">
                <label>
                  <FieldLabel tip="Choose the assignment type">
                    Type of Work
                  </FieldLabel>
                  <GroupedSelect
                    config={assignmentType}
                    value={order.typeOfWork}
                    onChange={(e) => set("typeOfWork", e.target.value)}
                  />
                </label>
                <label>
                  <FieldLabel tip="Academic level of the paper">
                    Academic Level
                  </FieldLabel>
                  <GroupedSelect
                    config={academicLevel}
                    value={order.academicLevel}
                    onChange={(e) => set("academicLevel", e.target.value)}
                  />
                </label>
                <label>
                  <FieldLabel tip="Main subject area">Subject</FieldLabel>
                  <GroupedSelect
                    config={subject}
                    value={order.subject}
                    onChange={(e) => set("subject", e.target.value)}
                  />
                </label>
                <label>
                  <FieldLabel tip="Working title for your project">
                    Project Title
                  </FieldLabel>
                  <input
                    value={order.topic}
                    onChange={(e) => set("topic", e.target.value)}
                    placeholder="Enter your topic"
                    required
                    maxLength={160}
                  />
                </label>
                <label>
                  <FieldLabel tip="When you need the work">Deadline</FieldLabel>
                  <GroupedSelect
                    config={deadline}
                    value={order.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                  />
                </label>
                <label>
                  <FieldLabel tip="Approx. 275 words per double-spaced page">
                    Number of Pages
                  </FieldLabel>
                  <NumberStepper
                    value={order.pages}
                    min={1}
                    onChange={(n) => set("pages", n)}
                  />
                </label>
                <label>
                  <FieldLabel tip="Auto-calculated from pages and spacing">
                    Word Count
                  </FieldLabel>
                  <input
                    value={`${wordCount(order.pages, order.lineSpacing)} Words`}
                    readOnly
                  />
                </label>
                <label>
                  <FieldLabel tip="Single or double line spacing">
                    Line Spacing
                  </FieldLabel>
                  <select
                    value={order.lineSpacing}
                    onChange={(e) => set("lineSpacing", e.target.value)}
                  >
                    {SPACING_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="full-span">
                  <FieldLabel tip="Describe guidelines, sources, or notes">
                    Project Guidelines
                  </FieldLabel>
                  <textarea
                    rows={5}
                    required
                    value={order.details}
                    onChange={(e) => set("details", e.target.value)}
                    placeholder="Describe your requirements, sources, and any special instructions"
                  />
                </label>
                <p className="attach-note">
                  You can send attachments after processing the order.
                </p>
                <label>
                  <FieldLabel tip="Preferred citation format">
                    Citation Style
                  </FieldLabel>
                  <select
                    value={order.citation}
                    onChange={(e) => set("citation", e.target.value)}
                  >
                    {CITATION_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <FieldLabel tip="Number of sources to include">
                    References
                  </FieldLabel>
                  <NumberStepper
                    value={order.references}
                    min={0}
                    onChange={(n) => set("references", n)}
                  />
                </label>
                <label>
                  <FieldLabel tip="Document font">Font Style</FieldLabel>
                  <select
                    value={order.font}
                    onChange={(e) => set("font", e.target.value)}
                  >
                    {FONT_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <FieldLabel tip="Writing language variant">
                    Language
                  </FieldLabel>
                  <select
                    value={order.language}
                    onChange={(e) => set("language", e.target.value)}
                  >
                    {LANGUAGE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="order-section-card">
              <h2>Add-ons</h2>
              <div className="option-rows">
                {ADDON_OPTIONS.map((a) => (
                  <label
                    key={a.id}
                    className={order.addons.includes(a.id) ? "selected" : ""}
                  >
                    <input
                      type="checkbox"
                      checked={order.addons.includes(a.id)}
                      onChange={(e) =>
                        set(
                          "addons",
                          e.target.checked
                            ? [...order.addons, a.id]
                            : order.addons.filter((id) => id !== a.id),
                        )
                      }
                    />
                    <span className="option-label">
                      {a.label}{" "}
                      <span className="info-tip" title={`${a.label} add-on`}>
                        <Info size={13} />
                      </span>
                    </span>
                    <span className="option-price">${a.price.toFixed(2)}</span>
                  </label>
                ))}
              </div>
            </section>

            <button
              type="submit"
              className="btn-solid-brand btn-confirm"
              disabled={saving}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              {saving && (
                <svg
                  className="spinner"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <circle cx="12" cy="12" r="10" opacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
                </svg>
              )}
              {saving ? "Processing..." : "Confirm Order"}
            </button>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </form>
        </main>
        <OrderSidebar />
      </div>
      <SiteFooter />
    </div>
  );
}

export default OrderDetailsPanel;
