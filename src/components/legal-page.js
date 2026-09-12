export default function LegalPage({ title, children }) {
  return (
    <div className="legal-page-wrap">
      <article className="legal-page">
        <h1>{title}</h1>
        {children}
      </article>
    </div>
  );
}

