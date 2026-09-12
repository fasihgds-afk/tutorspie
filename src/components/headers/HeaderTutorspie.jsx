import { Link, useLocation } from "react-router-dom";
import { Phone, LogOut } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { ROUTES } from "@/constants/routeConstants";

function navActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderTutorspie({ user, onLogout, compact = false }) {
  const { pathname } = useLocation();

  return (
    <header className="site-app-header">
      <Link to={ROUTES.HOME} className="app-logo">
        <img src="/images/logotutorspie.png" alt={siteConfig.name} />
      </Link>
      {!compact && (
        <nav className="site-app-nav" aria-label="Main">
          {siteConfig.navigation.main.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={navActive(pathname, link.href) ? "active" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
      <div className="site-app-header-actions">
        {siteConfig.header.showPhone && (
          <a href={siteConfig.contact.phoneHref} className="header-phone">
            <Phone size={15} /> {siteConfig.contact.phone}
          </a>
        )}
        {user ? (
          <>
            <button
              type="button"
              className="btn-outline-brand"
              onClick={onLogout}
            >
              <LogOut size={15} /> Log Out
            </button>
            <Link to={ROUTES.ACCOUNT} className="btn-solid-brand">
              User Area
            </Link>
          </>
        ) : (
          <>
            <Link to={ROUTES.LOGIN} className="btn-outline-brand">
              Log In
            </Link>
            <Link to={ROUTES.ORDER} className="btn-solid-brand">
              {siteConfig.header.ctaText}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderTutorspie;
