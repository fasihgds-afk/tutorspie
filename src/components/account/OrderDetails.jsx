import { ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/utils/priceFormatter";

export function OrderDetails({
  order,
  loadingDetails,
  onBack,
  onUpdateGuidelines,
  onCancelClick,
}) {
  if (!order) return null;

  function formatWhen(iso) {
    if (!iso) return "N/A";
    try {
      return new Date(iso).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return String(iso);
    }
  }

  const orderCode =
    order.orderCode ||
    order.orderNumber ||
    (order.id ? `TP-${String(order.id).slice(-8).toUpperCase()}` : "Order");

  const statusStr = String(order.status || "draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = String(new FormData(e.currentTarget).get("details") || "");
    if (onUpdateGuidelines) {
      onUpdateGuidelines(order.id, details);
    }
  };

  return (
    <section className="dash-panel">
      <button className="text-button" onClick={onBack}>
        <ArrowLeft size={16} /> Back to orders
      </button>

      <div className="draft-head">
        <h2>{orderCode}</h2>
        <span
          className={`draft-status status-${statusStr
            .toLowerCase()
            .replace(/_/g, "-")}`}
        >
          {statusStr.replace(/_/g, " ").toUpperCase()}
        </span>
      </div>

      {loadingDetails && (
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>
          Refreshing order details from server…
        </p>
      )}

      <div className="order-summary">
        {(
          order.selections || [
            order.assignmentType,
            order.academicLevel,
            order.subject,
            order.deadline,
          ]
        ).map((text, i) => (
          <div key={i}>
            <small>
              {["Assignment", "Academic level", "Subject", "Deadline"][i]}
            </small>
            <strong>{text || "Not set"}</strong>
          </div>
        ))}
      </div>

      {order.pricing && (
        <div className="order-summary" style={{ marginTop: "1rem" }}>
          <div>
            <small>Amount</small>
            <strong>
              {formatCurrency(
                order.pricing.finalAmount,
                order.pricing.currency || "USD",
              )}
            </strong>
          </div>
          <div>
            <small>Payment</small>
            <strong style={{ textTransform: "capitalize" }}>
              {order.paymentStatus || "pending"}
            </strong>
          </div>
          <div>
            <small>Pages</small>
            <strong>
              {order.numberOfPages || 1} pages ({order.lineSpacing || "double"})
            </strong>
          </div>
          <div>
            <small>Order Date</small>
            <strong>{formatWhen(order.createdAt || order.created)}</strong>
          </div>
        </div>
      )}

      <form className="app-form dash-form" onSubmit={handleSubmit}>
        <label>
          <span>Project Guidelines</span>
          <textarea
            name="details"
            rows={5}
            required
            defaultValue={order.details || order.guidelines || ""}
            key={order.id}
            readOnly={["cancelled", "completed"].includes(statusStr.toLowerCase())}
          />
        </label>
        {!["cancelled", "completed"].includes(statusStr.toLowerCase()) && (
          <div className="account-actions">
            <button className="btn-solid-brand">Save Changes</button>
            <button
              type="button"
              className="btn-outline-brand"
              onClick={onCancelClick}
            >
              Cancel Order
            </button>
          </div>
        )}
      </form>
    </section>
  );
}

export default OrderDetails;
