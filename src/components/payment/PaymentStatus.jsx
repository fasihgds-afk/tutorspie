export function PaymentStatus({ status }) {
  const normalized = String(status || "pending").toLowerCase();

  const statusConfig = {
    succeeded: { label: "PAID", className: "status-completed" },
    paid: { label: "PAID", className: "status-completed" },
    processing: { label: "PROCESSING", className: "status-in-progress" },
    pending: { label: "PENDING PAYMENT", className: "status-awaiting-payment" },
    failed: { label: "FAILED", className: "status-cancelled" },
  };

  const config = statusConfig[normalized] || {
    label: normalized.toUpperCase(),
    className: "status-draft",
  };

  return (
    <span className={`draft-status ${config.className}`}>
      {config.label}
    </span>
  );
}

export default PaymentStatus;
