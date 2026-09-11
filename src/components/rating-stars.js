export default function RatingStars({ rating, showNumber = false }) {
  const value = Math.min(5, Math.max(0, rating));
  return (
    <span className="rating-display">
      <span
        className="rating-stars"
        role="img"
        aria-label={`${value} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span className="rating-star" key={i} aria-hidden="true">
            <span>★</span>
            <span
              className="rating-fill"
              style={{ width: `${Math.min(1, Math.max(0, value - i)) * 100}%` }}
            >
              ★
            </span>
          </span>
        ))}
      </span>
      {showNumber && <strong className="rating-number">{value}/5</strong>}
    </span>
  );
}
