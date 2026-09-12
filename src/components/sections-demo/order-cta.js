export default function OrderCta() {
  return (
    <section
      id="order-cta"
      className={"cta_common cta_common_second ready1 cta-pad-adj"}
    >
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-xl-5 cpr"}>
            <div className={"cta_second-left"}>
              <img
                src={"/images/tutorspie-discount.png"}
                alt={"Tutorspie 50% off academic support"}
              />
            </div>
          </div>
          <div className={"col-xl-7"}>
            <div className={"ready_right cta_common_second_right mt-0"}>
              <h5>
                {
                  " PLACE YOUR ORDER IN JUST 2 MINUTES TO GET CUSTOM-WRITTEN PAPER "
                }
              </h5>
              <p>
                {
                  " We will assign your order to a subject-matter expert who will skillfully write your paper as soon as you place your order with us. "
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
