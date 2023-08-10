var form = document.getElementById('contactForm');
var submitButton = document.getElementById('contactFormButton');

var email = document.getElementById('email');

function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    submitButton.disabled = true;

    var oReq = new XMLHttpRequest();
    var from = encodeURIComponent(email.value);
    oReq.open("GET", "https://api.telegram.org/bot5362070946:AAEDRHut3Da_nl0hhBj-updiSI3wkBxR3zg/sendMessage?chat_id=-1001591294571&text=<b>Notify me:</b>%20" + from + "&parse_mode=html");
    oReq.send();

    return false;
}

if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}