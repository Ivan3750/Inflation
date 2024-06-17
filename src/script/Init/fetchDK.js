/* 

export const getDanmarkIndex = (amount,startDate, endDate, country, isShow) => {
    let startYear = Number(startDate.slice(0,4))
    let endYear = Number(endDate.slice(0,4))
   return fetch(`https://api.worldbank.org/v2/country/DK/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`)
        .then(response => response.data())
        .then(data => {
            if (data[1]) {
                const inflationRates = data[1].reduce((acc, yearData) => {
                    acc[yearData.date] = yearData.value;
                    return acc;
                }, {});
                console.log(inflationRates)
                let adjustedAmount = amount;
                        const inflationProcent = ((inflationRates[endYear] - inflationRates[startYear]) / inflationRates[startYear] )* 100;
                        console.log(inflationProcent)
                        adjustedAmount =  amount + (amount * inflationProcent) / 100
                return adjustedAmount
                
                document.getElementById('result').innerText = `Justeret beløb i ${endYear} er ${adjustedAmount.toFixed(2)}`;
            } else {
                document.getElementById('result').innerText = 'Ingen tilgængelige data for det valgte land og de valgte år.';
            }
        })
        .catch(error => console.error('Error:', error));
}


 */


/* export const getDanmarkIndex = (amount, startDate, endDate, country, isShow) => {
    let startYear = Number(startDate.slice(0, 4));
    let endYear = Number(endDate.slice(0, 4));

    return fetch(`https://api.worldbank.org/v2/country/DK/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(`https://api.worldbank.org/v2/country/DK/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`)
            if (data[1]) {
                const inflationRates = data[1].reduce((acc, yearData) => {
                    acc[yearData.date] = yearData.value;
                    return acc;
                }, {});
                console.log(inflationRates);
                
                const inflationProcent = ((inflationRates[endYear] - inflationRates[startYear]) / inflationRates[startYear]) * 100;
                console.log(inflationProcent, endYear, startYear);
                amount = Number(amount)
                let adjustedAmount = amount + (amount * inflationProcent) / 100;
                adjustedAmount =    adjustedAmount.toFixed(2)

                if (isShow) {
                    document.getElementById('result').innerText = `Justeret beløb i ${endYear} er ${adjustedAmount.toFixed(2)}`;
                }
                
                return [adjustedAmount, inflationRates];
            } else {
                if (isShow) {
                    document.getElementById('result').innerText = 'Ingen tilgængelige data for det valgte land og de valgte år.';
                }
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (isShow) {
                document.getElementById('result').innerText = 'Der opstod en fejl ved hentning af data.';
            }
            return null;
        });
};

 */



export const getDanmarkIndex = (amount, startDate, endDate, country, isShow) => {
    let startYear = Number(startDate.slice(0, 4));
    let endYear = Number(endDate.slice(0, 4));

    return fetch(`https://api.worldbank.org/v2/country/DK/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data[1]) {
                const inflationRates = data[1].reduce((acc, yearData) => {
                    acc[yearData.date] = yearData.value;
                    return acc;
                }, {});

                const inflationProcent = ((inflationRates[endYear] - inflationRates[startYear]) / inflationRates[startYear]) * 100;
                amount = Number(amount);
                let adjustedAmount = amount + (amount * inflationProcent) / 100;
                adjustedAmount = adjustedAmount.toFixed(2);

                return [adjustedAmount, inflationRates];
            } else {
                if (isShow) {
                    document.getElementById('result').innerText = 'Ingen tilgængelige data for det valgte land og de valgte år.';
                }
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (isShow) {
                document.getElementById('result').innerText = 'Der opstod en fejl ved hentning af data.';
            }
            return null;
        });
};
