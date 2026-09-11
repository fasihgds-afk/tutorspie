import { Link } from "react-router-dom";
import { Headphones, Mail, Phone } from "lucide-react";
import LegalPage from "@/components/legal-page";
import {
  EMAIL,
  EMAIL_HREF,
  PHONE,
  PHONE_HREF,
} from "@/components/site-account";

export default function ContactPage() {
  return (
    <LegalPage title="Contact Tutorspie">
      <p>
        Our support team is available 24/7 to help with orders, revisions, and
        academic writing questions.
      </p>
      <div className="contact-cards">
        <a className="contact-card" href={PHONE_HREF}>
          <Phone size={22} />
          <strong>Call us</strong>
          <span>{PHONE}</span>
        </a>
        <a className="contact-card" href={EMAIL_HREF}>
          <Mail size={22} />
          <strong>Email</strong>
          <span>{EMAIL}</span>
        </a>
        <Link className="contact-card" to="/#faq">
          <Headphones size={22} />
          <strong>FAQs</strong>
          <span>Find quick answers</span>
        </Link>
      </div>
      <p>
        Ready to start? <Link to="/order">Place an order</Link> or{" "}
        <Link to="/signup">create an account</Link>.
      </p>
    </LegalPage>
  );
}
