mobiscroll.setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

var inst = mobiscroll.select('#demo-country-picker', {
  display: 'anchored',
  filter: true,
  itemHeight: 40,
  renderItem: function (item) {
    return (
      '<div class="md-country-picker-item">' +
      '<img class="md-country-picker-flag" src="https://img.mobiscroll.com/demos/flags/' +
      item.data.value +
      '.png" />' +
      item.display +
      '</div>'
    );
  },
});

mobiscroll.getJson('https://trial.mobiscroll.com/content/countries.json', function (resp) {
  var countries = [];
  for (var i = 0; i < resp.length; ++i) {
    var country = resp[i];
    countries.push({ text: country.text, value: country.value });
  }
  inst.setOptions({ data: countries });
});
  