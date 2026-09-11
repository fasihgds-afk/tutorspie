import RatingStars from "../rating-stars";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, GraduationCap } from "lucide-react";
const reviews = [
  {
    id: "2364",
    title: "Highly Recommended",
    text: "I highly recommend Tutorspie to all the students who want to score good grades and achieve academic excellence.",
    writer: "WM-336",
    orders: "1230",
    reviews: "1205",
    avatar: "t1.png",
  },
  {
    id: "8798",
    title: "Great Job Done",
    text: "Tutorspie did a great job on my order. Very well organized and professional assistance.",
    writer: "WM-243",
    orders: "1150",
    reviews: "1140",
    avatar: "t2.png",
  },
  {
    id: "5888",
    title: "Talented Team",
    text: "They have an extremely cooperative and talented staff who know exactly what you want and deliver precisely that.",
    writer: "WM-136",
    orders: "1070",
    reviews: "1045",
    avatar: "t3.png",
  },
  {
    id: "9199",
    title: "Top Services",
    text: "It was a wonderful experience with Tutorspie. Will definitely hire them for my next project.",
    writer: "WM-901",
    orders: "980",
    reviews: "955",
    avatar: "t4.png",
  },
];
export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];
  return (
    <section id="testimonials" className="modern-testimonials">
      <div className="container testimonial-grid">
        <div className="testimonial-intro">
          <span className="section-eyebrow">STUDENT STORIES</span>
          <h2>
            A little support.
            <br />
            <span>A big difference.</span>
          </h2>
          <p>
            Read testimonials of our most satisfied customers and discover how a
            helping hand can make academic life feel easier.
          </p>
          <div className="cta_cmn_btn">
            <a
              className="shared_order modern-button"
              data-action="order"
              href="/order"
            >
              Get started <ArrowRight size={17} />
            </a>
            <a className="testimonial-chat" href="/contact">
              Talk to our team
            </a>
          </div>
          <div className="review-navigation">
            <button
              onClick={() => setIndex((index + 3) % 4)}
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => setIndex((index + 1) % 4)}
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
            <span>
              0{index + 1} <span>/ 04</span>
            </span>
          </div>
        </div>
        <article className="modern-review" aria-live="polite">
          <div className="review-content" key={review.id}>
            <div className="review-top">
              <RatingStars rating={5} showNumber />
              <Quote className="quote-mark" size={40} />
            </div>
            <h3>{review.title}</h3>
            <blockquote>“{review.text}”</blockquote>
            <div className="review-person">
              <img
                src={"/reference/Content/t1/images/" + review.avatar}
                alt="Sample customer avatar"
              />
              <div>
                <strong>Customer #{review.id}</strong>
                <span>Academic writing assistance</span>
              </div>
            </div>
          </div>
          <div className="review-expert">
            <div>
              <GraduationCap size={23} />
              <span>
                <strong>Writer {review.writer}</strong>
                <small>
                  Ph.D. · {review.orders} orders · {review.reviews} reviews
                </small>
              </span>
            </div>
            <a href="/order" data-action="order">
              Hire writer <ArrowRight size={16} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
