import DataRow from "./DataRow";
import PanelTitle from "./PanelTitle";
import { formatCurrency } from "../utils/formatters";

function SRValueCard({ result }) {
  const isDemo = result.verification_status === "demo";

  return (
    <section className="panel sr-value-panel">
      <PanelTitle icon="building" title="SR Value & Government Value" />
      <div className="sr-value-layout">
        <div className="value-hero">
          <span>SR Value (Guidance Value)</span>
          <strong>{formatCurrency(result.value_per_sqft)}</strong>
          <em>Per Sqft</em>
        </div>
        <div className="value-lines">
          <DataRow label="Site Area" value={`${result.siteArea} Sqft`} />
          <DataRow
            label="SR Value (Per Sqft)"
            value={formatCurrency(result.value_per_sqft)}
          />
          <DataRow
            label="Total Government Value"
            value={formatCurrency(result.governmentValue)}
            highlight
          />
        </div>
      </div>
      <p className="fine-print">
        This value is used for stamp duty and registration as per Government
        guideline.
      </p>
      {isDemo ? (
        <p className="warning-note">
          This is demo data for testing. Replace with verified official SR value
          before public launch.
        </p>
      ) : (
        <p className="verified-note">Verified</p>
      )}
    </section>
  );
}

export default SRValueCard;
