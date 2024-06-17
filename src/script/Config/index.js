/* import {getCountryAmount} from "../Init/fetchAll.js"
import {getDanmarkIndex} from "../Init/fetchDK.js"
import {loadDiagram} from "../Init/diagram.js"



document.getElementById('btn-submit').addEventListener('click', function calculate(event) {
    event.preventDefault()
    const amount = document.getElementById('amount').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const country = document.getElementById('country').value;
    let startYear = Number(startDate.slice(0,4))
    let endYear = Number(endDate.slice(0,4))
    let differentYearIndex = endYear - (startYear-1)
    if(country != "DK"){

    
    getCountryAmount(amount, startDate, endDate, country, true)
    .then(data =>{
        const endPrice = document.querySelector('#endPrice');
        console.log("In" + data)
        endPrice.value = data
    })

   
    console.log(startYear, endDate, differentYearIndex)
    let ArrayYears = []
    for (let i = 0; i < differentYearIndex; i++) {
        ArrayYears.push(startYear + i)
    }
   let ArrayValues = []
   let promises = ArrayYears.map(year => {
    return getCountryAmount(amount, startDate, `${year}/1/1`, country, true)
        .then(data => {
            let numberOnly = data.replace(/[^\d\.]/g, "");
            console.log(numberOnly)
            ArrayValues.push(numberOnly);
            console.log(data, ArrayValues);
        });
});

Promise.all(promises)
.then(() => {
    console.log('All promises resolved', ArrayValues);
    loadDiagram(ArrayYears, ArrayValues);
})
.catch(error => {
    console.error('An error occurred:', error);
});



}else{
    getDanmarkIndex(amount, startDate, endDate, country, true)
    .then(data =>{
        console.log(data)
        const endPrice = document.querySelector('#endPrice');
        console.log("In" + data[0])
        endPrice.value = `${data[0]} DKK`
        console.log(data[1])
        function InfNum(amount){
            let dataValues = Object.values(data[1])
            const years = Object.keys(dataValues).sort();
            const inflationRates = {};
            amount = Number(amount);
        
                for (let i = 1; i < years.length; i++) {
                    const year = years[i];
                    const prevYear = years[i - 1];
                    const cpiCurrentYear = dataValues[year];
                    const cpiPrevYear = dataValues[prevYear];
                    const inflationRate = ((cpiCurrentYear - cpiPrevYear) / cpiPrevYear) * 100;
                    const adjustedAmount = amount + (amount * inflationRate) / 100;
                    inflationRates[year] = adjustedAmount;
                    console.log("DATA: "

                        + years + " " +
                        + year + " " +
                        + prevYear + " " +
                        + cpiCurrentYear + " " +
                        + cpiPrevYear + " " +
                        + inflationRate + " " +
                        + adjustedAmount + " " 
                    )
                }
        
            // Printing adjusted amounts
            for (const [year, adjustedAmount] of Object.entries(inflationRates)) {
                console.log(`Adjusted amount for ${year}: ${adjustedAmount.toFixed(2)} units`);
            }
            
            return inflationRates;
        }
        console.log(InfNum(amount))
        console.log( Object.keys(data[1]), Object.values(InfNum(amount)).reverse())
        InfNum(amount)
        console.log(data)
        loadDiagram(Object.keys(data[1]), Object.values(InfNum(amount)).reverse());

    })
}









})



 */



import { getCountryAmount } from "../Init/fetchAll.js";
import { getDanmarkIndex } from "../Init/fetchDK.js";
import { loadDiagram } from "../Init/diagram.js";

document.getElementById('btn-submit').addEventListener('click', function calculate(event) {
    event.preventDefault();
    const amount = document.getElementById('amount').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const country = document.getElementById('country').value;
    let startYear = Number(startDate.slice(0, 4));
    let endYear = Number(endDate.slice(0, 4));
    let differentYearIndex = endYear - (startYear - 1);
    const endPrice = document.querySelector('#endPrice');

    if (country !== "DK") {
        getCountryAmount(amount, startDate, endDate, country, true)
            .then(data => {
                console.log("In", data);
                endPrice.value = data;
            });

        let arrayYears = [];
        for (let i = 0; i < differentYearIndex; i++) {
            arrayYears.push(startYear + i);
        }

        let arrayValues = [];
        let promises = arrayYears.map(year => {
            return getCountryAmount(amount, startDate, `${year}/1/1`, country, true)
                .then(data => {
                    let numberOnly = data.replace(/[^\d\.]/g, "");
                    arrayValues.push(numberOnly);
                    console.log(data, arrayValues);
                });
        });

        Promise.all(promises)
            .then(() => {
                console.log('All promises resolved', arrayValues);
                loadDiagram(arrayYears, arrayValues);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    } else {
        getDanmarkIndex(amount, startDate, endDate, country, true)
            .then(data => {
                if (data) {
                    console.log(data);
                    endPrice.value = `${data[0]} DKK`;
                    let inflationRates = data[1];

                    function InfNum(amount) {
                        let dataValues = Object.values(inflationRates);
                        let years = Object.keys(inflationRates);
                        console.log(years)
                        let adjustedAmounts = {};

                        amount = Number(amount);

                        for (let i = 1; i < years.length; i++) {
                            const year = years[i];
                            const prevYear = years[i - 1];
                            const cpiCurrentYear = inflationRates[year];
                            const cpiPrevYear = inflationRates[prevYear];
                            const inflationRate = ((cpiCurrentYear - cpiPrevYear) / cpiPrevYear) * 100;
                            const adjustedAmount = amount + (amount * inflationRate) / 100;
                            adjustedAmounts[year] = adjustedAmount.toFixed(2);
                        }

                        return adjustedAmounts;
                    }

                    let adjustedAmounts = InfNum(amount);
                    console.log(adjustedAmounts);
                    loadDiagram(Object.keys(adjustedAmounts), Object.values(adjustedAmounts));
                }
            });
    }
});