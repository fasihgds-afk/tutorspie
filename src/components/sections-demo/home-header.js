import { NAV_LINKS, PHONE, PHONE_HREF } from "../site-account";

export default function HomeHeader() {
  return (
    <header id="topnav" className="defaultscroll sticky bg-white w-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="navbar p-0 navbar-expand-xl">
              <a href="/" className="navbar-brand">
                <img
                  src="/images/logotutorspie.png"
                  alt="TutorsPie"
                  className="site-logo"
                />
              </a>

              {/* Mobile top-right button */}
              <span className="btns_xs">
                <a
                  href="/login?next=/order"
                  className="btn_user_mbile shared_order"
                >
                  Place an Order
                </a>
              </span>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#nav_responsive"
                aria-controls="nav_responsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img
                  src="/reference/Content/t1/images/bars-mobile.png"
                  className="img-fluid"
                  alt=""
                />
              </button>

              <div className="collapse navbar-collapse" id="nav_responsive">
                <div id="custom_navbar_xs" className="hidden-md">
                  <div className="logo_wrap_xs">
                    <a href="/" className="navbar-brand">
                      <img
                        src="/images/logotutorspie.png"
                        alt="TutorsPie"
                        className="site-logo"
                      />
                    </a>
                  </div>
                  <span
                    id="navbar_closer"
                    role="button"
                    tabIndex={0}
                    aria-label="Close navigation"
                  >
                    X
                  </span>
                </div>

                <ul className="site-main-nav">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>

                <ul className="navigation-menu text-center">
                  <li>
                    <div className="banner_seals twenty-four"></div>
                    <span className="twnty">24/7 Available</span>
                  </li>
                  <li>
                    <a href={PHONE_HREF} className="call-cta">
                      <span>
                        <img
                          src="/reference/Content/t1/images/phone-top.png"
                          className="img-fluid"
                          alt="Phone"
                        />
                      </span>
                      <p>
                        <em>Call us at</em> {PHONE}
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="chaton call-cta">
                      <img
                        src="/reference/Content/t1/images/comment-dots.png"
                        className="img-fluid"
                        alt="Chat"
                      />
                      <p>
                        <em>Click here to</em> Contact Support
                      </p>
                    </a>
                  </li>
                </ul>

                {/* ── NAVBAR BUTTONS — always Log In + Place an Order ── */}
                <ul className="navbar_btns">
                  <li>
                    <a href="/login" className="btn_user bordered_btn">
                      Log In
                    </a>
                  </li>
                  <li className="hidden-xs">
                    <a
                      href="/login?next=/order"
                      className="btn_user shared_order"
                    >
                      Place an Order
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="header_tp_btm">
              <ul className="navigation-menu text-center">
                <li>
                  <p>24/7 Available</p>
                </li>
                <li>
                  <a href={PHONE_HREF} className="call-cta">
                    <p>
                      <span>Call</span> {PHONE}
                    </p>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="chaton call-cta">
                    <p>Contact</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
