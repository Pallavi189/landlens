export const CESS_AMOUNT = 20000;

export function calculateGovernmentValue(siteArea, srValue) {
  return Number(siteArea || 0) * Number(srValue || 0);
}

export function calculateStampDutyCharges(totalGovernmentValue) {
  const value = Number(totalGovernmentValue || 0);
  const stampDuty = Math.round(value * 0.05);
  const registrationFee = Math.round(value * 0.01);
  const cess = CESS_AMOUNT;

  return {
    value,
    stampDuty,
    registrationFee,
    cess,
    totalCharges: stampDuty + registrationFee + cess,
  };
}

export function calculateMarketPrice(srValue, siteArea) {
  const value = Number(srValue || 0);
  const area = Number(siteArea || 0);
  const minMarket = value + 1500;
  const avgMarket = value + 2700;
  const maxMarket = value + 4000;

  return {
    minMarket,
    avgMarket,
    maxMarket,
    minMarketTotal: minMarket * area,
    avgMarketTotal: avgMarket * area,
    maxMarketTotal: maxMarket * area,
  };
}
