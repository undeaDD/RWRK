var form = document.getElementById('contactForm');
var submitButton = document.getElementById('contactFormButton');
var email = document.getElementById('email');

var formGroup = document.getElementById('formGroup');
var success = document.getElementById('successToast');

function processForm(e) {
    if (!email.value) { return false; }
    e.preventDefault();
    submitButton.disabled = true;

    var oReq = new XMLHttpRequest();
    var from = encodeURIComponent(email.value);
    oReq.open("POST", "https://deltasiege.de/api/spreadsheet?email=" + from);
    oReq.send();

    formGroup.style.display = "none";
    success.style.display = "inherit";
    return false;
}

if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}