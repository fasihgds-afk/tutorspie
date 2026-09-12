import { Check, Award, GraduationCap, ShieldCheck, RefreshCw } from "lucide-react";
import { FREE_FEATURES } from "@/constants/orderConstants";

export function OrderSidebar() {
  return (
    <aside className="order-sidebar">
      <div className="discount-banner">
        <span>50% DISCOUNT</span>
      </div>
      <div className="feature-grid">
        {[
          { icon: Award, t: "Premium Quality Services" },
          { icon: GraduationCap, t: "Top Academic Experts" },
          { icon: ShieldCheck, t: "Full Confidentiality" },
          { icon: RefreshCw, t: "Unlimited Free Revisions" },
        ].map(({ icon: Icon, t }) => (
          <div key={t} className="feature-box">
            <Icon size={26} strokeWidth={1.6} />
            <strong>{t}</strong>
          </div>
        ))}
      </div>
      <div className="free-features">
        <h3>Absolutely Free Features</h3>
        <ul>
          {FREE_FEATURES.map((f) => (
            <li key={f.label}>
              <Check size={15} className="free-check" />
              <span>{f.label}</span>
              {f.was > 0 ? <s>${f.was}</s> : <span className="free-spacer" />}
              <span className="free-pill">FREE</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default OrderSidebar;
