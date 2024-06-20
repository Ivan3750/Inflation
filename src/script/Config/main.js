/* IMPORTS */
import { getCountryAmount } from "../Init/fetchAll.js";
import { getDanmarkIndex } from "../Init/fetchDK.js";
import { loadDiagram } from "../Init/diagram.js";
import { getProct } from "../procentFetch.js";

let submitBTN = document.querySelector('#btn-submit');
let amount = document.getElementById('amount').value;
let startDate = document.getElementById('startDate').value;
let endDate = document.getElementById('endDate').value;
let country = document.getElementById('country').value;
let type = document.getElementById('type').value;
let startYear = Number(startDate.slice(0, 4));
let endYear = Number(endDate.slice(0, 4));
const endPrice = document.querySelector('#endPrice');


submitBTN.addEventListener('click', (e)=>{
    e.preventDefault();
    amount = document.getElementById('amount').value;
    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById('endDate').value;
    country = document.getElementById('country').value;
    type = document.getElementById('type').value;
    startYear = Number(startDate.slice(0, 4));
    endYear = Number(endDate.slice(0, 4));
    

    if(country !== "DK"){ // NOT DK
        getCountryAmount(amount, startDate, endDate, country, true)
            .then(data => {
                showData(data, false)
                if(type === "procent"){
                    getProct(startDate, endDate, country)
                }else{
                    getDiagramData(false)
                }
        });
        
    }else{ //DK
        getDanmarkIndex(amount, startDate, endDate, country, true)
            .then(data => {
                showData(data[0], true)
                if(type === "procent"){
                    getProct(startDate, endDate, country)
                }else{
                    getDiagramData(true)
                }
        });
    }
})






const showData = (value, isDK)=>{
    console.log(value)
    if(isDK){
        endPrice.value = value + " DKK"
    }else{
        endPrice.value = value
    }
}

const getDiagramData = async (isDK) => {
    let arrayValues = [];
    let arrayYears = [];
    let differentYearIndex = endYear - (startYear - 1); 

    for (let i = 0; i < differentYearIndex; i++) {
        arrayYears.push(startYear + i);
    }
    let promises; 
    if(isDK){
        promises = arrayYears.map(year => {
            return getDanmarkIndex(amount, startDate, `${year}/1/1`, country, true)
                .then(data => {
                    arrayValues.push(data[0])
                });
        });
    }else{
        promises = arrayYears.map(year => {
            return getCountryAmount(amount, startDate, `${year}/1/1`, country, true)
                .then(data => {
                    let numberOnly = data.replace(/[^\d\.]/g, "");
                    arrayValues.push(numberOnly);
                });
        });
    }
    

    await Promise.all(promises);

    console.log(arrayValues, arrayYears);
    await loadDiagram(arrayYears, arrayValues);
};



