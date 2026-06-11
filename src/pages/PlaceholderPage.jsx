function PlaceholderPage({ eyebrow, title, body }) {
  return (
    <main className="standard-page">
      <section className="page-hero placeholder-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </section>
    </main>
  );
}

export default PlaceholderPage;
