document.getElementById('inflation-form').addEventListener('submit', function(event) {

const country = document.getElementById('country').value;
const startYear = document.getElementById('start-year').value;
const endYear = document.getElementById('end-year').value;
const amount = parseFloat(document.getElementById('amount').value);

fetch(`https://api.worldbank.org/v2/country/${country}/indicator/FP.CPI.TOTL?date=${startYear}:${endYear}&format=json`)
    .then(response => response.json())
    .then(data => {
        let canvas = document.getElementById('myLineChart');
        if (canvas) {
            let ctx = canvas.getContext('2d');
            ctx.canvas.width = null;
            ctx.canvas.height = null;
        }
        
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
                label: "Inflation statistik",
                data: ArrayValues.reverse(),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {}
    });

    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerText = 'Der opstod en fejl under hentning af data.';
    });

});