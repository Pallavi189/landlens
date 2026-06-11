import PanelTitle from "./PanelTitle";

const nearbyAreas = [
  ["Whitefield", "Rs 5,500", "Rs 7,000 - Rs 9,500", "High"],
  ["Varthur", "Rs 4,200", "Rs 5,500 - Rs 7,500", "High"],
  ["Marathahalli", "Rs 6,000", "Rs 7,500 - Rs 10,500", "High"],
  ["Sarjapur Road", "Rs 4,800", "Rs 6,000 - Rs 8,500", "Medium"],
];

function AreaComparisonTable() {
  return (
    <div className="panel comparison-panel">
      <div className="table-heading">
        <PanelTitle icon="building" title="Quick Area Comparison (Residential Site)" />
        <button type="button">View All Areas</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Locality</th>
              <th>SR Value</th>
              <th>Market Range</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {nearbyAreas.map(([area, sr, range, trend]) => (
              <tr key={area}>
                <td>{area}</td>
                <td>{sr}</td>
                <td>{range}</td>
                <td>
                  <span className={trend === "Medium" ? "trend medium" : "trend"}>
                    Up {trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AreaComparisonTable;
