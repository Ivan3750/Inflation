const country = document.querySelector('#country');
const valuta = document.querySelector('.valuta');

fetch("../data/valuta.json")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        country.addEventListener("change", () => {
            const findCountry = data.find(element => {
                return element.country === country.value;
            });
            if (findCountry) {
                valuta.innerHTML = findCountry.currency;
            } else {
                valuta.innerHTML = "Currency not found for selected country";
            }
        });
    });
