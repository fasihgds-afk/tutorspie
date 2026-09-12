import { Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

function navActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header Component for Demo Site Variant
 * Simple header with only navigation and "Hire Now" button
 */
export function HeaderDemo() {
  return (
    <header className="site-app-header">
      <a href="/" className="app-logo">
        <img src={siteConfig.branding.logo} alt={siteConfig.name} />
      </a>
      <nav className="site-app-nav" aria-label="Main">
        {siteConfig.navigation.main.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="site-app-header-actions">
        {siteConfig.header.showPhone && (
          <a href={siteConfig.contact.phoneHref} className="header-phone">
            <Phone size={15} /> {siteConfig.contact.phone}
          </a>
        )}
        {/* Demo: Only Hire Now button that scrolls to hero form */}
        <a href="#home" className="btn-solid-brand">
          Hire Now
        </a>
      </div>
    </header>
  );
}

export default HeaderDemo;
