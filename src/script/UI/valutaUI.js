const country = document.querySelector('#country');
const valuta = document.querySelector('.valuta');



fetch("../data/valuta.json")
    .then(response => response.json())
    .then(data =>{
        country.addEventListener("click",()=>{
            let findElem = countries.find((elem)=>{
                if(elem.name == country.value){
                    return elem
                }
            })
            valuta.innerHTML = findElem
        })
    })
