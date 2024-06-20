import { loadDiagram } from "./Init/diagram.js";

async function getInflationRate(countryCode, year) {
    const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?date=${year}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data[1] && data[1].length > 0) {
            const inflationRate = data[1][0].value;
            if (inflationRate !== null) {
                return inflationRate;
            } else {
                throw new Error(`No inflation data available for ${year}.`);
            }
        } else {
            throw new Error(`No inflation data found for country code ${countryCode}.`);
        }
    } catch (error) {
        console.error("Error fetching inflation data:", error);
        return null;
    }
}

// Function to get country code from country name
function getCountryCode(countryName) {
    const index = {
        belarus: "BY",
        brazil: "BR",
        canada: "CA",
        "european-union": "EU",
        eurozone: "EZ",
        france: "FR",
        germany: "DE",
        greece: "GR",
        india: "IN",
        japan: "JP",
        kazakhstan: "KZ",
        mexico: "MX",
        spain: "ES",
        turkey: "TR",
        ukraine: "UA",
        "united-kingdom": "GB",
        "united-states": "US",
        DK: "DK"
    };

    return index[countryName.toLowerCase()];
}

// Exporting the function getProct as default
export async function getProct(startYear, endYear, countryName) {
    startYear = Number(startYear.slice(0, 4));
    endYear = Number(endYear.slice(0, 4));
    let arrayValues = [];
    let arrayYears = [];

    const countryCode = getCountryCode(countryName);

    if (!countryCode) {
        throw new Error(`Country code not found for ${countryName}.`);
    }

    for (let year = startYear; year <= endYear; year++) {
        arrayYears.push(year);

        arrayValues.push(
            getInflationRate(countryCode, year).then(inflationRate => {
                if (inflationRate !== null) {
                    return inflationRate;
                } else {
                    return null;
                }
            })
        );
    }

    const inflationRates = await Promise.all(arrayValues);

    loadDiagram(arrayYears, inflationRates);
}

// Exporting the index (if needed)
// export default index;

// Example usage:
