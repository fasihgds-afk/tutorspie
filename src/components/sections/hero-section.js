import {
  BadgeCheck,
  Users,
  ShieldCheck,
  RefreshCw,
  Wallet,
  Gift,
} from "lucide-react";
import { useState } from "react";
import RatingStars from "../rating-stars";
import HeroFormDropdown from "../HeroFormDropdown";
import {
  assignmentType,
  academicLevel,
  subject,
  deadline,
} from "../../config/dropdown-fields.config";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    type: "1",
    level: "4",
    subject: "35",
    deadline: "6",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save lead data to localStorage for later use in order form
    const leadData = {
      type: formData.type,
      level: formData.level,
      subject: formData.subject,
      deadline: formData.deadline,
    };
    console.log("Saving hero lead data:", leadData);
    localStorage.setItem("heroLeadData", JSON.stringify(leadData));
    // Navigate to signup page (not login)
    window.location.href = "/signup";
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className={"bg-half-170 with-gradient home_ser"} id={"home"}>
      <div className={"home-center"}>
        <div className={"home-desc-center"}>
          <div className={"container"}>
            <div className={"row mt-md-5"}>
              <span id={"contact"} className={"anchor"}></span>
              <div className={"col-xl-7 hero-copy"}>
                <div className={"title-heading mt-4"}>
                  <h1 className={"heading text-white mb-3"}>
                    {"Premium Academic Writing Assistance"}
                  </h1>
                  <p className={"para-desc text-light para-desc-main"}>
                    {
                      "Get stress-free, high-quality academic support from qualified experts."
                    }
                    <br className={"ban_tagbreak"} />
                    {
                      " Enjoy fully original work, fast delivery, and friendly assistance whenever you need it."
                    }
                  </p>
                  <div className={"watch-video mt-4 pt-2   d-md-block"}>
                    <div className={"row"}>
                      <div className={"col-md-6 cpr"}>
                        <div
                          className={
                            "banner_feature_wraper banner_feature_wraper_line"
                          }
                        >
                          <span className="hero-feature-icon">
                            <BadgeCheck
                              size={18}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          </span>
                          {"Top-Quality Work Across All Subjects "}
                        </div>
                      </div>
                      <div className={"col-md-6 "}>
                        <div className={"banner_feature_wraper"}>
                          <span className="hero-feature-icon">
                            <Users
                              size={18}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          </span>
                          {"1,000+ Verified & Qualified Experts "}
                        </div>
                      </div>
                      <div className={"col-md-6"}>
                        <div
                          className={
                            "banner_feature_wraper under_lined banner_feat_mtp"
                          }
                        >
                          <span className="hero-feature-icon">
                            <ShieldCheck
                              size={18}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          </span>
                          {"100% Original & Plagiarism-Free Content "}
                        </div>
                      </div>
                      <div className={"col-md-6"}>
                        <div
                          className={
                            "banner_feature_wraper under_lined banner_feat_mtp"
                          }
                        >
                          <span className="hero-feature-icon">
                            <RefreshCw
                              size={18}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          </span>
                          {"Unlimited Free Revisions Included "}
                        </div>
                      </div>
                      <div className={"col-md-6"}>
                        <div
                          className={
                            "banner_feature_wraper under_lined banner_feat_mtp"
                          }
                        >
                          <span className="hero-feature-icon">
                            <Wallet
                              size={18}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          </span>
                          {"Flexible & Secure Payment Options "}
                        </div>
                      </div>
                      <div className={"col-md-6"}>
                        <div
                          className={"banner_feature_wraper banner_feat_mtp"}
                        >
                          <span className="hero-feature-icon">
                            <Gift
                              size={18}
                              strokeWidth={2.2}
                              aria-hidden="true"
                            />
                          </span>
                          {"Complimentary Features Worth "}
                          <span className={"bld"}>{"$90"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={"banner_ratings_details "}>
                    <div>
                      <p>
                        <RatingStars rating={4.8} />
                        {"4.8/5 Rated by 40k+ Students "}
                      </p>
                    </div>
                    <p>
                      {
                        " Trusted by students worldwide for quality, transparency, and proven result "
                      }
                    </p>
                  </div>
                  <div className={"upated_review_seals"}>
                    <ul>
                      <li>
                        <img
                          src={"/reference/Content/t1/images/banner_trust.png"}
                          className={"img-fluid"}
                          alt={"Trust Pilot"}
                        />
                      </li>
                      <li>
                        <img
                          src={
                            "/reference/Content/t1/images/banner_reviews.png"
                          }
                          className={"img-fluid"}
                          alt={"Reviews io"}
                        />
                      </li>
                      <li>
                        <img
                          src={
                            "/reference/Content/t1/images/banner_bizprobe.png"
                          }
                          className={"img-fluid"}
                          alt={"Bizprobe"}
                        />
                      </li>
                    </ul>
                  </div>
                  <div
                    className={"feature_logo_sprite  d-md-block"}
                    id={"lead_area"}
                  >
                    <ul>
                      <li>
                        <div className={"feat_logo_form feat_logo_1a"}></div>
                      </li>
                      <li>
                        <div className={"feat_logo_form feat_logo_2a"}></div>
                      </li>
                      <li>
                        <div className={"feat_logo_form feat_logo_3a"}></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={"col-xl-5 mt-4 pt-2 mt-sm-0 pt-sm-0 hero-form"}>
                <div className={"banner_frm_wraper"}>
                  <div
                    className={
                      "contact_wrapper calculate_order calculate_order_form"
                    }
                  >
                    <div className={"calculator_area"}>
                      <form
                        className={"main_form"}
                        id={"main_form"}
                        onSubmit={handleSubmit}
                      >
                        <div className={"order-form"}>
                          <div className={"row"}>
                            <div className={"col-md-12"}>
                              <div className={"contact_left p-0"}>
                                <div className={"form-title text-center"}>
                                  <h3>
                                    {"Starting at just "}
                                    <span>{"$5.99"}</span>
                                  </h3>
                                </div>
                                <div className={"form_dis_banner"}>
                                  <p>
                                    {"Get"}
                                    <span>{" 50% "}</span>
                                    {"OFF"}
                                  </p>
                                  <div className={"banner-ribon"}>
                                    <p>
                                      {"UP TO 20% "}
                                      <span>{"EXTRA DISCOUNT"}</span>
                                      {" ON LARGER PROJECTS"}
                                    </p>
                                  </div>
                                  <div className={"arrow-left1"}></div>
                                </div>
                                <div className={"row mb-3 form-start"}>
                                  {/* Assignment Type Dropdown */}
                                  <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                      <label htmlFor={"AssignmentType"}>
                                        {"Assignment Type "}
                                        <span className={"text-danger"}>
                                          {"*"}
                                        </span>
                                      </label>
                                      <HeroFormDropdown
                                        id="ddl_type"
                                        config={assignmentType}
                                        value={formData.type}
                                        onChange={(e) =>
                                          handleChange("type", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  {/* Academic Level Dropdown */}
                                  <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                      <label htmlFor={"AcademicLevel"}>
                                        {"Academic Level "}
                                        <span className={"text-danger"}>
                                          {"*"}
                                        </span>
                                      </label>
                                      <HeroFormDropdown
                                        id="ddl_lvl"
                                        config={academicLevel}
                                        value={formData.level}
                                        onChange={(e) =>
                                          handleChange("level", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  {/* Subject Dropdown */}
                                  <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                      <label htmlFor={"Subject"}>
                                        {"Subject "}
                                        <span className={"text-danger"}>
                                          {"*"}
                                        </span>
                                      </label>
                                      <HeroFormDropdown
                                        id="ddl_subject"
                                        config={subject}
                                        value={formData.subject}
                                        onChange={(e) =>
                                          handleChange("subject", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  {/* Deadline Dropdown */}
                                  <div className={"col-md-12"}>
                                    <div className={"form-group"}>
                                      <label htmlFor={"Deadline"}>
                                        {"Deadline "}
                                        <span className={"text-danger"}>
                                          {"*"}
                                        </span>
                                      </label>
                                      <HeroFormDropdown
                                        id="ddl_date"
                                        config={deadline}
                                        value={formData.deadline}
                                        onChange={(e) =>
                                          handleChange("deadline", e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={"col-md-12 sbmt_btn_adj"}>
                              <span
                                className={
                                  "ripple_yellow ripple_yellow_submit_cal"
                                }
                              >
                                <button
                                  type="submit"
                                  id={"mainformbtn"}
                                  className={
                                    "btn btn-success black-btn2 mt-2 mb-2 OrderNow"
                                  }
                                >
                                  {" GET STARTED SECURELY "}
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className={"form_btm"}>
                    <span>
                      <img
                        src={"/reference/Content/t1/images/lead-garant.png"}
                        alt={"guarantee"}
                        className={"img-fluid"}
                      />
                    </span>
                    {"Lowest Price Guarantee "}
                  </div>
                </div>
              </div>
            </div>
            <div className={"row"}>
              <div className={"col-md-12"}>
                <div className={"watch-video mt-4 pt-2 d-none"}>
                  <div className={"row"}>
                    <div className={"col-md-4"}>
                      <div className={"banner_feature_wraper"}>
                        <span>
                          <i className={"fas fa-file-alt"}></i>
                        </span>
                        {"100% Plagiarism FREE "}
                      </div>
                    </div>
                    <div className={"col-md-4"}>
                      <div className={"banner_feature_wraper under_lined"}>
                        <span>
                          <RatingStars rating={4.9} />
                        </span>
                        {"Rating 4.9/5 (5K+) "}
                      </div>
                    </div>
                    <div className={"col-md-4"}>
                      <div className={"banner_feature_wraper"}>
                        <span>
                          <img
                            src={"/reference/Content/t1/images/upfront.png"}
                            alt={"turnaround"}
                          />
                        </span>
                        {"No Upfront Payment "}
                      </div>
                    </div>
                  </div>
                  <div className={"row banner_feat_mtp"}>
                    <div className={"col-md-4"}>
                      <div className={"banner_feature_wraper "}>
                        <span>
                          <i
                            className={"fa fa-history"}
                            aria-hidden={"true"}
                          ></i>
                        </span>
                        {"Unlimited Revisions "}
                      </div>
                    </div>
                    <div className={"col-md-6 "}>
                      <div className={"banner_feature_wraper"}>
                        <span>
                          <i className={"fas fa-clipboard-list"}></i>
                        </span>
                        {"Free Features Worth "}
                        <span className={"disp"}>{"$90"}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"feature_logo_sprite   d-none"}>
                  <ul>
                    <li>
                      <div className={"feat_logo feat_logo_1"}></div>
                    </li>
                    <li>
                      <div className={"feat_logo feat_logo_2"}></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
