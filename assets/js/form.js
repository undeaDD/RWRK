if (window === window.parent) {
  location.href = "https://rwrkstudio.com";
}

let countryElement = document.getElementById("country");
let addressCountry = document.getElementById("addressCountry");

countryElement.addEventListener("change", () => {
  let value = countryElement.value;
  addressCountry.value = value;
  if (value === "3") {
    document.getElementById("row1").classList.remove("d-none");
    document.getElementById("row2").classList.remove("d-none");
    document.getElementById("otherSections").classList.add("d-none");
  } else {
    document.getElementById("row1").classList.add("d-none");
    document.getElementById("row2").classList.add("d-none");
    document.getElementById("otherSections").classList.remove("d-none");
  }
});

let totalAmount = document.getElementById("totalAmount");
let totalQuantity = document.getElementById("totalQuantity");
totalQuantity.addEventListener("change", calcAmount);

const calcAmount = () => {
  totalAmount.value = totalQuantity.value * 10 + " - " + totalQuantity.value * 20;
}