import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="standard-page home-page">
      <section className="page-hero">
        <p className="eyebrow">Bangalore SR Value Finder</p>
        <h1>LandLens helps buyers compare guidance value and market price.</h1>
        <p>
          Search an area, calculate government value, estimate registration
          costs, and request missing locality verification from one dashboard.
        </p>
        <div className="page-actions">
          <Link className="btn btn-primary" to="/sr-value">
            Check SR Value
          </Link>
          <Link className="btn btn-secondary" to="/request-value">
            Request Missing Location
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
