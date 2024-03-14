let selected_currency = document.getElementById('currency1');
let required_currency = document.getElementById('currency2');
let selected_amount = document.getElementById('amount');
let result = document.getElementById('final-amount');
const convert = document.getElementById('btn');

const api = async () => {
  const response = await fetch('https://api.frankfurter.app/currencies');
  const data = await response.json();
  currencies(data);
}

const currencies = (data) => {
  let values = Object.entries(data);
  for (let i = 0; i < values.length; i++) {
    let options = `<option value="${values[i][0]}">${values[i][0]}</option>`;
    selected_currency.innerHTML += options;
    required_currency.innerHTML += options;
  }
}

convert.addEventListener("click", () => {
  if (selected_currency.value == required_currency.value) {
    alert("Please choose different currencies");
  } else {
    let val1 = selected_currency.value;
    let val2 = required_currency.value;
    let amount = selected_amount.value;
    conversion(val1, val2, amount);
  }
});

const conversion = async (val1, val2, amount) => {
  const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${val1}&to=${val2}`);
  const data = await response.json();
  result.value = Object.values(data.rates)[0];
}

api();
