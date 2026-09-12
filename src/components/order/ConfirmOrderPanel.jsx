import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Megaphone } from "lucide-react";
import { useAuth } from "@/auth/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { usePayment } from "@/hooks/usePayment";
import { SiteHeader, SiteFooter } from "@/components/site-account";
import { OrderStepper } from "./OrderStepper";
import { SummaryTable } from "./SummaryTable";
import { OrderPricingCard } from "./OrderPricingCard";
import {
  readPending,
  writePending,
  clearPending,
  priceBreakdown,
} from "@/components/order-data";
import { extractOrderPricing } from "@/utils/priceFormatter";
import { ROUTES } from "@/constants/routeConstants";
import { parseApiError } from "@/utils/errorHandler";

export function ConfirmOrderPanel() {
  const { user, logout, isAuthenticated, ready } = useAuth();
  const { createOrder, confirmOrder, getOrder } = useOrder();
  const { createPaymentIntent, paymentData, resetPayment } = usePayment();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [backendOrder, setBackendOrder] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingBackendOrder, setLoadingBackendOrder] = useState(false);
  // Track which backendOrderId we've already synced to avoid re-fetching on every render
  const syncedOrderIdRef = useRef(null);

  const prices = useMemo(() => {
    if (!order) return null;
    if (backendOrder?.pricing) {
      return extractOrderPricing(backendOrder.pricing);
    }
    return priceBreakdown(order);
  }, [order, backendOrder]);

  useEffect(() => {
    const pending = readPending();
    if (!pending) {
      navigate(ROUTES.ORDER, { replace: true });
    } else {
      setOrder(pending);
      if (pending.orderNumber || pending.backendOrderId) {
        setOrderId(pending.orderNumber || pending.backendOrderId);
      }
    }
  }, [navigate]);

  // Synchronize with backend when authenticated — runs only once per unique order id
  useEffect(() => {
    if (!ready || !isAuthenticated || !order) return;

    const backendId = order.backendOrderId;
    // Skip if we already loaded this order
    if (syncedOrderIdRef.current === (backendId || "__new__")) return;
    syncedOrderIdRef.current = backendId || "__new__";

    let isCurrent = true;
    async function syncBackendOrder() {
      setLoadingBackendOrder(true);
      try {
        if (backendId) {
          const fresh = await getOrder(backendId);
          if (isCurrent && fresh) {
            setBackendOrder(fresh);
            setOrderId(fresh.orderCode || fresh.orderNumber || fresh.id);
          }
        } else {
          const created = await createOrder(order);
          if (isCurrent && created) {
            setBackendOrder(created);
            setOrderId(created.orderCode || created.orderNumber || created.id);
            writePending({
              ...order,
              backendOrderId: created.id,
              orderNumber: created.orderCode || created.orderNumber,
            });
            // Update the ref so we don't re-create on next render
            syncedOrderIdRef.current = created.id;
          }
        }
      } catch (err) {
        if (isCurrent) {
          // Reset ref so a retry is possible
          syncedOrderIdRef.current = null;
          setNotice(parseApiError(err, "Failed to initialize backend order pricing."));
        }
      } finally {
        if (isCurrent) setLoadingBackendOrder(false);
      }
    }

    syncBackendOrder();

    return () => {
      isCurrent = false;
    };
  }, [ready, isAuthenticated, order, getOrder, createOrder]);

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

  const handleDeposit = async () => {
    if (!order) return;

    if (!isAuthenticated) {
      writePending(order);
      navigate(`${ROUTES.LOGIN}?next=${encodeURIComponent(ROUTES.ORDER_CONFIRM)}`);
      return;
    }

    if (busy) return;
    setBusy(true);
    setNotice("");

    try {
      let targetOrder = backendOrder;

      // 1. Ensure backend order exists (will be auto-confirmed during creation)
      if (!targetOrder?.id) {
        targetOrder = await createOrder(order);
        setBackendOrder(targetOrder);
        setOrderId(targetOrder.orderCode || targetOrder.orderNumber || targetOrder.id);
      }

      // Note: Order is now auto-confirmed during creation, so it should already be "awaiting_payment"

      // 2. Create Stripe PaymentIntent
      let intent = null;
      try {
        intent = await createPaymentIntent(targetOrder.id, "stripe");
      } catch (payErr) {
        console.warn("Payment intent initialization:", payErr.message);
      }

      const displayNum = targetOrder.orderCode || targetOrder.orderNumber || targetOrder.id;

      if (intent?.clientSecret) {
        setNotice(`Order ${displayNum} confirmed! Please enter your payment details below to complete deposit.`);
      } else {
        setNotice(`Order ${displayNum} confirmed successfully! Redirecting to your account dashboard...`);
        clearPending();
        setTimeout(() => {
          navigate(ROUTES.ACCOUNT);
        }, 1800);
      }
    } catch (err) {
      setNotice(parseApiError(err, "Unable to deposit funds. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const handlePaymentSuccess = () => {
    clearPending();
    resetPayment();
    setNotice("Payment completed successfully! Redirecting to your dashboard...");
    setTimeout(() => {
      navigate(ROUTES.ACCOUNT);
    }, 1200);
  };

  if (!order || !prices) {
    return <div className="account-loading">Loading order summary…</div>;
  }

  const expertLabel =
    order.expert === "system"
      ? "System Selected Expert"
      : order.expert === "rehire"
        ? "Previous Expert (+$5)"
        : "Chosen Expert (+$10)";

  return (
    <div className="app-page order-flow-page">
      <SiteHeader
        user={user}
        onLogout={() => {
          logout();
          navigate(ROUTES.LOGIN);
        }}
      />
      <OrderStepper active={1} loggedIn={isAuthenticated} />
      <div className="order-layout confirm-layout">
        <main>
          <h1 className="order-title">
            Have a look at the summary of your order
          </h1>
          <SummaryTable
            title="Order Details"
            editHref={backendOrder?.id ? `${ROUTES.ORDER}?edit=${backendOrder.id}` : ROUTES.ORDER}
            rows={[
              {
                label: "Order ID",
                value: orderId || "Draft (Pending Confirmation)",
              },
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
          <OrderPricingCard
            prices={prices}
            loadingBackendOrder={loadingBackendOrder}
            onDeposit={handleDeposit}
            busy={busy}
            paymentIntentData={paymentData}
            orderNumber={orderId}
            onPaymentSuccess={handlePaymentSuccess}
            notice={notice}
            isAuthenticated={isAuthenticated}
          />
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

export default ConfirmOrderPanel;
