var form = document.getElementById('contactForm');
var submitButton = document.getElementById('contactFormButton');
var email = document.getElementById('email');

function processForm(e) {
    if (!email.value) { return false; }
    e.preventDefault();
    submitButton.disabled = true;

    var oReq = new XMLHttpRequest();
    var from = encodeURIComponent(email.value);
    oReq.open("POST", "https://deltasiege.de/api/spreadsheet?email=" + from);
    oReq.send();

    return false;
}

if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}