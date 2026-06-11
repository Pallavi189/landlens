import Icon from "./Icon";
import { propertyTypes } from "../utils/constants";

function SearchHero({
  localities,
  selectedLocality,
  propertyType,
  siteArea,
  loading,
  onLocalityChange,
  onPropertyTypeChange,
  onSiteAreaChange,
  onSubmit,
}) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1>Check SR Value & Market Price for Any Location in Bangalore</h1>
        <p>
          Get verified SR value, market price range, and registration cost
          before you buy any property.
        </p>
      </div>

      <form className="search-card" onSubmit={onSubmit}>
        <label>
          <span>Location</span>
          <select value={selectedLocality} onChange={onLocalityChange}>
            <option value="">Select Location</option>
            {localities.map((item) => (
              <option key={item.id} value={item.id}>
                {item.locality}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Property Type</span>
          <select value={propertyType} onChange={onPropertyTypeChange}>
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
            onChange={onSiteAreaChange}
            placeholder="Example: 1200"
          />
        </label>

        <button className="btn btn-primary search-button" type="submit">
          <Icon name="search" size={18} />
          {loading ? "Checking..." : "Check Value"}
        </button>
      </form>
    </section>
  );
}

export default SearchHero;
