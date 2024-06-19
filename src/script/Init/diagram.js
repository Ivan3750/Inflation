

let myLineChart;

export function loadDiagram(ArrayYears, ArrayValues) {
    let canvas = document.getElementById('myLineChart');
    if (canvas) {
        let ctx = canvas.getContext('2d');
        ctx.canvas.width = null;
        ctx.canvas.height = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Destroy the existing chart if it exists
        if (myLineChart) {
            myLineChart.destroy();
        }
    }

    console.log(ArrayYears);
    console.log(ArrayValues);

    let ctx = document.getElementById('myLineChart').getContext('2d');
    ctx.width = 500; // Нова ширина
    ctx.height = 300;

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ArrayYears, // Create a copy and reverse it
            datasets: [{
                label: "Inflation statistik",
                data: ArrayValues, // Create a copy and reverse it
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {}
    });
}
