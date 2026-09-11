import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  UserRound,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Zap,
  Headphones,
  Search,
  Mail,
  Phone,
  Star,
  BadgeCheck,
  Eye,
  EyeOff,
  ChevronDown,
  Ban,
  GraduationCap,
  Award,
} from "lucide-react";
const ACCOUNTS = "tutorspie-accounts-v1";
const ORDERS = "tutorspie-orders-v1";
const SESSION = "tutorspie-session-v1";
const LEGACY = {
  accounts: "tutorspie-demo-accounts-v1",
  orders: "tutorspie-demo-orders-v1",
  session: "tutorspie-demo-session-v1",
};
export const PHONE = "+1 (800) 555-0199";
export const PHONE_HREF = "tel:+18005550199";
export const EMAIL = "support@tutorspie.com";
export const EMAIL_HREF = "mailto:support@tutorspie.com";
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services_section", label: "Services" },
  { href: "/#faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];
export const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#benefits", label: "Benefits" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#comparison", label: "Comparison" },
  { href: "/#faq", label: "FAQs" },
  { href: "/#about", label: "About Us" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];
function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
function migrateStorage() {
  try {
    if (
      !localStorage.getItem(ACCOUNTS) &&
      localStorage.getItem(LEGACY.accounts)
    ) {
      localStorage.setItem(
        ACCOUNTS,
        localStorage.getItem(LEGACY.accounts) || "",
      );
    }
    if (!localStorage.getItem(ORDERS) && localStorage.getItem(LEGACY.orders)) {
      localStorage.setItem(ORDERS, localStorage.getItem(LEGACY.orders) || "");
    }
    if (
      !sessionStorage.getItem(SESSION) &&
      sessionStorage.getItem(LEGACY.session)
    ) {
      sessionStorage.setItem(
        SESSION,
        sessionStorage.getItem(LEGACY.session) || "",
      );
    }
  } catch {}
}
async function hash(password, salt) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bytes = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt),
      iterations: 100000,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return Array.from(new Uint8Array(bytes), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}
export function useAccount() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      migrateStorage();
      const id = sessionStorage.getItem(SESSION);
      setUser(read(ACCOUNTS, []).find((a) => a.id === id) ?? null);
      setOrders(read(ORDERS, []));
    } catch {}
    setReady(true);
  }, []);
  async function authenticate(signup, name, email, password, phone = "") {
    const accounts = read(ACCOUNTS, []);
    email = email.trim().toLowerCase();
    let account = accounts.find((a) => a.email === email);
    if (signup) {
      if (account)
        throw new Error(
          "An account with this email already exists. Please log in.",
        );
      const salt = crypto.randomUUID();
      account = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email,
        phone: phone.trim(),
        salt,
        passwordHash: await hash(password, salt),
      };
      localStorage.setItem(ACCOUNTS, JSON.stringify([...accounts, account]));
    } else if (
      !account ||
      (await hash(password, account.salt)) !== account.passwordHash
    ) {
      throw new Error("Email or password is incorrect. Please try again.");
    }
    sessionStorage.setItem(SESSION, account.id);
    setUser(account);
  }
  function logout() {
    sessionStorage.removeItem(SESSION);
    setUser(null);
  }
  function saveOrder(selections, details) {
    if (!user) throw new Error("Please log in to save your order.");
    const order = {
      id: crypto.randomUUID(),
      owner: user.id,
      selections,
      details,
      created: new Date().toISOString(),
      status: "Draft",
    };
    const next = [order, ...read(ORDERS, [])];
    localStorage.setItem(ORDERS, JSON.stringify(next));
    setOrders(next);
  }
  function updateOrder(id, changes) {
    const next = read(ORDERS, []).map((o) =>
      o.id === id && o.owner === user?.id ? { ...o, ...changes } : o,
    );
    localStorage.setItem(ORDERS, JSON.stringify(next));
    setOrders(next);
  }
  function updateProfile(name) {
    if (!user) return;
    const next = { ...user, name: name.trim() };
    localStorage.setItem(
      ACCOUNTS,
      JSON.stringify(
        read(ACCOUNTS, []).map((a) => (a.id === user.id ? next : a)),
      ),
    );
    setUser(next);
  }
  return {
    user,
    ready,
    orders: orders.filter((o) => o.owner === user?.id),
    authenticate,
    logout,
    saveOrder,
    updateOrder,
    updateProfile,
  };
}
function navActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
export function SiteHeader({ user, onLogout, compact = false }) {
  const { pathname } = useLocation();
  return (
    <header className="site-app-header">
      <Link to="/" className="app-logo">
        <img src="/images/logotutorspie.png" alt="TutorsPie" />
      </Link>
      {!compact && (
        <nav className="site-app-nav" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={navActive(pathname, link.href) ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
      <div className="site-app-header-actions">
        <a href={PHONE_HREF} className="header-phone">
          <Phone size={15} /> {PHONE}
        </a>
        {user ? (
          <>
            <button
              type="button"
              className="btn-outline-brand"
              onClick={onLogout}
            >
              <LogOut size={15} /> Log Out
            </button>
            <Link to="/account" className="btn-solid-brand">
              User Area
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline-brand">
              Log In
            </Link>
            <Link to="/order" className="btn-solid-brand">
              Order Now
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
export function SiteFooter({ compact = false }) {
  return (
    <footer
      className={`site-app-footer${compact ? " site-app-footer-auth" : ""}`}
    >
      {!compact && (
        <>
          <Link to="/">
            <img
              src="/images/logotutorspiewhite.png"
              alt="TutorsPie"
              className="footer-logo"
            />
          </Link>
          <nav className="site-app-footer-links" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p>
            <a href={EMAIL_HREF}>{EMAIL}</a> · <a href={PHONE_HREF}>{PHONE}</a>
          </p>
        </>
      )}
      <p>Copyright © 2026 Tutorspie. All Rights Reserved.</p>
    </footer>
  );
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
export function AuthPanel({ account, initialSignup = false }) {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(initialSignup);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (!account.ready || !account.user) return;
    const next = new URLSearchParams(window.location.search).get("next");
    navigate(next && next.startsWith("/") ? next : "/account", {
      replace: true,
    });
  }, [account.ready, account.user, navigate]);
  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(e.currentTarget);
    const country = String(data.get("countryCode") || "US:1");
    const phoneCode = country.includes(":") ? country.split(":")[1] : country;
    const phone = signup
      ? `+${phoneCode}${String(data.get("phone") || "").replace(/\D/g, "")}`
      : "";
    try {
      await account.authenticate(
        signup,
        String(data.get("name") || ""),
        String(data.get("email")),
        String(data.get("password")),
        phone,
      );
      const next = new URLSearchParams(window.location.search).get("next");
      navigate(next && next.startsWith("/") ? next : "/account");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to continue. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
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
                minLength={5}
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
                    navigate("/signup", { replace: true });
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
                  navigate("/login", { replace: true });
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
export function DashboardPanel({ account }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("orders");
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (account.ready && !account.user)
      navigate("/login?next=/account", { replace: true });
  }, [account.ready, account.user, navigate]);
  useEffect(() => {
    if (!menuOpen) return;
    function close() {
      setMenuOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("click", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);
  if (!account.ready)
    return <div className="account-loading">Loading your workspace…</div>;
  if (!account.user) return null;
  function orderCode(id) {
    return `TP-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
  }
  function formatWhen(iso) {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }
  const order = account.orders.find((o) => o.id === selected);
  const filtered = account.orders.filter((o) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      o.id.toLowerCase().includes(q) ||
      o.selections.join(" ").toLowerCase().includes(q) ||
      o.details.toLowerCase().includes(q) ||
      orderCode(o.id).toLowerCase().includes(q)
    );
  });
  return (
    <div className="app-page dashboard-page">
      <SiteHeader
        user={account.user}
        onLogout={() => {
          account.logout();
          navigate("/login");
        }}
      />
      <nav className="dash-nav" aria-label="Account">
        <div className="dash-nav-inner">
          <div className="dash-menu" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dash-menu-btn"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              Account Management <ChevronDown size={16} />
            </button>
            {menuOpen && (
              <div className="dash-menu-panel" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className={tab === "orders" ? "active" : ""}
                  onClick={() => {
                    setTab("orders");
                    setSelected(null);
                    setNotice("");
                    setMenuOpen(false);
                  }}
                >
                  My Orders
                </button>
                <button
                  type="button"
                  role="menuitem"
                  className={tab === "profile" ? "active" : ""}
                  onClick={() => {
                    setTab("profile");
                    setSelected(null);
                    setNotice("");
                    setMenuOpen(false);
                  }}
                >
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="dash-body">
        <main className="dash-main">
          <div className="dash-welcome">
            <h1>Welcome {account.user.name}</h1>
            <Link to="/order" className="btn-solid-brand dash-primary-cta">
              Place New Order
            </Link>
          </div>
          {notice && (
            <p role="status" className="account-notice">
              {notice}
            </p>
          )}

          {tab === "profile" ? (
            <section className="dash-panel">
              <div className="orders-toolbar">
                <h2 className="dash-section-title">Profile Settings</h2>
              </div>
              <form
                className="app-form dash-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  try {
                    account.updateProfile(
                      String(new FormData(e.currentTarget).get("name")),
                    );
                    setNotice("Profile saved.");
                  } catch {
                    setNotice("Unable to save. Browser storage may be full.");
                  }
                }}
              >
                <label>
                  <span>Full Name</span>
                  <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    defaultValue={account.user.name}
                  />
                </label>
                <label>
                  <span>Email Address</span>
                  <input value={account.user.email} readOnly />
                </label>
                <button className="btn-solid-brand">Save Profile</button>
              </form>
            </section>
          ) : order ? (
            <section className="dash-panel">
              <button
                className="text-button"
                onClick={() => {
                  setSelected(null);
                  setNotice("");
                }}
              >
                <ArrowLeft size={16} /> Back to orders
              </button>
              <div className="draft-head">
                <h2>{orderCode(order.id)}</h2>
                <span
                  className={`draft-status status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="order-summary">
                {order.selections.map((text, i) => (
                  <div key={i}>
                    <small>
                      {
                        ["Assignment", "Academic level", "Subject", "Deadline"][
                          i
                        ]
                      }
                    </small>
                    <strong>{text || "Not set"}</strong>
                  </div>
                ))}
              </div>
              <form
                className="app-form dash-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  try {
                    account.updateOrder(order.id, {
                      details: String(
                        new FormData(e.currentTarget).get("details"),
                      ),
                    });
                    setNotice("Order updated.");
                  } catch {
                    setNotice("Unable to save.");
                  }
                }}
              >
                <label>
                  <span>Project Guidelines</span>
                  <textarea
                    name="details"
                    rows={5}
                    required
                    defaultValue={order.details}
                    key={order.id}
                    readOnly={order.status === "Cancelled"}
                  />
                </label>
                {order.status === "Draft" && (
                  <div className="account-actions">
                    <button className="btn-solid-brand">Save Changes</button>
                    <button
                      type="button"
                      className="btn-outline-brand"
                      onClick={() => {
                        try {
                          account.updateOrder(order.id, {
                            status: "Cancelled",
                          });
                          setNotice("Order cancelled.");
                          setSelected(null);
                        } catch {
                          setNotice("Unable to save changes.");
                        }
                      }}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </form>
              {order.status === "Cancelled" && (
                <button
                  className="btn-solid-brand"
                  onClick={() => {
                    try {
                      account.updateOrder(order.id, { status: "Draft" });
                      setNotice("Order restored.");
                    } catch {
                      setNotice("Unable to save changes.");
                    }
                  }}
                >
                  Restore Order
                </button>
              )}
            </section>
          ) : (
            <section className="dash-panel">
              <div className="orders-toolbar">
                <h2 className="dash-section-title">All Orders</h2>
                <label className="search-wrap">
                  <Search size={15} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Order"
                    aria-label="Search Order"
                  />
                </label>
              </div>
              {filtered.length === 0 ? (
                <div className="account-empty">
                  <span className="empty-icon" aria-hidden="true">
                    <FileText size={28} />
                  </span>
                  <h3>{query ? "No matching orders" : "No orders yet"}</h3>
                  <p>
                    {query
                      ? "Try a different search term, or clear the search box."
                      : "Start your first order and it will appear in this list."}
                  </p>
                  {query ? (
                    <button
                      type="button"
                      className="btn-outline-brand"
                      onClick={() => setQuery("")}
                    >
                      Clear search
                    </button>
                  ) : (
                    <Link to="/order" className="btn-solid-brand">
                      Place New Order
                    </Link>
                  )}
                </div>
              ) : (
                <div className="orders-table-wrap">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Project</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Delivery Date</th>
                        <th scope="col">Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((o) => (
                        <tr key={o.id}>
                          <td className="order-id-cell">{orderCode(o.id)}</td>
                          <td>
                            {o.selections[0] ||
                              o.details.slice(0, 40) ||
                              "Writing project"}
                          </td>
                          <td>{formatWhen(o.created)}</td>
                          <td>{o.selections[3] || formatWhen(o.created)}</td>
                          <td className="status-cell">
                            {o.status === "Draft" ? (
                              <>
                                <button
                                  type="button"
                                  className="btn-solid-brand btn-table"
                                  onClick={() => setSelected(o.id)}
                                >
                                  View Order
                                </button>
                                <button
                                  type="button"
                                  className="link-action"
                                  onClick={() => {
                                    try {
                                      account.updateOrder(o.id, {
                                        status: "Cancelled",
                                      });
                                      setNotice("Order cancelled.");
                                    } catch {
                                      setNotice("Unable to save.");
                                    }
                                  }}
                                >
                                  Cancel Your Order
                                </button>
                              </>
                            ) : (
                              <>
                                <span className="draft-status status-cancelled">
                                  Cancelled
                                </span>
                                <button
                                  type="button"
                                  className="link-action"
                                  onClick={() => setSelected(o.id)}
                                >
                                  View Details
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </main>
        <div className="dash-support">
          <div className="support-card">
            <div className="support-card-title">Contact Customer Support</div>
            <div className="support-body">
              <div className="support-watermark" aria-hidden="true">
                <span>24</span>
              </div>
              <ul>
                <li>
                  <Headphones size={18} aria-hidden="true" />{" "}
                  <Link to="/contact">Chat with a Representative</Link>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />{" "}
                  <a href={PHONE_HREF}>Request Call Back</a>
                </li>
                <li>
                  <FileText size={18} aria-hidden="true" />{" "}
                  <Link to="/order">Free Inquiry</Link>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />{" "}
                  <a href={EMAIL_HREF}>{EMAIL}</a>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />{" "}
                  <a href={PHONE_HREF}>{PHONE}</a>
                </li>
              </ul>
              <Link
                to="/order"
                className="btn-solid-brand btn-block support-cta"
              >
                Place New Order
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
