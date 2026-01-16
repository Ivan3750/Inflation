const countryMap = {
  belarus: "BY",
  brazil: "BR",
  canada: "CA",
  france: "FR",
  germany: "DE",
  ukraine: "UA",
  "united-states": "US",
  "united-kingdom": "GB",
  DK: "DK"
};

async function fetchRate(code, year) {
  const res = await fetch(
    `https://api.worldbank.org/v2/country/${code}/indicator/FP.CPI.TOTL.ZG?date=${year}&format=json`
  );
  const data = await res.json();
  return data?.[1]?.[0]?.value ?? null;
}

export async function getInflationPercent(startDate, endDate, country) {
  const startYear = Number(startDate.slice(0, 4));
  const endYear = Number(endDate.slice(0, 4));
  const code = countryMap[country];

  const years = [];
  const values = [];

  for (let y = startYear; y <= endYear; y++) {
    years.push(y);
    values.push(fetchRate(code, y));
  }

  return {
    years,
    values: await Promise.all(values)
  };
}
