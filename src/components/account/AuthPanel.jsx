import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  BadgeCheck,
  ShieldCheck,
  Zap,
  Headphones,
  Ban,
  GraduationCap,
  Award,
  Star,
  CheckCircle,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/auth/useAuth";
import { SiteHeader, SiteFooter } from "./AccountHeader";
import { getSafeInternalRedirect } from "@/utils/redirect";
import { ROUTES } from "@/constants/routeConstants";
import { parseApiError } from "@/utils/errorHandler";
import { orderService } from "@/services/orderService";
import { writePending } from "@/components/order-data";
import { mapBackendAddOnsToIds } from "@/utils/orderMapper";

/**
 * Smart Continue routing — 3 conditions:
 *  1. No orders ever              → /order          (create new order)
 *  2. Has draft/awaiting_payment  → /order/confirm   (complete payment)
 *  3. Has paid/completed orders   → /account         (view dashboard)
 */
let isResolvingRoute = false; // Prevent duplicate calls

async function resolveSmartRoute(navigate, setRouting) {
  if (isResolvingRoute) {
    console.log("Already resolving route, skipping...");
    return;
  }
  
  isResolvingRoute = true;
  setRouting(true);
  
  try {
    const orders = await orderService.getMyOrders();
    if (!orders || orders.length === 0) {
      navigate(ROUTES.ORDER);
      return;
    }
    const unpaid = orders.find(
      (o) => o.status === "draft" || o.status === "awaiting_payment",
    );
    if (unpaid) {
      writePending({
        backendOrderId: unpaid.id,
        orderNumber: unpaid.orderCode || unpaid.orderNumber,
        typeOfWork: unpaid.assignmentType || "Short Essay",
        academicLevel: unpaid.academicLevel || "Undergraduate",
        subject: unpaid.subject || "History",
        deadline: unpaid.deadline || "3 days",
        pages: unpaid.numberOfPages || 1,
        lineSpacing:
          unpaid.lineSpacing === "single" ? "Single Spaced" : "Double Spaced",
        topic: unpaid.title || "",
        details: unpaid.guidelines || "",
        citation: unpaid.citationStyle || "Non Specific",
        references: unpaid.references || 0,
        font: unpaid.fontStyle || "Calibri (Standard)",
        language: unpaid.language || "US English",
        addons: mapBackendAddOnsToIds(unpaid.addOns),
        expert: "system",
      });
      navigate(ROUTES.ORDER_CONFIRM);
      return;
    }
    navigate(ROUTES.ACCOUNT);
  } catch {
    navigate(ROUTES.ACCOUNT);
  } finally {
    setRouting(false);
    isResolvingRoute = false;
  }
}

const COUNTRIES = [
  ["US", "1"],
  ["GB", "44"],
  ["CA", "1"],
  ["AU", "61"],
  ["NZ", "64"],
  ["IE", "353"],
  ["AE", "971"],
  ["SA", "966"],
  ["QA", "974"],
  ["KW", "965"],
  ["BH", "973"],
  ["OM", "968"],
  ["PK", "92"],
  ["IN", "91"],
  ["BD", "880"],
  ["NG", "234"],
  ["KE", "254"],
  ["ZA", "27"],
  ["PH", "63"],
  ["MY", "60"],
  ["SG", "65"],
  ["DE", "49"],
  ["FR", "33"],
  ["IT", "39"],
  ["ES", "34"],
  ["NL", "31"],
  ["SE", "46"],
  ["NO", "47"],
  ["DK", "45"],
  ["FI", "358"],
  ["TR", "90"],
  ["EG", "20"],
  ["JO", "962"],
  ["CN", "86"],
  ["JP", "81"],
  ["KR", "82"],
  ["BR", "55"],
  ["MX", "52"],
  ["HK", "852"],
];

const signupBenefits = [
  {
    icon: ShieldCheck,
    title: "Verified Academic Experts",
    text: "Work with qualified professionals with advanced degrees.",
  },
  {
    icon: Lock,
    title: "100% Confidential & Secure",
    text: "Your information and projects are always protected.",
  },
  {
    icon: Zap,
    title: "Fast & Easy Process",
    text: "Get matched with the right expert in just a few minutes.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Our support team is always here to help you.",
  },
];

const signupTrust = [
  { icon: ShieldCheck, t: "Secure & Encrypted", s: "Your data is protected" },
  { icon: Ban, t: "No Spam, Ever", s: "We respect your privacy" },
  {
    icon: GraduationCap,
    t: "Trusted by Students",
    s: "10,000+ happy students",
  },
  { icon: Award, t: "Satisfaction Guaranteed", s: "Results you can rely on" },
];

export function AuthPanel({ initialSignup = false, account }) {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [signup, setSignup] = useState(initialSignup);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [routing, setRouting] = useState(false);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // If user is already authenticated — show session-active screen (handled below),
  // no auto-redirect so they can choose Continue or Logout.
  // (PublicOnlyRoute in App.js already handles redirect on next param)
  // Only show session active if ready AND has user AND not in the middle of logging in
  const isLoggedIn = auth.ready && Boolean(auth.user) && !justLoggedIn;

  function handleContinue() {
    if (routing) return;
    resolveSmartRoute(navigate, setRouting);
  }

  function handleLogout() {
    auth.logout();
    // Stay on same page — auth state clears and form re-appears
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    setJustLoggedIn(true);

    const data = new FormData(e.currentTarget);
    const country = String(data.get("countryCode") || "US:1");
    const phoneCode = country.includes(":") ? country.split(":")[1] : country;
    const countryCode = `+${phoneCode.replace(/\D/g, "")}`;
    const rawPhone = String(data.get("phone") || "").replace(/\D/g, "");
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const name = String(data.get("name") || "");

    try {
      if (signup) {
        await auth.signup({
          fullName: name,
          email,
          countryCode,
          phoneNumber: rawPhone,
          password,
        });
      } else {
        await auth.login({
          email,
          password,
        });
      }

      const nextParam = new URLSearchParams(location.search).get("next");
      
      // If there's a specific next parameter, go there
      if (nextParam) {
        const destination = getSafeInternalRedirect(nextParam, ROUTES.ACCOUNT);
        navigate(destination);
        return;
      }
      
      // Check if user came from hero form (has heroLeadData in localStorage)
      const hasHeroData = localStorage.getItem("heroLeadData");
      if (hasHeroData) {
        // User came from home page hero form, send them to order page
        navigate(ROUTES.ORDER);
        return;
      }
      
      // Smart routing: check for existing orders (only once)
      console.log("Login successful, checking for existing orders...");
      try {
        const orders = await orderService.getMyOrders();
        console.log("Found orders:", orders?.length || 0);
        
        if (!orders || orders.length === 0) {
          // No orders - go to order page to create one
          console.log("No orders found, redirecting to /order");
          navigate(ROUTES.ORDER);
          return;
        }
        
        // Check for unpaid orders
        const unpaid = orders.find(
          (o) => o.status === "draft" || o.status === "awaiting_payment"
        );
        
        if (unpaid) {
          // Has unpaid order - redirect to confirm page
          console.log("Found unpaid order, redirecting to /order/confirm");
          writePending({
            backendOrderId: unpaid.id,
            orderNumber: unpaid.orderCode || unpaid.orderNumber,
            typeOfWork: unpaid.assignmentType || "Short Essay",
            academicLevel: unpaid.academicLevel || "Undergraduate",
            subject: unpaid.subject || "History",
            deadline: unpaid.deadline || "3 days",
            pages: unpaid.numberOfPages || 1,
            lineSpacing:
              unpaid.lineSpacing === "single" ? "Single Spaced" : "Double Spaced",
            topic: unpaid.title || "",
            details: unpaid.guidelines || "",
            citation: unpaid.citationStyle || "Non Specific",
            references: unpaid.references || 0,
            font: unpaid.fontStyle || "Calibri (Standard)",
            language: unpaid.language || "US English",
            addons: mapBackendAddOnsToIds(unpaid.addOns),
            expert: "system",
          });
          navigate(ROUTES.ORDER_CONFIRM);
          return;
        }
        
        // Has paid/completed orders - go to dashboard
        console.log("Has paid orders, redirecting to /account");
        navigate(ROUTES.ACCOUNT);
      } catch (routingErr) {
        // If routing logic fails, default to account page
        console.error("Smart routing failed:", routingErr);
        navigate(ROUTES.ACCOUNT);
      }
    } catch (err) {
      setError(parseApiError(err, "Unable to authenticate. Please check your details."));
      setJustLoggedIn(false);
    } finally {
      setBusy(false);
    }
  }

  // ── SESSION ALREADY ACTIVE ─────────────────────────────────────────────────
  // Show loading while auth is initializing
  if (!auth.ready) {
    return (
      <div className="app-page signup-page">
        <SiteHeader compact />
        <section className="signup-hero">
          <div className="signup-shell login-shell">
            <aside className="signup-copy">
              <span className="signup-badge">
                <BadgeCheck size={14} /> WELCOME
              </span>
              <h1>
                <span>Loading your session...</span>
              </h1>
            </aside>
            <section className="signup-card" style={{ padding: "40px", textAlign: "center" }}>
              <p style={{ margin: 0, color: "#64748b" }}>Please wait...</p>
            </section>
          </div>
        </section>
        <SiteFooter compact />
      </div>
    );
  }

  if (isLoggedIn) {
    const fullName  = auth.user.fullName || auth.user.name || "Student";
    const firstName = fullName.split(" ")[0];
    const initials  = fullName
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
    const email = auth.user.email || "";

    return (
      <div className="app-page signup-page">
        <SiteHeader compact />
        <section className="signup-hero">
          <div className="signup-shell login-shell">

            {/* ── LEFT SIDE — same as normal login page ── */}
            <aside className="signup-copy">
              <span className="signup-badge">
                <BadgeCheck size={14} /> YOU ARE ALREADY SIGNED IN
              </span>
              <h1>
                Welcome Back, <span>{firstName}!</span>
              </h1>
              <p>
                Your session is active. Choose what you'd like to do next —
                continue where you left off or start fresh by logging out.
              </p>
              <div className="signup-benefits">
                {signupBenefits.slice(1).map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <span>
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </aside>

            {/* ── RIGHT SIDE — session-active card ── */}
            <section className="signup-card" style={{ padding: 0, overflow: "hidden" }}>

              {/* Green header */}
              <div style={{
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                padding: "28px 32px 22px",
                textAlign: "center",
              }}>
                {/* Avatar initials circle */}
                <div style={{
                  width: "68px",
                  height: "68px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.22)",
                  border: "3px solid rgba(255,255,255,0.55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "1px",
                }}>
                  {initials || <CheckCircle size={30} />}
                </div>
                <p style={{ margin: 0, fontSize: "0.78rem", opacity: 0.85, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff" }}>
                  Session Active
                </p>
                <h2 style={{ margin: "6px 0 4px", fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>
                  Welcome back, {firstName}!
                </h2>
                <p style={{ margin: 0, fontSize: "0.83rem", opacity: 0.78, color: "#fff", wordBreak: "break-all" }}>
                  {email}
                </p>
              </div>

              {/* Card body */}
              <div style={{ padding: "24px 28px 28px" }}>

                {/* Info notice */}
                <div style={{
                  background: "#f0fdf4",
                  border: "1px solid #bbf7d0",
                  borderRadius: "10px",
                  padding: "12px 14px",
                  marginBottom: "20px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}>
                  <CheckCircle size={17} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <p style={{ margin: 0, fontSize: "0.84rem", color: "#166534", lineHeight: 1.55 }}>
                    <strong>You are already logged in.</strong> Click <em>Continue</em> to go
                    where you left off, or log out to switch accounts.
                  </p>
                </div>

                {/* Continue button */}
                <button
                  type="button"
                  className="signup-submit"
                  onClick={handleContinue}
                  disabled={routing}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px" }}
                >
                  <ArrowRight size={17} />
                  {routing ? "Checking your orders…" : "Continue"}
                </button>

                {/* Logout button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1.5px solid #e2e8f0",
                    background: "transparent",
                    color: "#64748b",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginBottom: "20px",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <LogOut size={15} />
                  Log Out &amp; Switch Account
                </button>

                {/* Routing hint */}
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: "0.8rem", fontWeight: 600, color: "#64748b" }}>
                    Continue will take you to:
                  </p>
                  {[
                    ["📝", "Order form", "if you haven't placed an order yet"],
                    ["💳", "Payment page", "if you have an unpaid order"],
                    ["📊", "Dashboard", "if your order is complete"],
                  ].map(([icon, label, desc]) => (
                    <div key={label} style={{ display: "flex", gap: "8px", alignItems: "baseline", marginBottom: "5px", fontSize: "0.82rem", color: "#94a3b8" }}>
                      <span>{icon}</span>
                      <span>
                        <strong style={{ color: "#475569" }}>{label}</strong> {desc}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </section>

          </div>
        </section>
        <SiteFooter compact />
      </div>
    );
  }
  // ──────────────────────────────────────────────────────────────────────────

  const formFields = (
    <form className="signup-form" onSubmit={submit} key={String(signup)}>
      {signup && (
        <label>
          <span>Full Name</span>
          <span className="input-wrap">
            <UserRound size={16} />
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only letters, numbers, and spaces are allowed."
              placeholder="Enter your full name"
            />
          </span>
        </label>
      )}
      <label>
        <span>{signup ? "Email Address" : "Email"}</span>
        <span className="input-wrap">
          <Mail size={16} />
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={
              signup ? "Enter your email address" : "you@example.com"
            }
          />
        </span>
      </label>
      {signup && (
        <label className="signup-phone">
          <span>Phone Number</span>
          <div className="signup-phone-fields">
            <select
              name="countryCode"
              defaultValue="US:1"
              aria-label="Country code"
            >
              {COUNTRIES.map(([iso, code]) => (
                <option key={`${iso}-${code}`} value={`${iso}:${code}`}>
                  {iso} (+{code})
                </option>
              ))}
            </select>
            <span className="input-wrap">
              <Phone size={16} />
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                minLength={6}
                maxLength={17}
                placeholder="Enter your phone number"
              />
            </span>
          </div>
        </label>
      )}
      <label>
        <span>Password</span>
        <span className="input-wrap">
          <Lock size={16} />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={signup ? "new-password" : "current-password"}
            required
            minLength={8}
            pattern={signup ? "(?=.*[a-z])(?=.*\\d).{8,}" : undefined}
            title={
              signup
                ? "Use 8+ characters with at least one lowercase letter and one number"
                : undefined
            }
            placeholder={
              signup ? "Create a strong password" : "At least 8 characters"
            }
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </span>
      </label>
      {signup && (
        <small className="signup-password-hint">
          Use 8+ characters with at least one lowercase letter and one number
        </small>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="signup-submit" disabled={busy}>
        {busy ? "Please wait…" : signup ? "Create My Account" : "Login"}
      </button>
    </form>
  );

  if (!signup) {
    return (
      <div className="app-page signup-page">
        <SiteHeader compact />
        <section className="signup-hero">
          <div className="signup-shell login-shell">
            <aside className="signup-copy">
              <span className="signup-badge">
                <BadgeCheck size={14} /> WELCOME BACK
              </span>
              <h1>
                Log In To Your Account &amp;{" "}
                <span>Continue With Expert Support</span>
              </h1>
              <p>
                Sign in to manage your orders, reopen saved drafts, and pick up
                your academic writing request in minutes.
              </p>
              <div className="signup-benefits">
                {signupBenefits.slice(1).map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <span>
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
            <section className="signup-card">
              <div className="signup-card-head">
                <span className="signup-card-icon">
                  <UserRound size={28} />
                </span>
                <div>
                  <h2>Login</h2>
                  <p>Enter your details to continue</p>
                </div>
              </div>
              {formFields}
              <div className="signup-card-foot">
                Need an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setSignup(true);
                    setError("");
                    navigate(ROUTES.SIGNUP, { replace: true });
                  }}
                >
                  Sign Up
                </button>
              </div>
            </section>
          </div>
          <div className="signup-trust">
            <div className="signup-trust-row">
              {signupTrust.map(({ icon: Icon, t, s }) => (
                <div key={t}>
                  <span>
                    <Icon size={20} />
                  </span>
                  <div>
                    <strong>{t}</strong>
                    <small>{s}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <SiteFooter compact />
      </div>
    );
  }

  return (
    <div className="app-page signup-page">
      <SiteHeader compact />
      <section className="signup-hero">
        <div className="signup-shell">
          <aside className="signup-copy">
            <span className="signup-badge">
              <BadgeCheck size={14} /> TRUSTED BY 10,000+ STUDENTS
            </span>
            <h1>
              Create Your Account &amp;{" "}
              <span>Connect With Top Academic Experts</span>
            </h1>
            <p>
              Join thousands of students who trust Tutorspie for high-quality
              academic support and excellent results.
            </p>
            <div className="signup-benefits">
              {signupBenefits.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <span>
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="signup-reviews">
              <img
                src="/images/signup/students.png"
                alt="Students who rated Tutorspie"
              />
              <div>
                <div className="signup-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <h5>
                  4.9/5 <span>(2,340+ Reviews)</span>
                </h5>
                <p>Students love our expert help!</p>
              </div>
            </div>
          </aside>
          <section className="signup-card">
            <div className="signup-card-head">
              <span className="signup-card-icon">
                <UserRound size={28} />
              </span>
              <div>
                <h2>Register Your Account</h2>
                <p>Fill in your details to get started</p>
              </div>
            </div>
            {formFields}
            <div className="signup-card-foot">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setSignup(false);
                  setError("");
                  navigate(ROUTES.LOGIN, { replace: true });
                }}
              >
                Log In
              </button>
            </div>
          </section>
        </div>
        <div className="signup-trust">
          <div className="signup-trust-row">
            {signupTrust.map(({ icon: Icon, t, s }) => (
              <div key={t}>
                <span>
                  <Icon size={20} />
                </span>
                <div>
                  <strong>{t}</strong>
                  <small>{s}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter compact />
    </div>
  );
}

export default AuthPanel;
