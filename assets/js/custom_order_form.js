let firstnameElement = document.getElementById("firstname");
let lastnameElement = document.getElementById("lastname");

let countryElement = document.getElementById("country");

let emailElement = document.getElementById("email");
let phoneElement = document.getElementById("phone");
let instagramElement = document.getElementById("instagram");

let notesElement = document.getElementById("notes");

let productsElements = document.getElementById("products");
let referencesElements = document.getElementById("references");

let submitButton = document.getElementById("submitButton");

const toggleSubmitButton = () => {
  // TODO
  submitButton.disabled = Math.random() < 0.5;
}