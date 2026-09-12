import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ENV } from "@/config/env";
import { parseApiError } from "@/utils/errorHandler";
import { formatCurrency } from "@/utils/priceFormatter";

// Initialize Stripe instance only once if key is present
const stripePromise = ENV.STRIPE_PUBLISHABLE_KEY
  ? loadStripe(ENV.STRIPE_PUBLISHABLE_KEY)
  : null;

function CheckoutForm({ clientSecret, amount, currency, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setErrorMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/account`,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message || "Payment confirmation failed.");
        if (onError) onError(error);
      } else if (paymentIntent && ["succeeded", "processing"].includes(paymentIntent.status)) {
        if (onSuccess) onSuccess(paymentIntent);
      }
    } catch (err) {
      const parsed = parseApiError(err, "Payment processing failed.");
      setErrorMessage(parsed);
      if (onError) onError(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-checkout-form" style={{ marginTop: "16px" }}>
      <PaymentElement />
      {errorMessage && (
        <p className="account-notice" role="alert" style={{ color: "#dc2626", marginTop: "12px" }}>
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        className="btn-solid-brand btn-block"
        disabled={!stripe || processing}
        style={{ marginTop: "16px" }}
      >
        {processing ? "Processing Payment…" : `Pay ${formatCurrency(amount, currency)}`}
      </button>
    </form>
  );
}

export function StripePayment({
  clientSecret,
  amount,
  currency = "USD",
  orderNumber,
  onSuccess,
  onError,
}) {
  const hasStripeKey = Boolean(ENV.STRIPE_PUBLISHABLE_KEY && !ENV.STRIPE_PUBLISHABLE_KEY.includes("placeholder"));

  // If publishable key is not configured in client environment, display backend intent info
  if (!hasStripeKey || !stripePromise) {
    return (
      <div className="stripe-fallback-card" style={{ marginTop: "16px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <strong>Payment Intent Ready</strong>
          <span className="draft-status status-awaiting-payment">READY</span>
        </div>
        <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "12px" }}>
          Stripe PaymentIntent generated on server for order <b>{orderNumber}</b>.
        </p>
        <div style={{ fontSize: "0.8rem", color: "#64748b", wordBreak: "break-all", marginBottom: "16px" }}>
          Intent Secret: <code>{clientSecret ? clientSecret.slice(0, 24) + "..." : "Active"}</code>
        </div>
        <button
          type="button"
          className="btn-solid-brand btn-block"
          onClick={() => onSuccess && onSuccess({ id: clientSecret, status: "succeeded" })}
        >
          Complete Order &amp; View in Dashboard
        </button>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        clientSecret={clientSecret}
        amount={amount}
        currency={currency}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}

export default StripePayment;
