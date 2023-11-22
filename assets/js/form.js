if (window === window.parent) {
  const value = new URLSearchParams(window.location.search).get('debug');
  if (value === null || value !== "true") {
    location.href = "https://rwrkstudio.com";
  }
}

let countryElement = document.getElementById("country");
let addressCountry = document.getElementById("addressCountry");
let totalCurrency = document.getElementById("totalCurrency");
let countryName = document.getElementById("countryName");
var currencySymbol = "£";

countryElement.addEventListener("change", (e) => {
  let value = countryElement.value;
  countryName.value = countryElement.selectedOptions[0].text;
  addressCountry.value = countryElement.selectedOptions[0].text;

  if (value === "53") {
    document.getElementById("row0").classList.remove("d-none");
    document.getElementById("row1").classList.remove("d-none");
    document.getElementById("row2").classList.remove("d-none");
    document.getElementById("otherSections").classList.add("d-none");
  } else {
    document.getElementById("row0").classList.add("d-none");
    document.getElementById("row1").classList.add("d-none");
    document.getElementById("row2").classList.add("d-none");
    document.getElementById("otherSections").classList.remove("d-none");
  }

  switch (value) {
    case "0":
    case "1":
    case "2":
    case "52":
      currencySymbol = "$";
      break;
    case "51": 
    case "53":
      currencySymbol = "£";
      break;
    default:
      currencySymbol = "€";
      break;
  }

  totalCurrency.innerText = currencySymbol;
  calcAmount();
});
let totalAmount = document.getElementById("totalAmount");

let lvAmount = document.getElementById("lvAmount");
let fendiAmount = document.getElementById("fendiAmount");
let chanelAmount = document.getElementById("chanelAmount");
let gucciAmount = document.getElementById("gucciAmount");
let hermesAmount = document.getElementById("hermesAmount");
let burberryAmount = document.getElementById("burberryAmount");

let submitButton = document.getElementById("submitButton");

const calcAmount = () => {
  var min = 0;
  var max = 0;

  var multiplier = 1.0;
  if (currencySymbol === "€") {
    multiplier = 1.1;
  } else if (currencySymbol === "$") {
    multiplier = 1.2;
  }

  const lvValue = lvAmount.value >= 0 && lvAmount.value <= 50 ? lvAmount.value : 0;
  min += lvValue * 10.0 * multiplier;
  max += lvValue * 20.0 * multiplier;

  const fendiValue = fendiAmount.value >= 0 && fendiAmount.value <= 50 ? fendiAmount.value : 0;
  min += fendiValue * 10.0 * multiplier;
  max += fendiValue * 20.0 * multiplier;

  const chanelValue = chanelAmount.value >= 0 && chanelAmount.value <= 50 ? chanelAmount.value : 0;
  min += chanelValue * 10.0 * multiplier;
  max += chanelValue * 20.0 * multiplier;

  const gucciValue = gucciAmount.value >= 0 && gucciAmount.value <= 50 ? gucciAmount.value : 0;
  min += gucciValue * 10.0 * multiplier;
  max += gucciValue * 20.0 * multiplier;

  const hermesValue = hermesAmount.value >= 0 && hermesAmount.value <= 50 ? hermesAmount.value : 0;
  min += hermesValue * 10.0 * multiplier;
  max += hermesValue * 20.0 * multiplier;

  const burberryValue = burberryAmount.value >= 0 && burberryAmount.value <= 50 ? burberryAmount.value : 0;
  min += burberryValue * 10.0 * multiplier;
  max += burberryValue * 20.0 * multiplier;

  totalAmount.value = min + " - " + max;

  let amountIsZero = lvAmount.value + fendiAmount.value + chanelAmount.value + gucciAmount.value + hermesAmount.value + burberryAmount.value === 0
  submitButton.disabled = amountIsZero;
}

const constrainUserInput = (id) => {
  let input = document.getElementById(id);
  if (input.value < 0 || input.value > 50) {
    input.value = 0;
  } else if (input.value !== Math.round(input.value)) {
    input.value = Math.round(input.value);
  }
}