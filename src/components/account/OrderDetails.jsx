import { ArrowLeft, FileText, Calendar, CreditCard, User, BookOpen, Settings, Plus } from "lucide-react";
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

  // Check if order is in a read-only state (paid, cancelled, completed)
  const isReadOnly = ["paid", "cancelled", "completed"].includes(statusStr.toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = String(new FormData(e.currentTarget).get("details") || "");
    if (onUpdateGuidelines) {
      onUpdateGuidelines(order.id, details);
    }
  };

  return (
    <section className="dash-panel">
      {/* Header */}
      <button className="text-button" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to orders
      </button>

      <div className="draft-head">
        <h2>{orderCode}</h2>
        <span className={`draft-status status-${statusStr.toLowerCase().replace(/_/g, "-")}`}>
          {statusStr.replace(/_/g, " ").toUpperCase()}
        </span>
      </div>

      {loadingDetails && (
        <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "1rem" }}>
          Refreshing order details from server…
        </p>
      )}

      {/* Assignment Details */}
      <div className="order-summary-section">
        <h3 className="section-title">
          <FileText size={18} />
          Assignment Details
        </h3>
        <div className="order-summary">
          <div>
            <small>Assignment Type</small>
            <strong>{order.assignmentType || "Not specified"}</strong>
          </div>
          <div>
            <small>Academic Level</small>
            <strong>{order.academicLevel || "Not specified"}</strong>
          </div>
          <div>
            <small>Subject</small>
            <strong>{order.subject || "Not specified"}</strong>
          </div>
          <div>
            <small>Deadline</small>
            <strong>{order.deadline || "Not specified"}</strong>
          </div>
          <div>
            <small>Title</small>
            <strong>{order.title || "Not provided"}</strong>
          </div>
          <div>
            <small>Pages & Spacing</small>
            <strong>{order.numberOfPages || 1} pages ({order.lineSpacing || "double"})</strong>
          </div>
        </div>
      </div>

      {/* Payment & Pricing */}
      <div className="order-summary-section">
        <h3 className="section-title">
          <CreditCard size={18} />
          Payment & Pricing
        </h3>
        
        {/* Main pricing display */}
        <div className="pricing-highlight">
          <div className="pricing-main">
            <span className="pricing-label">Total Amount</span>
            <span className="pricing-amount">
              {order.pricing ? formatCurrency(order.pricing.finalAmount, order.pricing.currency || "USD") : "N/A"}
            </span>
          </div>
          <div className="pricing-status">
            <span className={`draft-status status-${order.paymentStatus?.toLowerCase() || "pending"}`}>
              {(order.paymentStatus || "pending").toUpperCase()}
            </span>
          </div>
        </div>

        {/* Pricing breakdown */}
        {order.pricing && (
          <div className="pricing-breakdown">
            <div className="breakdown-row">
              <span>Assignment ({order.numberOfPages || 1} pages)</span>
              <span>{formatCurrency(order.pricing.assignmentAmount || 0, order.pricing.currency || "USD")}</span>
            </div>
            {order.pricing.addOnsAmount > 0 && (
              <div className="breakdown-row">
                <span>Add-ons</span>
                <span>{formatCurrency(order.pricing.addOnsAmount, order.pricing.currency || "USD")}</span>
              </div>
            )}
            {order.pricing.discountAmount > 0 && (
              <div className="breakdown-row discount-row">
                <span>Discount ({order.pricing.discountPercentage}%)</span>
                <span>-{formatCurrency(order.pricing.discountAmount, order.pricing.currency || "USD")}</span>
              </div>
            )}
          </div>
        )}

        <div className="order-summary">
          <div>
            <small>Order Date</small>
            <strong>{formatWhen(order.createdAt || order.created)}</strong>
          </div>
          <div>
            <small>Payment Method</small>
            <strong>{order.paymentMethod || "Not specified"}</strong>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="order-summary-section">
        <h3 className="section-title">
          <Settings size={18} />
          Specifications
        </h3>
        <div className="order-summary">
          <div>
            <small>Word Count</small>
            <strong>{order.wordCount || 0} words</strong>
          </div>
          <div>
            <small>Citation Style</small>
            <strong>{order.citationStyle || "Not specified"}</strong>
          </div>
          <div>
            <small>References</small>
            <strong>{order.references || 0} references</strong>
          </div>
          <div>
            <small>Font Style</small>
            <strong>{order.fontStyle || "Not specified"}</strong>
          </div>
          <div>
            <small>Language</small>
            <strong>{order.language || "Not specified"}</strong>
          </div>
        </div>
      </div>

      {/* Add-ons */}
      {order.addOns && order.addOns.length > 0 && (
        <div className="order-summary-section">
          <h3 className="section-title">
            <Plus size={18} />
            Add-ons
          </h3>
          <div className="addons-list">
            {order.addOns.map((addon, index) => (
              <div key={addon._id || index} className="addon-item">
                <span className="addon-name">{addon.name}</span>
                <span className="addon-price">
                  {formatCurrency(addon.price, order.pricing?.currency || "USD")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project Guidelines */}
      <div className="order-summary-section">
        <h3 className="section-title">
          <BookOpen size={18} />
          Project Guidelines
        </h3>
        <form className="app-form dash-form" onSubmit={handleSubmit}>
          <label>
            <span>Guidelines and Requirements</span>
            <textarea
              name="details"
              rows={6}
              defaultValue={order.details || order.guidelines || ""}
              key={order.id}
              readOnly={isReadOnly}
              style={isReadOnly ? { background: '#f8fafc', cursor: 'not-allowed' } : {}}
            />
          </label>
          {!isReadOnly && (
            <div className="account-actions">
              <button type="submit" className="btn-solid-brand">Save Changes</button>
              <button type="button" className="btn-outline-brand" onClick={onCancelClick}>
                Cancel Order
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default OrderDetails;
