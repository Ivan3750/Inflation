var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';

$('#calc').on('click', function calculate() {
    $.getJSON(apiUrl, {
        country: 'ukraine',
        start: $('#startDate').val(),
        end: $('#endDate').val(),
        amount: $('#startPrice').val(),
        format: true
    })
      .done(function (data) {
          $('#endPrice').val(data);
      });
});
/* var apiUrl = 'https://www.statbureau.org/calculate-inflation-price-jsonp?jsoncallback=?';
 */
/* var apiUrl = 'https://www.statbureau.org/get-denominations-jsonp?jsoncallback=?';
*/
 var apiUrl = 'https://www.statbureau.org/get-data-json?jsoncallback=?';
document.getElementById('calc').addEventListener('click', function calculate() {
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    var startPrice = document.getElementById('startPrice').value;

    fetch(`${apiUrl}&country=ukraine&start=${startDate}&end=${endDate}&amount=${startPrice}&format=true`)
    fetch(`https://www.statbureau.org/${TYPE_OF_FETCH}?jsoncallback=?&country=ukraine&start=${startDate}&end=${endDate}&amount=${amount}&format=true`)

        .then(response => response.text())
        .then(text => {
            console.log(`${apiUrl}&country=ukraine&start=${startDate}&end=${endDate}&amount=${startPrice}&format=true`)
            // Removing the JSONP callback to parse the JSON correctly
            var json = text.replace(/^\?\(/, '').replace(/\);$/, '');
            return JSON.parse(json);
        })
        .then(data => {
            document.getElementById('endPrice').value = data;
        })
        .catch(error => console.error('Error:', error));
});
