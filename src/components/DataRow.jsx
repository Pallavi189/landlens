function DataRow({ label, value, highlight = false }) {
  return (
    <div className={`data-row ${highlight ? "highlight" : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default DataRow;
