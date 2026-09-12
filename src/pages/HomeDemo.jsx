import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeSectionsDemo from "@/components/home-sections-demo";

/**
 * Home Page for Demo Site Variant
 * Uses separate demo sections that can be customized independently
 */
export default function HomeDemo() {
  const navigate = useNavigate();
  const root = useRef(null);

  function click(event) {
    const element = event.target.closest(
      "a,button,[data-bs-slide-to],#navbar_closer,[data-bs-toggle]",
    );
    if (!element) return;

    const target = element.dataset.bsTarget;
    if (element.dataset.bsToggle === "collapse" && target) {
      event.preventDefault();
      const panel = document.querySelector(target);
      const shown = panel?.classList.toggle("show");
      element.setAttribute("aria-expanded", String(!!shown));
      element.classList.toggle("collapsed", !shown);
      return;
    }

    if (element.id === "navbar_closer") {
      document.querySelector("#nav_responsive")?.classList.remove("show");
      document
        .querySelector(".navbar-toggler")
        ?.setAttribute("aria-expanded", "false");
      return;
    }

    if (element.dataset.bsSlideTo !== undefined && target) {
      event.preventDefault();
      const carousel = document.querySelector(target);
      const index = Number(element.dataset.bsSlideTo);
      carousel
        ?.querySelectorAll(".carousel-item")
        .forEach((slide, i) => slide.classList.toggle("active", i === index));
      carousel?.querySelectorAll("[data-bs-slide-to]").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-current", String(i === index));
      });
      return;
    }

    if (element.dataset.action !== "order") return;
    event.preventDefault();
    document.querySelector("#nav_responsive")?.classList.remove("show");
    document
      .querySelector(".navbar-toggler")
      ?.setAttribute("aria-expanded", "false");
    const values = Array.from(
      root.current?.querySelectorAll(".main_form select[data-order-field]") ??
        [],
    ).map((s) => s.selectedOptions[0]?.textContent?.trim() ?? "");
    const qs = new URLSearchParams({
      type: values[0] || "",
      level: values[1] || "",
      subject: values[2] || "",
      deadline: values[3] || "",
    });
    navigate(`/order?${qs.toString()}`);
  }

  return (
    <>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <div
        ref={root}
        onClick={click}
        onSubmit={(event) => event.preventDefault()}
      >
        <HomeSectionsDemo />
      </div>
      <Link
        className="support-fab"
        to="/contact"
        aria-label="Contact Tutorspie support"
      >
        💬 <span>Let's talk</span>
      </Link>
    </>
  );
}
