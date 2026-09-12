export default function ServicesSection() {
  return (
    <section className={"services lazy"} id={"services_section"}>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-md-12 col-sm-12"}>
            <div className={"heading_area text-center section-title"}>
              <hgroup>
                <h2 className={"main-title"}>
                  {" Writing Assistance We Offer "}
                </h2>
              </hgroup>
              <p className={"main_paragraph txt_medblack"}>
                {
                  " Join us for the best experience while seeking writing assistance in your academic life. "
                }
              </p>
            </div>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-lg-6"}>
            <div className={"left-wrapper"}>
              <p className={"main_paragraph txt_medblack pt-5"}>
                {
                  " We have a knack for dealing with a wide range of academic documents related to all the subject areas. Our experts have adequate experience and we have benefited many students over the years to achieve academic success. "
                }
              </p>
            </div>
            <div className={"services-list"}>
              <a href={"/order"} data-action={"order"}>
                {"Essays"}
              </a>
              <a href={"/order"} data-action={"order"}>
                {"Assignments"}
              </a>
              <a href={"/order"} data-action={"order"}>
                {"Research Papers"}
              </a>
              <a href={"/order"} data-action={"order"}>
                {"Term Papers"}
              </a>
              <a href={"/order"} data-action={"order"}>
                {"Homework"}
              </a>
              <a href={"/order"} data-action={"order"}>
                {"Thesis"}
              </a>
              <a href={"/order"} className={"mb-0"} data-action={"order"}>
                {"Dissertation"}
              </a>
              <a
                href={"/order"}
                className={"last-service-item mb-0"}
                data-action={"order"}
              >
                {"and many more\u2026"}
              </a>
            </div>
            <div className={"cta_cmn_btn "}>
              <a
                href={"/order"}
                className={"shared_order"}
                data-action={"order"}
              >
                {"Order Now"}
              </a>
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
          <div className={"col-lg-6 col-sm-12"}>
            <div className={"row"}>
              <div className={"col-md-6"}>
                <div className={"main"}>
                  <div className={"service service_1"}>
                    <div className={"service-logo"}>
                      <img
                        src={"/reference/Content/t1/images/writing.png"}
                        className={"img-fluid"}
                        alt={"Writing"}
                      />
                    </div>
                    <h4>{"Writing"}</h4>
                    <p className={"txt_medblack"}>
                      {
                        "Hire a qualified writer belonging to your subject area to get 100% plagiarism-free writing at affordable prices."
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className={"col-md-6"}>
                <div className={"main"}>
                  <div className={"service"}>
                    <div className={"service-logo"}>
                      <img
                        src={"/reference/Content/t1/images/editing.png"}
                        className={"img-fluid"}
                        alt={"Editing"}
                      />
                    </div>
                    <h4>{"Editing & Proofreading"}</h4>
                    <p className={"txt_medblack"}>
                      {
                        "Our experts will remove all the grammatical and contextual mistakes via thorough editing and proofreading!"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col-md-12 our_services"}>
            <div className={"service-categories text-xs-center"}>
              <div className={"container"}>
                <div className={"auto_slideshow"}>
                  <div className={"moving_slowly"}>
                    <div className={"first-row"}>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon1"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"History"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon2"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Finance"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon3"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Statistical Analysis"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon4"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Law"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon5"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Statistics"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon6"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Accounting"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon1"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"History"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon2"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Finance"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon3"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Statistical Analysis"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon4"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Law"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon5"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Statistics"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon6"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Accounting"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon1"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"History"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon2"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Finance"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon3"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Statistical Analysis"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon4"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Law"}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={"second_row"}>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon17"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Psychology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon18"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Religion and Theology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon19"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Sociology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon20"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Technology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon21"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Tourism"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon22"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Auditing"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon17"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Psychology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon18"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Religion and Theology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon19"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Sociology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon20"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Technology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon21"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Tourism"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon22"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Auditing"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon17"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Psychology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon18"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Religion and Theology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon19"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Sociology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className={"col-md-3"}>
                        <div className={"card service-card card-inverse"}>
                          <div className={"card-block"}>
                            <div className={"subjects_icon icon20"}></div>
                            <h4
                              className={
                                "card-title exsmall_title txt_medblack"
                              }
                            >
                              {"Technology"}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
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
