

document.getElementById('inflation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    

    const country = document.getElementById('country').value;
    const startYear = document.getElementById('start-year').value;
    const endYear = document.getElementById('end-year').value;
    const amount = parseFloat(document.getElementById('amount').value);
    console.error((`https://api.worldbank.org/v2/country/${country}/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`))
    fetch(`https://api.worldbank.org/v2/country/${country}/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`)
        .then(response => response.json())
        .then(data => {
            console.log(
                12
            )
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

                
                document.getElementById('result').innerText = `Justeret beløb i ${endYear} er ${adjustedAmount.toFixed(2)}`;
            } else {
                document.getElementById('result').innerText = 'Ingen tilgængelige data for det valgte land og de valgte år.';
            }








/* 
        let ArrayYears = data[1].reduce((acc, elem)=>{
            acc.push(elem.date)
            return acc
        },[])
        
        let ArrayValues = data[1].reduce((acc, elem)=>{
            acc.push(elem.value)
            return acc
        },[])
        
        console.log(ArrayYears)
        console.log(ArrayValues)

            let ctx = document.getElementById('myLineChart').getContext('2d');
            ctx.width = 500; // Нова ширина
            ctx.height = 300;
    let myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ArrayYears.reverse(),
            datasets: [{
                label:`${amount}`,
                data: ArrayValues.reverse(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {}
    });
 */
    



        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('result').innerText = 'Der opstod en fejl under hentning af data.';
        });
});
