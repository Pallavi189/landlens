import DataRow from "./DataRow";
import PanelTitle from "./PanelTitle";
import { formatCurrency } from "../utils/formatters";

function StampDutyCard({ charges }) {
  return (
    <section className="panel">
      <PanelTitle icon="calculator" title="Stamp Duty & Registration Estimate" />
      <div className="charge-list">
        <DataRow
          label="Property Value Considered"
          value={formatCurrency(charges.value)}
        />
        <DataRow label="Stamp Duty (5%)" value={formatCurrency(charges.stampDuty)} />
        <DataRow
          label="Registration Fee (1%)"
          value={formatCurrency(charges.registrationFee)}
        />
        <DataRow
          label="Cess & Others (Approx.)"
          value={formatCurrency(charges.cess)}
        />
        <DataRow
          label="Total Estimated Charges"
          value={formatCurrency(charges.totalCharges)}
          highlight
        />
      </div>
      <p className="fine-print">* Charges are approximate and may vary slightly.</p>
    </section>
  );
}

export default StampDutyCard;
