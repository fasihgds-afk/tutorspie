import { Link } from "react-router-dom";
import LegalPage from "@/components/legal-page";

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>
        By using Tutorspie, you agree to use our academic writing assistance for
        research, learning, and study support.
      </p>
      <h2>Academic integrity</h2>
      <p>
        Materials provided through Tutorspie are intended to help you understand
        your subject. You are responsible for following your institution’s
        academic integrity rules before submitting any work.
      </p>
      <h2>Orders and payments</h2>
      <p>
        When you place an order, you confirm that the requirements you share are
        accurate. Pricing, discounts, and delivery times shown on the site apply
        to the order details you select.
      </p>
      <h2>Questions</h2>
      <p>
        If you have questions about these terms, visit our{" "}
        <Link to="/contact">contact page</Link> or review the{" "}
        <Link to="/privacy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
