document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('message',function(event) {
        if (event.data) {
            document.getElementById("apiFrame").style.height = event.data + "px";
        }
    }, false);
});