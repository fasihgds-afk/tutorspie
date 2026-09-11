import { useNavigate } from "react-router-dom";
import { SiteFooter, SiteHeader, useAccount } from "@/components/site-account";

export default function LegalPage({ title, children }) {
  const account = useAccount();
  const navigate = useNavigate();
  return (
    <div className="app-page">
      <SiteHeader
        user={account.user}
        onLogout={() => {
          account.logout();
          navigate("/login");
        }}
      />
      <div className="legal-page-wrap">
        <article className="legal-page">
          <h1>{title}</h1>
          {children}
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
