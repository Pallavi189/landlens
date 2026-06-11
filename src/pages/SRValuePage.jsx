import { useEffect, useMemo, useState } from "react";
import AreaComparisonTable from "../components/AreaComparisonTable";
import MarketPriceCard from "../components/MarketPriceCard";
import PriceEvaluationCard from "../components/PriceEvaluationCard";
import RequestCard from "../components/RequestCard";
import ResultSummary from "../components/ResultSummary";
import SearchHero from "../components/SearchHero";
import SRValueCard from "../components/SRValueCard";
import StampDutyCard from "../components/StampDutyCard";
import { supabase } from "../lib/supabaseClient";
import {
  calculateGovernmentValue,
  calculateMarketPrice,
  calculateStampDutyCharges,
} from "../utils/calculations";
import { propertyTypes } from "../utils/constants";

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

const demoResult = {
  property_type: "Residential Site",
  road_width_category: "30 ft and above",
  value_per_sqft: 5500,
  verification_status: "demo",
  last_verified_at: "2026-06-03",
  localities: fallbackLocalities[0],
  siteArea: 1200,
  governmentValue: 6600000,
};

function SRValuePage() {
  const [localities, setLocalities] = useState(fallbackLocalities);
  const [selectedLocality, setSelectedLocality] = useState("whitefield-demo");
  const [propertyType, setPropertyType] = useState(propertyTypes[0]);
  const [siteArea, setSiteArea] = useState("1200");
  const [result, setResult] = useState(demoResult);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchLocalities() {
      const { data, error } = await supabase
        .from("localities")
        .select("id, locality, district, city, sro, pincode")
        .order("locality", { ascending: true });

      if (error) {
        setMessage("Could not load live localities. Showing demo location.");
        return;
      }

      if (!data?.length) return;

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
    setMessage("");

    if (!selectedLocality) {
      setMessage("Please select a location.");
      return;
    }

    if (!siteArea || Number(siteArea) <= 0) {
      setMessage("Please enter a valid site area.");
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
      .maybeSingle();

    setLoading(false);

    if (error) {
      setMessage("Supabase fetch error. Please try again.");
      return;
    }

    if (!data) {
      setMessage(
        "SR value not found for this location. You can request verification.",
      );
      return;
    }

    const governmentValue = calculateGovernmentValue(
      Number(siteArea),
      data.value_per_sqft,
    );

    setResult({
      ...data,
      siteArea: Number(siteArea),
      governmentValue,
    });
  }

  const charges = useMemo(
    () => calculateStampDutyCharges(result.governmentValue),
    [result.governmentValue],
  );

  const market = useMemo(
    () => calculateMarketPrice(result.value_per_sqft, result.siteArea),
    [result.siteArea, result.value_per_sqft],
  );

  return (
    <main className="sr-page">
      <SearchHero
        localities={localities}
        selectedLocality={selectedLocality}
        propertyType={propertyType}
        siteArea={siteArea}
        loading={loading}
        onLocalityChange={(event) => setSelectedLocality(event.target.value)}
        onPropertyTypeChange={(event) => setPropertyType(event.target.value)}
        onSiteAreaChange={(event) => setSiteArea(event.target.value)}
        onSubmit={handleSearch}
      />

      <section className="content-shell" aria-live="polite">
        {message ? <div className="status-message">{message}</div> : null}
        <ResultSummary result={result} />

        <div className="dashboard-grid">
          <SRValueCard result={result} />
          <StampDutyCard charges={charges} />
          <MarketPriceCard market={market} />
          <PriceEvaluationCard />
        </div>

        <section className="bottom-grid">
          <AreaComparisonTable />
          <WhyLandLens />
          <RequestCard />
        </section>
      </section>
    </main>
  );
}

function WhyLandLens() {
  const trustPoints = [
    "Verified SR Values from official sources",
    "Regularly updated records",
    "Simple guidance for buyers and investors",
    "Built for Bangalore property decisions",
  ];

  return (
    <div className="panel why-panel">
      <h2 className="panel-title compact-title">Why LandLens?</h2>
      <ul>
        {trustPoints.map((point, index) => (
          <li key={point}>
            <span>{index + 1}</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SRValuePage;
