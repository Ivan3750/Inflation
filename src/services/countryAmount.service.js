export async function getCountryAmount(amount, startDate, endDate, country) {
  const response = await fetch(
    `https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?&country=${country}&start=${startDate}&end=${endDate}&amount=${amount}&format=true`
  );

  const text = await response.text();
  return text.slice(3, text.length - 2);
}
