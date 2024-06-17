
export const getCountryAmount = (amount,startDate, endDate, country, isShow) => {

    const url = `https://www.statbureau.org/get-data-json?jsoncallback=?&country=${encodeURIComponent(country)}&start=${encodeURIComponent(startDate)}&end=${encodeURIComponent(endDate)}&amount=${encodeURIComponent(amount)}&format=true`;
console.log(url)
   return fetch(`https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?&country=${country}&start=${startDate}&end=${endDate}&amount=${amount}&format=true`)
        .then(response => response.text())
        .then(text => {
            
            // Log the parameters
/*             let json = text.replace(/^\?\(/, '').replace(/\);$/, '');
 */            let json = text.slice(3,text.length-2)
 return json;
})
.then(data => {
    if(isShow){
        console.log(data)
         return data;
    }
})
.catch(error => console.error('Error:', error));
}
