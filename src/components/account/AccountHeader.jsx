import { Link, useLocation } from "react-router-dom";
import { Phone, LogOut } from "lucide-react";
import { SITE_CONFIG, siteConfig } from "@/config/siteConfig";
import { ROUTES } from "@/constants/routeConstants";

function navActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ user, onLogout, compact = false }) {
  const { pathname } = useLocation();

  return (
    <header className="site-app-header">
      <Link to={ROUTES.HOME} className="app-logo">
        <img src={siteConfig.branding.logo} alt={SITE_CONFIG.NAME} />
      </Link>
      {!compact && (
        <nav className="site-app-nav" aria-label="Main">
          {SITE_CONFIG.NAV_LINKS.map((link) => (
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
        <a href={SITE_CONFIG.PHONE_HREF} className="header-phone">
          <Phone size={15} /> {SITE_CONFIG.PHONE}
        </a>
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
              Order Now
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export function SiteFooter({ compact = false }) {
  return (
    <footer
      className={`site-app-footer${compact ? " site-app-footer-auth" : ""}`}
    >
      {!compact && (
        <>
          <Link to={ROUTES.HOME}>
            <img
              src={siteConfig.branding.logoWhite}
              alt={SITE_CONFIG.NAME}
              className="footer-logo"
            />
          </Link>
          <nav className="site-app-footer-links" aria-label="Footer">
            {SITE_CONFIG.FOOTER_LINKS.map((link) => (
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p>
            <a href={SITE_CONFIG.EMAIL_HREF}>{SITE_CONFIG.EMAIL}</a> ·{" "}
            <a href={SITE_CONFIG.PHONE_HREF}>{SITE_CONFIG.PHONE}</a>
          </p>
        </>
      )}
      <p>{SITE_CONFIG.COPYRIGHT}</p>
    </footer>
  );
}

export default {
  SiteHeader,
  SiteFooter,
};
