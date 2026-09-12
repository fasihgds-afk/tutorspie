import { Mail, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

/**
 * Footer Component for Demo Site Variant
 * Exact copy of FooterTutorspie - can be customized later
 */
export function FooterDemo() {
  const quick = siteConfig.navigation.footer.slice(0, 5);
  const more = siteConfig.navigation.footer.slice(5);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
            <a href="/">
              <img
                src="/images/logotutorspiewhite.png"
                alt={siteConfig.name}
                className="site-logo footer-logo"
              />
            </a>
            <h4 className="text-light footer-head">Why Choose Us</h4>
            <p className="mt-4 chose-para-adg">
              At {siteConfig.brandName}, we offer expert guidance in academic writing,
              ensuring your essays, papers, and reports are clear,
              well-structured, and impactful. Our focus is on delivering quality
              support that helps you excel with confidence.
            </p>
            <div className="footer_seats">
              <ul>
                <li>
                  <img
                    src="/reference/Content/t1/images/secure-g1.png"
                    alt="seals"
                  />
                </li>
                <li>
                  <img
                    src="/reference/Content/t1/images/secure-g2.png"
                    alt="seals"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h4 className="text-light footer-head">Quick Links</h4>
            <ul className="list-unstyled footer-list mt-4">
              {quick.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-foot">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h4 className="text-light footer-head d-none d-sm-block"></h4>
            <ul className="list-unstyled footer-list mt-4 indexmargintop">
              {more.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-foot">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <h4 className="text-light footer-head footer-head-last">
              Connect with Us
            </h4>
            <ul className="list-unstyled footer-list footer-connect mt-4">
              <li>
                <a className="footer-connect-link text-foot" href={siteConfig.contact.emailHref}>
                  <span className="footer-connect-icon" aria-hidden="true">
                    <Mail size={16} strokeWidth={2.1} />
                  </span>
                  <span>{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="footer-connect-link text-foot btn_call"
                >
                  <span className="footer-connect-icon" aria-hidden="true">
                    <Phone size={16} strokeWidth={2.1} />
                  </span>
                  <span>{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="footer-connect-link text-foot chaton"
                >
                  <span className="footer-connect-icon" aria-hidden="true">
                    <MessageCircle size={16} strokeWidth={2.1} />
                  </span>
                  <span>Contact Support</span>
                </a>
              </li>
            </ul>
            <ul className="list-unstyled payment-cards mb-0">
              <li>
                <h4 className="text-light footer-head mt-3">Payment Options</h4>
              </li>
              <li className="list-inline-item">
                <img
                  src="/reference/Content/t1/images/estrual.png"
                  alt="Payment methods"
                  className="payment-method"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterDemo;
