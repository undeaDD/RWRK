window.onload = function() {
    "use strict";
    var elements = document.getElementsByTagName("*");
    var i;

    function fragment(el, url) {
        var localTest = /^(?:file):/;
        var xmlhttp = new XMLHttpRequest();
        var status = 0;

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4) {
                status = xmlhttp.status;
            }
            if (localTest.test(location.href) && xmlhttp.responseText) {
                status = 200;
            }
            if (xmlhttp.readyState === 4 && status === 200) {
                el.outerHTML = xmlhttp.responseText;
            }
        };

        try {
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        } catch (err) {
            console.log(err)
        }
    }

    for (i in elements) {
        if (elements[i].hasAttribute && elements[i].hasAttribute("data-include")) {
            fragment(elements[i], elements[i].getAttribute("data-include"));
        }
    }

    setTimeout(() => {
        document.dispatchEvent(new Event("onFinishLoad", {bubbles: true}));
    }, 1);
};