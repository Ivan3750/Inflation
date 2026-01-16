export async function getDanmarkIndex(amount, startDate, endDate) {
  const startYear = Number(startDate.slice(0, 4));
  const endYear = Number(endDate.slice(0, 4));

  const response = await fetch(
    `https://api.worldbank.org/v2/country/DK/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`
  );

  const data = await response.json();
  if (!data[1]) return null;

  const rates = {};
  data[1].forEach((row) => {
    rates[row.date] = row.value;
  });

  const inflation =
    ((rates[endYear] - rates[startYear]) / rates[startYear]) * 100;

  return (amount + (amount * inflation) / 100).toFixed(2);
}
