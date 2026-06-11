import Icon from "./Icon";
import { formatDate } from "../utils/formatters";

function ResultSummary({ result }) {
  const locality = result.localities || {};

  return (
    <div className="summary-strip">
      <InfoTile
        icon="location"
        label="Location"
        value={`${locality.locality || "Whitefield"}, ${
          locality.city || "Bengaluru"
        }`}
      />
      <InfoTile
        icon="gear"
        label="Jurisdiction (SRO)"
        value={locality.sro || "Not available"}
      />
      <InfoTile
        icon="calendar"
        label="Last Updated"
        value={formatDate(result.last_verified_at)}
      />
      <InfoTile
        icon="check"
        label="Status"
        value={result.verification_status === "demo" ? "Demo" : "Verified"}
        tone="success"
      />
    </div>
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

export default ResultSummary;
