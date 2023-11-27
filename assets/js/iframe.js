document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('message',function(event) {
        var message = JSON.parse(event.data);
        console.log(message.height);
    }, false);
});