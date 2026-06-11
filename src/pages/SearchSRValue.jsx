import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const propertyTypes = [
  "Residential Site",
  "Residential Flat",
  "Commercial Property",
];

const fallbackLocalities = [
  {
    id: "whitefield-demo",
    locality: "Whitefield",
    city: "Bengaluru",
    district: "Bengaluru Urban",
    sro: "KR Puram",
    pincode: "560066",
  },
];

const nearbyAreas = [
  ["Whitefield", "Rs 5,500", "Rs 7,000 - Rs 9,500", "High"],
  ["Varthur", "Rs 4,200", "Rs 5,500 - Rs 7,500", "High"],
  ["Marathahalli", "Rs 6,000", "Rs 7,500 - Rs 10,500", "High"],
  ["Sarjapur Road", "Rs 4,800", "Rs 6,000 - Rs 8,500", "Medium"],
];

const trustPoints = [
  "Verified SR Values from Official Sources",
  "Regularly Updated",
  "Easy to Use & Understand",
  "Trusted by Home Buyers & Investors",
];

const iconPaths = {
  building:
    "M4 20V8l6-4 6 4v12M7 20v-7m3 7v-9m3 9v-7M3 20h18M16 20v-9l4 2v7",
  user: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  search: "m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15",
  location: "M12 21s7-4.44 7-11a7 7 0 1 0-14 0c0 6.56 7 11 7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.5-3a7 7 0 0 0-.12-1.26l2.02-1.57-2-3.46-2.39.96a8 8 0 0 0-2.18-1.26L15.5 3h-4l-.36 2.41a8 8 0 0 0-2.18 1.26l-2.36-.96-2 3.46 2 1.57A7 7 0 0 0 6.5 12c0 .43.04.85.12 1.26L4.6 14.83l2 3.46 2.36-.96a8 8 0 0 0 2.18 1.26l.36 2.41h4l.36-2.41a8 8 0 0 0 2.18-1.26l2.36.96 2-3.46-2.02-1.57c.08-.41.12-.83.12-1.26Z",
  calendar:
    "M7 3v4M17 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z",
  check: "m5 13 4 4L19 7",
  chart: "M4 19V5M8 19v-7m4 7V9m4 10V3m4 16H3",
  calculator:
    "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 5h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  help: "M12 18h.01M9.1 9a3 3 0 1 1 5.45 1.73c-.96.58-1.55 1.13-1.55 2.27M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
};

const demoResult = {
  property_type: "Residential Site",
  road_width_category: "30 ft and above",
  value_per_sqft: 5500,
  verification_status: "Verified",
  last_verified_at: "2026-06-03",
  localities: fallbackLocalities[0],
  siteArea: 1200,
  governmentValue: 6600000,
};

function Icon({ name, className = "", size = 22 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={iconPaths[name]}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value) {
  if (!value) return "03 June 2026";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function compactCurrency(value) {
  return formatCurrency(value).replace("₹", "Rs ");
}

function SearchSRValue() {
  const [localities, setLocalities] = useState(fallbackLocalities);
  const [selectedLocality, setSelectedLocality] = useState("whitefield-demo");
  const [propertyType, setPropertyType] = useState("Residential Site");
  const [siteArea, setSiteArea] = useState("1200");
  const [result, setResult] = useState(demoResult);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLocalities() {
      const { data, error } = await supabase
        .from("localities")
        .select("id, locality, district, city, sro, pincode")
        .order("locality", { ascending: true });

      if (error || !data?.length) {
        if (error) console.error("Error fetching localities:", error.message);
        return;
      }

      setLocalities(data);

      const whitefield = data.find((item) =>
        item.locality.toLowerCase().includes("whitefield"),
      );
      setSelectedLocality(String((whitefield || data[0]).id));
    }

    fetchLocalities();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();

    if (!selectedLocality || !siteArea) {
      alert("Please select location and enter site area.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("sr_values")
      .select(
        `
        id,
        property_type,
        road_width_category,
        value_per_sqft,
        effective_from,
        source,
        verification_status,
        last_verified_at,
        localities (
          locality,
          district,
          city,
          sro,
          pincode
        )
      `,
      )
      .eq("locality_id", selectedLocality)
      .eq("property_type", propertyType)
      .limit(1)
      .single();

    setLoading(false);

    if (error) {
      console.error("Error fetching SR value:", error.message);
      alert("SR value not found for this location.");
      return;
    }

    const governmentValue = Number(siteArea) * Number(data.value_per_sqft);

    setResult({
      ...data,
      siteArea: Number(siteArea),
      governmentValue,
    });
  }

  const selectedLocalityName = useMemo(() => {
    return (
      localities.find((item) => String(item.id) === selectedLocality)
        ?.locality || "Whitefield"
    );
  }, [localities, selectedLocality]);

  const market = useMemo(() => {
    const area = Number(result?.siteArea || siteArea || 1200);
    const srValue = Number(result?.value_per_sqft || 5500);
    const minimum = Math.round(srValue * 1.27);
    const average = Math.round(srValue * 1.49);
    const maximum = Math.round(srValue * 1.73);

    return {
      minimum,
      average,
      maximum,
      minTotal: minimum * area,
      avgTotal: average * area,
      maxTotal: maximum * area,
    };
  }, [result, siteArea]);

  const charges = useMemo(() => {
    const value = Number(result?.governmentValue || 6600000);
    const stampDuty = Math.round(value * 0.05);
    const registration = Math.round(value * 0.01);
    const cess = 20000;

    return {
      value,
      stampDuty,
      registration,
      cess,
      total: stampDuty + registration + cess,
    };
  }, [result]);

  return (
    <main className="sr-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="LandLens home">
          <span className="brand-mark">
            <Icon name="building" size={28} />
          </span>
          <span>
            <strong>LandLens</strong>
            <small>Know the real value before you buy</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {["Home", "SR Value", "Stamp Duty Calculator", "Area Insights", "Request Value", "About Us"].map(
            (item) => (
              <a
                className={item === "SR Value" ? "active" : ""}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                key={item}
              >
                {item}
              </a>
            ),
          )}
        </nav>

        <div className="header-actions">
          <button className="btn btn-secondary" type="button">
            <Icon name="user" size={17} />
            Login
          </button>
          <button className="btn btn-primary" type="button">
            <Icon name="user" size={17} />
            Admin Dashboard
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <h1>Check SR Value & Market Price for Any Location in Bangalore</h1>
          <p>
            Get verified SR value, market price range, and registration cost
            before you buy any property.
          </p>
        </div>

        <form className="search-card" onSubmit={handleSearch}>
          <label>
            <span>Location</span>
            <select
              value={selectedLocality}
              onChange={(event) => setSelectedLocality(event.target.value)}
            >
              {localities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.locality}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Property Type</span>
            <select
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Area (in Sqft)</span>
            <input
              min="1"
              type="number"
              value={siteArea}
              onChange={(event) => setSiteArea(event.target.value)}
            />
          </label>

          <button className="btn btn-primary search-button" type="submit">
            <Icon name="search" size={18} />
            {loading ? "Checking..." : "Check Value"}
          </button>
        </form>
      </section>

      <section className="content-shell" aria-live="polite">
        <div className="summary-strip">
          <InfoTile
            icon="location"
            label="Location"
            value={`${result.localities.locality || selectedLocalityName}, ${
              result.localities.city || "Bengaluru"
            }`}
          />
          <InfoTile
            icon="gear"
            label="Jurisdiction (SRO)"
            value={result.localities.sro || "KR Puram"}
          />
          <InfoTile
            icon="calendar"
            label="Last Updated"
            value={formatDate(result.last_verified_at)}
          />
          <InfoTile
            icon="check"
            label="Status"
            value={result.verification_status || "Verified"}
            tone="success"
          />
        </div>

        <div className="dashboard-grid">
          <section className="panel sr-value-panel">
            <PanelTitle icon="building" title="SR Value & Government Value" />
            <div className="sr-value-layout">
              <div className="value-hero">
                <span>SR Value (Guidance Value)</span>
                <strong>{formatCurrency(result.value_per_sqft)}</strong>
                <em>Per Sqft</em>
              </div>
              <div className="value-lines">
                <Row label="Site Area" value={`${result.siteArea} Sqft`} />
                <Row
                  label="SR Value (Per Sqft)"
                  value={formatCurrency(result.value_per_sqft)}
                />
                <Row
                  label="Total Government Value"
                  value={formatCurrency(result.governmentValue)}
                  highlight
                />
              </div>
            </div>
            <p className="fine-print">
              This value is used for stamp duty and registration as per
              Government guideline.
            </p>
          </section>

          <section className="panel">
            <PanelTitle
              icon="calculator"
              title="Stamp Duty & Registration Estimate"
            />
            <div className="charge-list">
              <Row
                label="Property Value Considered"
                value={formatCurrency(charges.value)}
              />
              <Row label="Stamp Duty (5%)" value={formatCurrency(charges.stampDuty)} />
              <Row
                label="Registration Fee (1%)"
                value={formatCurrency(charges.registration)}
              />
              <Row
                label="Cess & Others (Approx.)"
                value={formatCurrency(charges.cess)}
              />
              <Row
                label="Total Estimated Charges"
                value={formatCurrency(charges.total)}
                highlight
              />
            </div>
            <p className="fine-print">* Charges are approximate and may vary slightly.</p>
          </section>

          <section className="panel market-panel">
            <PanelTitle icon="chart" title="Estimated Market Price" />
            <div className="market-prices">
              <PriceBlock
                label="Minimum Price"
                value={market.minimum}
                total={market.minTotal}
              />
              <PriceBlock
                label="Average Price"
                value={market.average}
                total={market.avgTotal}
              />
              <PriceBlock
                label="Maximum Price"
                value={market.maximum}
                total={market.maxTotal}
              />
            </div>
            <p className="insight">
              <strong>Market Insight:</strong> The current market price is{" "}
              <span>25% - 45% higher</span> than the SR value in this location.
            </p>
          </section>

          <section className="panel">
            <PanelTitle icon="shield" title="Price Evaluation" />
            <div className="evaluation-box">
              <span className="check-ring">
                <Icon name="check" size={38} />
              </span>
              <div>
                <strong>Fair Deal</strong>
                <p>
                  The market price is within a reasonable range compared to SR
                  value in this location.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="bottom-grid">
          <div className="panel comparison-panel">
            <div className="table-heading">
              <PanelTitle
                icon="building"
                title="Quick Area Comparison (Residential Site)"
              />
              <button type="button">View All Areas</button>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Locality</th>
                    <th>SR Value (Per Sqft)</th>
                    <th>Market Range (Per Sqft)</th>
                    <th>Price Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {nearbyAreas.map(([area, sr, range, trend]) => (
                    <tr key={area}>
                      <td>{area}</td>
                      <td>{sr}</td>
                      <td>{range}</td>
                      <td>
                        <span
                          className={
                            trend === "Medium" ? "trend medium" : "trend"
                          }
                        >
                          {trend === "Medium" ? "↗" : "↗"} {trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel why-panel">
            <PanelTitle icon="building" title="Why LandLens?" />
            <ul>
              {trustPoints.map((point, index) => (
                <li key={point}>
                  <span>{index + 1}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="request-card">
            <Icon name="help" size={28} />
            <div>
              <h2>Can&apos;t find your location?</h2>
              <p>
                Submit a request and our team will fetch the verified SR value
                for you.
              </p>
              <button className="request-button" type="button">
                Request SR Value
                <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function InfoTile({ icon, label, value, tone = "" }) {
  return (
    <div className={`info-tile ${tone}`}>
      <span>
        <Icon name={icon} />
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function PanelTitle({ icon, title }) {
  return (
    <h2 className="panel-title">
      <span>
        <Icon name={icon} size={18} />
      </span>
      {title}
    </h2>
  );
}

function Row({ label, value, highlight = false }) {
  return (
    <div className={`data-row ${highlight ? "highlight" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PriceBlock({ label, value, total }) {
  return (
    <div className="price-block">
      <span>{label}</span>
      <strong>{compactCurrency(value)} / Sqft</strong>
      <em>{compactCurrency(total)} (Total)</em>
    </div>
  );
}

export default SearchSRValue;
