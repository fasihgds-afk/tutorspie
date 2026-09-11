import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Check,
  GraduationCap,
  Info,
  Megaphone,
  Minus,
  Pencil,
  Plus,
  ShieldCheck,
  RefreshCw,
  Award,
} from "lucide-react";
import { useAccount, SiteHeader, SiteFooter } from "@/components/site-account";
import {
  ADDON_OPTIONS,
  CITATION_OPTIONS,
  DEADLINE_OPTIONS,
  FONT_OPTIONS,
  FREE_FEATURES,
  LANGUAGE_OPTIONS,
  LEVEL_OPTIONS,
  SPACING_OPTIONS,
  SUBJECT_OPTIONS,
  TYPE_OPTIONS,
  clearPending,
  defaultOrder,
  matchOption,
  orderFromHero,
  priceBreakdown,
  readPending,
  selectionsFromOrder,
  wordCount,
  writePending,
} from "@/components/order-data";
const STEPS = [
  {
    label: "Share Order Details",
    href: "/order",
    hint: "Edit your order requirements",
  },
  {
    label: "Confirm Your Order",
    href: "/order/confirm",
    hint: "Review the summary before payment",
  },
  {
    label: "Deposit Funds",
    href: "/order/confirm#deposit",
    hint: "Jump to secure checkout",
  },
  {
    label: "Track Progress",
    href: "/account",
    hint: "Open your user area to track drafts",
  },
];
function OrderStepper({ active, loggedIn = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hasDraft, setHasDraft] = useState(false);
  useEffect(() => {
    setHasDraft(Boolean(readPending()));
  }, [pathname, active]);
  function canOpen(index) {
    if (index <= active) return true;
    if (index === 1 || index === 2) return hasDraft || active >= 1;
    if (index === 3) return true;
    return false;
  }
  function goToStep(index, event) {
    const step = STEPS[index];
    if (index === active) {
      event?.preventDefault();
      if (index === 2)
        document
          .getElementById("deposit")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (!canOpen(index)) {
      event?.preventDefault();
      const fallback =
        active === 0
          ? document.querySelector(".btn-confirm")
          : document.getElementById("deposit");
      fallback?.scrollIntoView({ behavior: "smooth", block: "center" });
      fallback?.classList.add("step-nudge");
      window.setTimeout(() => fallback?.classList.remove("step-nudge"), 1200);
      return;
    }
    if (
      step.href.includes("#deposit") &&
      pathname.startsWith("/order/confirm")
    ) {
      event?.preventDefault();
      const card = document.getElementById("deposit");
      card?.scrollIntoView({ behavior: "smooth", block: "start" });
      card?.classList.add("deposit-target");
      window.setTimeout(() => card?.classList.remove("deposit-target"), 1600);
      return;
    }
    if (index === 3 && !loggedIn) {
      event?.preventDefault();
      navigate("/login?next=/account");
    }
  }
  const progress = (active / Math.max(STEPS.length - 1, 1)) * 100;
  return (
    <div className="order-stepper-bar">
      <nav
        className="order-stepper"
        aria-label="Order progress"
        style={{ "--step-progress": `${progress}%` }}
      >
        <span className="order-stepper-track" aria-hidden="true">
          <span className="order-stepper-fill" />
        </span>
        {STEPS.map((step, i) => {
          const state =
            i === active
              ? "active"
              : i < active
                ? "done"
                : canOpen(i)
                  ? "ready"
                  : "upcoming";
          const clickable = state !== "upcoming";
          const className = `order-step ${state}${clickable ? " clickable" : " locked"}`;
          const content = (
            <>
              <span className="step-index" aria-hidden="true">
                {state === "done" ? <Check size={14} strokeWidth={3} /> : i + 1}
              </span>
              <span className="step-copy">
                <span className="step-kicker">
                  {state === "done"
                    ? "Completed"
                    : state === "active"
                      ? "Current step"
                      : state === "ready"
                        ? "Continue"
                        : "Up next"}
                </span>
                <span className="step-label">{step.label}</span>
              </span>
            </>
          );
          if (clickable) {
            return (
              <Link
                key={step.label}
                to={i === 3 && !loggedIn ? "/login?next=/account" : step.href}
                className={className}
                aria-current={state === "active" ? "step" : undefined}
                title={step.hint}
                onClick={(event) => goToStep(i, event)}
              >
                {content}
              </Link>
            );
          }
          return (
            <button
              type="button"
              key={step.label}
              className={className}
              title="Complete the previous step to continue"
              onClick={() => goToStep(i)}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
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
function OrderSidebar() {
  return (
    <aside className="order-sidebar">
      <div className="discount-banner">
        <span>50% DISCOUNT</span>
      </div>
      <div className="feature-grid">
        {[
          { icon: Award, t: "Premium Quality Services" },
          { icon: GraduationCap, t: "Top Academic Experts" },
          { icon: ShieldCheck, t: "Full Confidentiality" },
          { icon: RefreshCw, t: "Unlimited Free Revisions" },
        ].map(({ icon: Icon, t }) => (
          <div key={t} className="feature-box">
            <Icon size={26} strokeWidth={1.6} />
            <strong>{t}</strong>
          </div>
        ))}
      </div>
      <div className="free-features">
        <h3>Absolutely Free Features</h3>
        <ul>
          {FREE_FEATURES.map((f) => (
            <li key={f.label}>
              <Check size={15} className="free-check" />
              <span>{f.label}</span>
              {f.was > 0 ? <s>${f.was}</s> : <span className="free-spacer" />}
              <span className="free-pill">FREE</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
export function OrderDetailsPanel() {
  const account = useAccount();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [order, setOrder] = useState(() => defaultOrder());
  const [formError, setFormError] = useState("");
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
    const pending = readPending();
    if (pending) setOrder(pending);
  }, [params]);
  function set(key, value) {
    setOrder((prev) => ({ ...prev, [key]: value }));
    if (formError) setFormError("");
  }
  function submit(e) {
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
    writePending(order);
    navigate("/order/confirm");
  }
  return (
    <div className="app-page order-flow-page">
      <SiteHeader
        user={account.user}
        onLogout={() => {
          account.logout();
          navigate("/login");
        }}
      />
      <OrderStepper active={0} loggedIn={Boolean(account.user)} />
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
          <form className="order-form" onSubmit={submit} noValidate>
            <section className="order-section-card">
              <h2>Order Details</h2>
              <div className="order-grid">
                <label>
                  <FieldLabel tip="Choose the assignment type">
                    Type of Work
                  </FieldLabel>
                  <select
                    value={order.typeOfWork}
                    onChange={(e) => set("typeOfWork", e.target.value)}
                  >
                    {TYPE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <FieldLabel tip="Academic level of the paper">
                    Academic Level
                  </FieldLabel>
                  <select
                    value={order.academicLevel}
                    onChange={(e) => set("academicLevel", e.target.value)}
                  >
                    {LEVEL_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <FieldLabel tip="Main subject area">Subject</FieldLabel>
                  <select
                    value={order.subject}
                    onChange={(e) => set("subject", e.target.value)}
                  >
                    {SUBJECT_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
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
                  <select
                    value={order.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                  >
                    {DEADLINE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
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
              <h2>Expert Selection</h2>
              <div className="option-rows">
                {[
                  {
                    id: "system",
                    label: "Let The System Choose The Best Fit",
                    price: "",
                  },
                  {
                    id: "rehire",
                    label: "Rehire A Previous Expert",
                    price: "$5.00",
                  },
                  {
                    id: "choose",
                    label: "Choose Expert Of Your Choice",
                    price: "$10.00",
                  },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={order.expert === opt.id ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="expert"
                      checked={order.expert === opt.id}
                      onChange={() => set("expert", opt.id)}
                    />
                    <span className="option-label">{opt.label}</span>
                    {opt.price ? (
                      <span className="option-price">{opt.price}</span>
                    ) : (
                      <span className="option-price" />
                    )}
                  </label>
                ))}
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

            <button type="submit" className="btn-solid-brand btn-confirm">
              Confirm Order
            </button>
          </form>
        </main>
        <OrderSidebar />
      </div>
      <SiteFooter />
    </div>
  );
}
function SummaryTable({ title, rows, editHref }) {
  const pairs = [];
  for (let i = 0; i < rows.length;) {
    const row = rows[i];
    if (row.full) {
      pairs.push([row]);
      i += 1;
    } else if (i + 1 < rows.length && !rows[i + 1].full) {
      pairs.push([row, rows[i + 1]]);
      i += 2;
    } else {
      pairs.push([row]);
      i += 1;
    }
  }
  return (
    <section className="summary-table">
      <div className="summary-head">
        <h2>{title}</h2>
        {editHref ? (
          <Link to={editHref} className="edit-link">
            <Pencil size={14} /> Edit Order
          </Link>
        ) : null}
      </div>
      <table className="summary-data">
        <tbody>
          {pairs.map((pair, idx) => (
            <tr
              key={`${pair[0].label}-${idx}`}
              className={idx % 2 ? "alt" : ""}
            >
              {pair.map((cell) => (
                <td
                  key={cell.label}
                  colSpan={pair.length === 1 ? 2 : 1}
                  className={cell.full ? "full-cell" : ""}
                >
                  <b>{cell.label}</b>
                  {cell.full ? (
                    <div className="summary-scroll">{cell.value || "—"}</div>
                  ) : (
                    <span>{cell.value || "—"}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export function ConfirmOrderPanel() {
  const account = useAccount();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [promo, setPromo] = useState("");
  const [notice, setNotice] = useState("");
  const prices = useMemo(() => (order ? priceBreakdown(order) : null), [order]);
  useEffect(() => {
    const pending = readPending();
    if (!pending) navigate("/order", { replace: true });
    else {
      setOrder(pending);
      setOrderId((id) => id || `TP-${Date.now().toString().slice(-8)}`);
    }
  }, [navigate]);
  useEffect(() => {
    if (
      !order ||
      typeof window === "undefined" ||
      window.location.hash !== "#deposit"
    )
      return;
    const card = document.getElementById("deposit");
    card?.scrollIntoView({ behavior: "smooth", block: "start" });
    card?.classList.add("deposit-target");
    const timer = window.setTimeout(
      () => card?.classList.remove("deposit-target"),
      1600,
    );
    return () => window.clearTimeout(timer);
  }, [order]);
  function deposit() {
    if (!order) return;
    if (!account.user) {
      writePending(order);
      navigate("/login?next=/order/confirm");
      return;
    }
    try {
      const details = [order.topic && `Topic: ${order.topic}`, order.details]
        .filter(Boolean)
        .join("\n\n");
      account.saveOrder(selectionsFromOrder(order), details);
      setNotice("Order saved. You can track it in your user area.");
      clearPending();
      setTimeout(() => navigate("/account"), 900);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Unable to save order.");
    }
  }
  if (!order || !prices)
    return <div className="account-loading">Loading order summary…</div>;
  const expertLabel =
    order.expert === "system"
      ? "System Selected Expert"
      : order.expert === "rehire"
        ? "Previous Expert (+$5)"
        : "Chosen Expert (+$10)";
  return (
    <div className="app-page order-flow-page">
      <SiteHeader
        user={account.user}
        onLogout={() => {
          account.logout();
          navigate("/login");
        }}
      />
      <OrderStepper active={1} loggedIn={Boolean(account.user)} />
      <div className="order-layout confirm-layout">
        <main>
          <h1 className="order-title">
            Have a look at the summary of your order
          </h1>
          <SummaryTable
            title="Order Details"
            editHref="/order"
            rows={[
              { label: "Order ID", value: orderId },
              { label: "Deadline", value: order.deadline },
              { label: "Academic Level", value: order.academicLevel },
              { label: "Line Spacing", value: order.lineSpacing },
              { label: "Type of Work", value: order.typeOfWork },
              { label: "Subject", value: order.subject },
              { label: "No. of Pages", value: String(order.pages) },
              { label: "Expert", value: expertLabel },
              { label: "Topic", value: order.topic },
              { label: "Guidelines", value: order.details },
            ]}
          />
          <SummaryTable
            title="More Details"
            rows={[
              { label: "Citation Style", value: order.citation },
              { label: "Font Face", value: order.font },
              { label: "References", value: String(order.references) },
              { label: "Language", value: order.language },
            ]}
          />
          <div className="guarantee-row">
            {[
              {
                src: "/images/payments/seal-satisfaction.png",
                label: "100% Satisfaction Guarantee",
              },
              {
                src: "/images/payments/seal-lowest-price.png",
                label: "100% Lowest Price Guarantee",
              },
              {
                src: "/images/payments/seal-money-back.png",
                label: "100% Money Back Guarantee",
              },
            ].map((item) => (
              <div key={item.label} className="guarantee-seal">
                <img src={item.src} alt={item.label} width={128} height={128} />
              </div>
            ))}
          </div>
        </main>
        <aside className="confirm-sidebar">
          <div className="cost-card" id="deposit">
            <h3>Order Cost</h3>
            <div className="cost-row">
              <span>Service Cost</span>
              <strong>${prices.service.toFixed(2)}</strong>
            </div>
            <div className="cost-row">
              <span>Limited Time Discount 50%</span>
              <strong>${prices.discount.toFixed(2)}</strong>
            </div>
            <div className="cost-row">
              <span>Add-ons Cost</span>
              <strong>${prices.addons.toFixed(2)}</strong>
            </div>
            <div className="final-amount">
              <span>Final Amount</span>
              <strong>${prices.final.toFixed(2)}</strong>
            </div>
            <p className="cost-legal">
              By clicking &quot;Deposit Funds&quot;, you agree to
              Tutorspie&apos;s <Link to="/privacy">Privacy Policy</Link> and{" "}
              <Link to="/terms">Terms &amp; Conditions</Link>.
            </p>
            <button
              type="button"
              className="btn-solid-brand btn-block btn-deposit"
              onClick={deposit}
            >
              Deposit Funds
            </button>
            <div className="promo-row">
              <span className="promo-label">Enter Promo Code (Optional)</span>
              <div className="promo-field">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  aria-label="Promo code"
                />
                <button
                  type="button"
                  className="link-action"
                  onClick={() =>
                    setNotice(
                      promo.trim()
                        ? "Promo code applied to this order preview."
                        : "Enter a promo code first.",
                    )
                  }
                >
                  Use Code
                </button>
              </div>
            </div>
            {notice && (
              <p className="account-notice" role="status">
                {notice}
              </p>
            )}
            {!account.user && (
              <p className="field-hint">
                Log in is required before your order is saved. You will return
                here after signing in.
              </p>
            )}
          </div>
          <div className="trust-card">
            <h3>
              <Megaphone size={18} /> Your Satisfaction, Our Priority
            </h3>
            <div className="trust-copy">
              <p>
                Your payment details are processed securely. Place your order to
                save the requirements in your user area and enjoy unlimited
                revisions messaging.
              </p>
            </div>
            <div className="pay-icons">
              {[
                ["/images/payments/visa.png", "Visa"],
                ["/images/payments/mastercard.png", "Mastercard"],
                ["/images/payments/amex.png", "American Express"],
                ["/images/payments/jcb.png", "JCB"],
                ["/images/payments/discover.png", "Discover"],
              ].map(([src, alt]) => (
                <img key={alt} src={src} alt={alt} height={36} />
              ))}
            </div>
            <div className="sec-badges">
              <img
                src="/images/payments/norton.png"
                alt="Norton Secured"
                height={40}
              />
              <img
                src="/images/payments/mcafee.png"
                alt="McAfee SECURE"
                height={40}
              />
            </div>
          </div>
        </aside>
      </div>
      <SiteFooter />
    </div>
  );
}
export function hydrateOrderFromSearch(search) {
  return defaultOrder({
    typeOfWork: matchOption(search.get("type"), TYPE_OPTIONS, "Short Essay"),
    academicLevel: matchOption(
      search.get("level"),
      LEVEL_OPTIONS,
      "Undergraduate",
    ),
    subject: matchOption(search.get("subject"), SUBJECT_OPTIONS, "History"),
    deadline: matchOption(search.get("deadline"), DEADLINE_OPTIONS, "3 days"),
  });
}
