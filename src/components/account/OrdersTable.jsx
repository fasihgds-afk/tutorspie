import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, FileText } from "lucide-react";
import { ROUTES } from "@/constants/routeConstants";
import { writePending } from "@/components/order-data";
import { mapBackendAddOnsToIds } from "@/utils/orderMapper";

export function OrdersTable({ orders, loading, onSelectOrder }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  const filtered = orders.filter((o) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const code = (o.orderCode || o.orderNumber || o.id || "").toLowerCase();
    const title = (o.title || "").toLowerCase();
    const type = (o.assignmentType || "").toLowerCase();
    const details = (o.details || o.guidelines || "").toLowerCase();
    const selectionsStr = Array.isArray(o.selections)
      ? o.selections.join(" ").toLowerCase()
      : "";
    return (
      (o.id && o.id.toLowerCase().includes(q)) ||
      code.includes(q) ||
      title.includes(q) ||
      type.includes(q) ||
      details.includes(q) ||
      selectionsStr.includes(q)
    );
  });

  const handlePayNow = (order) => {
    // Store order info in session storage and redirect to confirm page
    writePending({
      backendOrderId: order.id || order._id,
      orderNumber: order.orderCode || order.orderNumber,
      typeOfWork: order.assignmentType,
      academicLevel: order.academicLevel,
      subject: order.subject,
      topic: order.title,
      deadline: order.deadline,
      pages: order.numberOfPages || 1,
      lineSpacing: order.lineSpacing === "single" ? "Single Spaced" : "Double Spaced",
      citation: order.citationStyle,
      references: order.references || 0,
      font: order.fontStyle,
      language: order.language,
      details: order.guidelines || order.details,
      expert: "system",
      addons: mapBackendAddOnsToIds(order.addOns),
    });
    navigate(ROUTES.ORDER_CONFIRM);
  };

  return (
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

      {loading ? (
        <div className="account-loading" style={{ padding: "2rem" }}>
          Loading your orders from server…
        </div>
      ) : filtered.length === 0 ? (
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
            <Link to={`${ROUTES.ORDER}?new=true`} className="btn-solid-brand">
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
              {filtered.map((o) => {
                const id = o.id || o._id;
                const statusStr = String(o.status || "draft").toLowerCase();
                const needsPayment = statusStr === "draft" || statusStr === "awaiting_payment";
                
                // Debug log
                console.log("Order status check:", {
                  orderId: id,
                  originalStatus: o.status,
                  statusStr,
                  needsPayment
                });
                
                return (
                  <tr key={id}>
                    <td className="order-id-cell">
                      {o.orderCode || o.orderNumber || (id ? `TP-${String(id).slice(-8).toUpperCase()}` : id)}
                    </td>
                    <td>
                      {o.title ||
                        o.assignmentType ||
                        (o.selections && o.selections[0]) ||
                        (o.details && o.details.slice(0, 40)) ||
                        "Writing project"}
                    </td>
                    <td>{formatWhen(o.createdAt || o.created)}</td>
                    <td>
                      {o.deadline ||
                        (o.selections && o.selections[3]) ||
                        formatWhen(o.createdAt || o.created)}
                    </td>
                    <td className="status-cell">
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}>
                        <span
                          className={`draft-status status-${statusStr
                            .toLowerCase()
                            .replace(/_/g, "-")}`}
                        >
                          {statusStr.replace(/_/g, " ").toUpperCase()}
                        </span>
                        {needsPayment ? (
                          <button
                            type="button"
                            className="btn-solid-brand btn-table"
                            onClick={() => handlePayNow(o)}
                            title="Go to order confirmation to deposit funds"
                          >
                            Deposit Funds
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn-solid-brand btn-table"
                            onClick={() => onSelectOrder(id)}
                          >
                            View Order
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default OrdersTable;
