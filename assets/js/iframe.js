document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('message',function(event) {
        console.log(event);
    }, false);
});