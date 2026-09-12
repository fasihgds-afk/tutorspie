import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Headphones, Phone, FileText, Mail } from "lucide-react";
import { useAuth } from "@/auth/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { SiteHeader, SiteFooter } from "./AccountHeader";
import { OrdersTable } from "./OrdersTable";
import { OrderDetails } from "./OrderDetails";
import { SITE_CONFIG } from "@/config/siteConfig";
import { ROUTES } from "@/constants/routeConstants";
import { parseApiError } from "@/utils/errorHandler";

export function DashboardPanel() {
  const { user, logout, ready } = useAuth();
  const { orders, loading, fetchOrders, updateDraft, getOrder } = useOrder(true);
  const navigate = useNavigate();

  const [tab, setTab] = useState("orders");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Fetch individual order details when selected
  useEffect(() => {
    if (!selectedId) {
      setSelectedOrderDetails(null);
      return;
    }
    let isCurrent = true;
    setLoadingDetails(true);
    getOrder(selectedId)
      .then((ord) => {
        if (isCurrent && ord) {
          setSelectedOrderDetails(ord);
        }
      })
      .catch((err) => {
        if (isCurrent) {
          setNotice(parseApiError(err, "Failed to load order details."));
        }
      })
      .finally(() => {
        if (isCurrent) setLoadingDetails(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [selectedId, getOrder]);

  if (!ready) {
    return <div className="account-loading">Loading your workspace…</div>;
  }

  if (!user) return null;

  const currentOrder =
    selectedOrderDetails ||
    orders.find((o) => o.id === selectedId || o._id === selectedId);

  const handleUpdateGuidelines = async (orderId, guidelines) => {
    try {
      await updateDraft(orderId, { guidelines });
      setNotice("Order updated successfully.");
      if (selectedOrderDetails) {
        setSelectedOrderDetails((prev) => ({
          ...prev,
          details: guidelines,
          guidelines,
        }));
      }
      fetchOrders();
    } catch (err) {
      setNotice(parseApiError(err, "Unable to save order changes."));
    }
  };

  const handleCancelClick = () => {
    setNotice(
      "Order cancellation is managed by our 24/7 customer support team. Please contact support below.",
    );
  };

  return (
    <div className="app-page dashboard-page">
      <SiteHeader
        user={user}
        onLogout={() => {
          logout();
          navigate(ROUTES.LOGIN);
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
                    setSelectedId(null);
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
                    setSelectedId(null);
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
            <h1>Welcome {user.name || user.fullName}</h1>
            <Link to={`${ROUTES.ORDER}?new=true`} className="btn-solid-brand dash-primary-cta">
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
                  setNotice(
                    "Profile settings are currently read-only. Contact support to request changes.",
                  );
                }}
              >
                <label>
                  <span>Full Name</span>
                  <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    defaultValue={user.fullName || user.name}
                    readOnly
                  />
                </label>
                <label>
                  <span>Email Address</span>
                  <input value={user.email} readOnly />
                </label>
                {user.phoneNumber && (
                  <label>
                    <span>Phone Number</span>
                    <input
                      value={`${user.countryCode || ""} ${user.phoneNumber}`.trim()}
                      readOnly
                    />
                  </label>
                )}
                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  To update your name, email, or phone number, please reach out to customer support.
                </p>
              </form>
            </section>
          ) : currentOrder ? (
            <OrderDetails
              order={currentOrder}
              loadingDetails={loadingDetails}
              onBack={() => {
                setSelectedId(null);
                setSelectedOrderDetails(null);
                setNotice("");
              }}
              onUpdateGuidelines={handleUpdateGuidelines}
              onCancelClick={handleCancelClick}
            />
          ) : (
            <OrdersTable
              orders={orders}
              loading={loading}
              onSelectOrder={(id) => setSelectedId(id)}
            />
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
                  <Link to={ROUTES.CONTACT}>Chat with a Representative</Link>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />{" "}
                  <a href={SITE_CONFIG.PHONE_HREF}>Request Call Back</a>
                </li>
                <li>
                  <FileText size={18} aria-hidden="true" />{" "}
                  <Link to={ROUTES.ORDER}>Free Inquiry</Link>
                </li>
                <li>
                  <Mail size={18} aria-hidden="true" />{" "}
                  <a href={SITE_CONFIG.EMAIL_HREF}>{SITE_CONFIG.EMAIL}</a>
                </li>
                <li>
                  <Phone size={18} aria-hidden="true" />{" "}
                  <a href={SITE_CONFIG.PHONE_HREF}>{SITE_CONFIG.PHONE}</a>
                </li>
              </ul>
              <Link
                to={`${ROUTES.ORDER}?new=true`}
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

export default DashboardPanel;
