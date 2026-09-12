import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, LogOut, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { ROUTES } from "@/constants/routeConstants";
import "./HeaderTutorspie.css";

function navActive(pathname, href) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderTutorspie({ user, onLogout, compact = false }) {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Inline styles for immediate effect
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: window.innerWidth <= 767 ? '12px 16px' : '12px 40px',
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    zIndex: 30,
    minHeight: '66px',
    flexWrap: 'nowrap'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: '16px'
  };

  const logoStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    lineHeight: 0,
    flexShrink: 0
  };

  const mobileButtonStyle = {
    display: window.innerWidth <= 767 ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    color: 'var(--tp-purple)',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    flexShrink: 0
  };

  const desktopNavStyle = {
    display: window.innerWidth > 767 ? 'flex' : 'none',
    gap: '4px 16px',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const desktopActionsStyle = {
    display: window.innerWidth > 767 ? 'flex' : 'none',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  };

  return (
    <header className="site-app-header" style={headerStyle}>
      <div className="header-container" style={containerStyle}>
        {/* Logo */}
        <Link to={ROUTES.HOME} className="app-logo" style={logoStyle} onClick={closeMobileMenu}>
          <img src={siteConfig.branding.logo} alt={siteConfig.name} />
        </Link>

        {/* Desktop Navigation */}
        {!compact && (
          <nav className="site-app-nav desktop-nav" style={desktopNavStyle} aria-label="Main">
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

        {/* Desktop Actions */}
        <div className="site-app-header-actions desktop-actions" style={desktopActionsStyle}>
          {siteConfig.header.showPhone && (
            <a href={siteConfig.contact.phoneHref} className="header-phone">
              <Phone size={15} /> 
              <span className="phone-text">{siteConfig.contact.phone}</span>
            </a>
          )}
          {user ? (
            <>
              <button
                type="button"
                className="btn-outline-brand"
                onClick={onLogout}
              >
                <LogOut size={15} /> <span className="btn-text">Log Out</span>
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="mobile-menu-button"
          style={mobileButtonStyle}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        style={{
          position: 'fixed',
          top: '66px',
          left: 0,
          right: 0,
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 50,
          maxHeight: 'calc(100vh - 66px)',
          overflowY: 'auto'
        }}
      >
        {!compact && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {siteConfig.navigation.main.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`mobile-nav-link ${navActive(pathname, link.href) ? "active" : ""}`}
                onClick={closeMobileMenu}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: '#3a3148',
                  fontWeight: 800,
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease, color 0.2s ease'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile Actions */}
        <div className="mobile-actions" style={{ padding: '20px' }}>
          {siteConfig.header.showPhone && (
            <a 
              href={siteConfig.contact.phoneHref} 
              className="mobile-phone"
              onClick={closeMobileMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
                border: '1px solid #c5b6e0',
                borderRadius: '8px',
                color: 'var(--tp-purple)',
                fontWeight: 700,
                textDecoration: 'none',
                background: '#fff',
                fontSize: '14px',
                justifyContent: 'center'
              }}
            >
              <Phone size={18} /> {siteConfig.contact.phone}
            </a>
          )}
          
          <div className="mobile-auth-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {user ? (
              <>
                <Link 
                  to={ROUTES.ACCOUNT} 
                  className="btn-solid-brand mobile-btn"
                  onClick={closeMobileMenu}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '8px'
                  }}
                >
                  User Area
                </Link>
                <button
                  type="button"
                  className="btn-outline-brand mobile-btn"
                  onClick={() => {
                    onLogout();
                    closeMobileMenu();
                  }}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '8px'
                  }}
                >
                  <LogOut size={15} /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to={ROUTES.LOGIN} 
                  className="btn-outline-brand mobile-btn"
                  onClick={closeMobileMenu}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '8px'
                  }}
                >
                  Log In
                </Link>
                <Link 
                  to={ROUTES.ORDER} 
                  className="btn-solid-brand mobile-btn"
                  onClick={closeMobileMenu}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '8px'
                  }}
                >
                  {siteConfig.header.ctaText}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTutorspie;
