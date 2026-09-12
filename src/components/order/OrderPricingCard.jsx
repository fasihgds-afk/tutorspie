import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/priceFormatter";
import { StripePayment } from "@/components/payment/StripePayment";
import { ROUTES } from "@/constants/routeConstants";

export function OrderPricingCard({
  prices,
  loadingBackendOrder,
  onDeposit,
  busy,
  paymentIntentData,
  orderNumber,
  onPaymentSuccess,
  notice,
  isAuthenticated,
}) {
  return (
    <div className="cost-card" id="deposit">
      <h3>Order Cost</h3>
      <div className="cost-row">
        <span>Original Service Cost</span>
        <strong>{formatCurrency(prices.originalService, prices.currency)}</strong>
      </div>
      <div className="cost-row" style={{ color: "#16a34a" }}>
        <span>50% Limited Time Discount</span>
        <strong>-{formatCurrency(prices.discount, prices.currency)}</strong>
      </div>
      <div className="cost-row">
        <span>Add-ons Cost</span>
        <strong>{formatCurrency(prices.addons, prices.currency)}</strong>
      </div>
      <div className="final-amount">
        <span>Final Amount</span>
        <strong>
          {formatCurrency(prices.final, prices.currency)}{" "}
          <small style={{ fontSize: "0.8rem", color: "#64748b" }}>
            {(prices.currency || "USD").toUpperCase()}
          </small>
        </strong>
      </div>

      {loadingBackendOrder && (
        <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "4px 0" }}>
          Syncing authoritative pricing with server…
        </p>
      )}

      <p className="cost-legal">
        By clicking &quot;Deposit Funds&quot;, you agree to Tutorspie&apos;s{" "}
        <Link to={ROUTES.PRIVACY}>Privacy Policy</Link> and{" "}
        <Link to={ROUTES.TERMS}>Terms &amp; Conditions</Link>.
      </p>

      {/* If payment intent is ready, display Stripe payment component */}
      {paymentIntentData?.clientSecret ? (
        <StripePayment
          clientSecret={paymentIntentData.clientSecret}
          amount={paymentIntentData.amount}
          currency={paymentIntentData.currency}
          orderNumber={orderNumber}
          onSuccess={onPaymentSuccess}
        />
      ) : (
        <button
          type="button"
          className="btn-solid-brand btn-block btn-deposit"
          onClick={onDeposit}
          disabled={busy}
        >
          {busy ? "Processing Order..." : "Deposit Funds"}
        </button>
      )}

      {notice && (
        <p className="account-notice" role="status">
          {notice}
        </p>
      )}

      {!isAuthenticated && (
        <p className="field-hint">
          Log in is required before your order is saved. You will return here
          after signing in.
        </p>
      )}
    </div>
  );
}

export default OrderPricingCard;
