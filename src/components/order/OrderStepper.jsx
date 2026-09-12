import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { readPending } from "@/components/order-data";
import { ROUTES } from "@/constants/routeConstants";

const STEPS = [
  {
    label: "Share Order Details",
    href: ROUTES.ORDER,
    hint: "Edit your order requirements",
  },
  {
    label: "Confirm Your Order",
    href: ROUTES.ORDER_CONFIRM,
    hint: "Review the summary before payment",
  },
  {
    label: "Deposit Funds",
    href: `${ROUTES.ORDER_CONFIRM}#deposit`,
    hint: "Jump to secure checkout",
  },
  {
    label: "Track Progress",
    href: ROUTES.ACCOUNT,
    hint: "Open your user area to track drafts",
  },
];

export function OrderStepper({ active, loggedIn = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    setHasDraft(Boolean(readPending()));
  }, [pathname, active]);

  function canOpen(index) {
    if (index <= active) return true;
    if (index === 1 || index === 2) return hasDraft || active >= 1;
    if (index === 3) return true;
    return false;
  }

  function goToStep(index, event) {
    const step = STEPS[index];
    if (index === active) {
      event?.preventDefault();
      if (index === 2) {
        document
          .getElementById("deposit")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    if (!canOpen(index)) {
      event?.preventDefault();
      const fallback =
        active === 0
          ? document.querySelector(".btn-confirm")
          : document.getElementById("deposit");
      fallback?.scrollIntoView({ behavior: "smooth", block: "center" });
      fallback?.classList.add("step-nudge");
      window.setTimeout(() => fallback?.classList.remove("step-nudge"), 1200);
      return;
    }
    if (step.href.includes("#deposit") && pathname.startsWith(ROUTES.ORDER_CONFIRM)) {
      event?.preventDefault();
      const card = document.getElementById("deposit");
      card?.scrollIntoView({ behavior: "smooth", block: "start" });
      card?.classList.add("deposit-target");
      window.setTimeout(() => card?.classList.remove("deposit-target"), 1600);
      return;
    }
    if (index === 3 && !loggedIn) {
      event?.preventDefault();
      navigate(`${ROUTES.LOGIN}?next=${encodeURIComponent(ROUTES.ACCOUNT)}`);
    }
  }

  const progress = (active / Math.max(STEPS.length - 1, 1)) * 100;

  return (
    <div className="order-stepper-bar">
      <nav
        className="order-stepper"
        aria-label="Order progress"
        style={{ "--step-progress": `${progress}%` }}
      >
        <span className="order-stepper-track" aria-hidden="true">
          <span className="order-stepper-fill" />
        </span>
        {STEPS.map((step, i) => {
          const state =
            i === active
              ? "active"
              : i < active
                ? "done"
                : canOpen(i)
                  ? "ready"
                  : "upcoming";
          const clickable = state !== "upcoming";
          const className = `order-step ${state}${clickable ? " clickable" : " locked"}`;
          const content = (
            <>
              <span className="step-index" aria-hidden="true">
                {state === "done" ? <Check size={14} strokeWidth={3} /> : i + 1}
              </span>
              <span className="step-copy">
                <span className="step-kicker">
                  {state === "done"
                    ? "Completed"
                    : state === "active"
                      ? "Current step"
                      : state === "ready"
                        ? "Continue"
                        : "Up next"}
                </span>
                <span className="step-label">{step.label}</span>
              </span>
            </>
          );
          if (clickable) {
            return (
              <Link
                key={step.label}
                to={i === 3 && !loggedIn ? `${ROUTES.LOGIN}?next=${encodeURIComponent(ROUTES.ACCOUNT)}` : step.href}
                className={className}
                aria-current={state === "active" ? "step" : undefined}
                title={step.hint}
                onClick={(event) => goToStep(i, event)}
              >
                {content}
              </Link>
            );
          }
          return (
            <button
              type="button"
              key={step.label}
              className={className}
              title="Complete the previous step to continue"
              onClick={() => goToStep(i)}
            >
              {content}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default OrderStepper;
