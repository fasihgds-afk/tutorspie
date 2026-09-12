import { useEffect, useRef, useState } from "react";
import {
  UserRoundPlus,
  FileText,
  Wallet,
  PenLine,
  Download,
  BadgeCheck,
} from "lucide-react";
const steps = [
  {
    title: "Register",
    text: "Create your personal account.",
    icon: UserRoundPlus,
  },
  { title: "Share Details", text: "Tell us what you need.", icon: FileText },
  { title: "Deposit Funds", text: "Set your project in motion.", icon: Wallet },
  {
    title: "Work in Progress",
    text: "Your expert gets to work.",
    icon: PenLine,
  },
  {
    title: "Download File",
    text: "Review your completed work.",
    icon: Download,
  },
  {
    title: "Release Payment",
    text: "Approve when you are happy.",
    icon: BadgeCheck,
  },
];
export default function OrderProcess() {
  const section = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (section.current) observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={section}
      id="process"
      className={`modern-process ${visible ? "is-visible" : ""}`}
    >
      <div className="container">
        <div className="process-heading">
          <span className="section-eyebrow">FROM START TO SUCCESS</span>
          <h2>
            Simple &amp; Quick Order Process
            <br className="desktop-break" /> to Unlock Success
          </h2>
          <p>
            Share your requirements in just a few steps. Follow your project
            from the first conversation to the final review.
          </p>
        </div>
        <ol className="process-steps">
          {steps.map(({ title, text, icon: Icon }, i) => (
            <li key={title} style={{ "--step": i }}>
              <span className="step-number">0{i + 1}</span>
              <div className="step-icon">
                <Icon size={30} strokeWidth={1.6} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
