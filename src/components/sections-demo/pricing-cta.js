export default function PricingCta() {
  return (
    <section
      id="pricing-cta"
      className={"cta_common cta_common_second ready1 cta-pad-adj updated-cta"}
    >
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-xl-4 cpr"}>
            <div className={"cta_second-left"}>
              <img
                src={"/images/tutorspie-discount.png"}
                className={"upd-img"}
                alt={"Tutorspie 50% off academic support"}
              />
            </div>
          </div>
          <div className={"col-xl-8"}>
            <div className={"ready_right cta_common_second_right mt-0"}>
              <h5>
                {
                  " GET THE FINEST CUSTOM PAPER WRITING ASSISTANCE AT UNBEATABLE PRICES "
                }
              </h5>
              <p>
                {" Unlock the power of top-notch paper writing at"}
                <span className={"content_line"}>
                  {" lowest prices in the industry"}
                </span>
                {
                  ". Experience the winning combination of premium quality and affordability, at your fingertips. "
                }
              </p>
              <div className={"row"}>
                <div className={"col-md-12"}>
                  <div className={"cta_cmn_btn"}>
                    <a
                      href={"/order"}
                      className={"shared_order"}
                      data-action={"order"}
                    >
                      {"Order Now"}
                    </a>
                    <span className={"four-seven"}>
                      <img
                        src={"/reference/Content/t1/images/twenty-four.png"}
                        alt={"not loaded"}
                      />
                      <span className={"twnty"}>{"24/7 Available"}</span>
                    </span>
                    <a href={"tel:+18005550199"} className={"call-cta"}>
                      <span>
                        <img
                          src={"/reference/Content/t1/images/phone-top.png"}
                          className={"img-fluid"}
                          alt={"Phone"}
                        />
                      </span>
                      <p>
                        <em>{"Call us at"}</em>
                        {" Contact support "}
                      </p>
                    </a>
                    <a href={"/contact"} className={"chaton call-cta"}>
                      <img
                        src={"/reference/Content/t1/images/comment-dots.png"}
                        className={"img-fluid"}
                        alt={"Dots"}
                      />
                      <p>
                        <em>{"Click here to"}</em>
                        {" Start Live Chat "}
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
