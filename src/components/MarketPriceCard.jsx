import PanelTitle from "./PanelTitle";
import { formatDemoCurrency } from "../utils/formatters";

function MarketPriceCard({ market }) {
  return (
    <section className="panel market-panel">
      <PanelTitle icon="chart" title="Estimated Market Price" />
      <div className="market-prices">
        <PriceBlock
          label="Minimum Price"
          value={market.minMarket}
          total={market.minMarketTotal}
        />
        <PriceBlock
          label="Average Price"
          value={market.avgMarket}
          total={market.avgMarketTotal}
        />
        <PriceBlock
          label="Maximum Price"
          value={market.maxMarket}
          total={market.maxMarketTotal}
        />
      </div>
      <p className="insight">
        <strong>Market Insight:</strong> Estimated/demo market range until a real
        market prices table is added.
      </p>
    </section>
  );
}

function PriceBlock({ label, value, total }) {
  return (
    <div className="price-block">
      <span>{label}</span>
      <strong>{formatDemoCurrency(value)} / Sqft</strong>
      <em>{formatDemoCurrency(total)} (Total)</em>
    </div>
  );
}

export default MarketPriceCard;
