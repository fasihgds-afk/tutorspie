import { Link } from "react-router-dom";
import LegalPage from "@/components/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        Tutorspie collects only the information needed to create your account,
        save order requirements, and provide academic writing support.
      </p>
      <h2>Information we store</h2>
      <p>
        Account details such as your name, email, and order requirements are
        saved so you can manage drafts and completed work in your user area.
      </p>
      <h2>How we use it</h2>
      <p>
        We use this information to process orders, communicate about your
        project, and improve the Tutorspie experience. We do not sell your
        personal information.
      </p>
      <h2>Your choices</h2>
      <p>
        You can update your profile in the <Link to="/account">user area</Link>.
        For any privacy request, contact us through the{" "}
        <Link to="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
