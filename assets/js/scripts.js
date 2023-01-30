var isOpague = false;
var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
window.addEventListener('scroll', () => {
    let y = window.scrollY || window.pageYOffset;

    if (y > 0) {
        if (isOpague) {
            return;
        } else {
            isOpague = true;
        }
    } else {
        isOpague = false;
    }

    let backup = getComputedStyle(document.documentElement).getPropertyValue('--rwrk-nav-backup');
    document.documentElement.style.setProperty("--rwrk-nav-bg", backup + (isOpague ? "D9" : "00"));
    document.getElementById("navbar").style.backdropFilter = `blur(${isOpague ? "5px" : "0px"}) opague`;

    /*if (window.matchMedia) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.getElementById("dynamicLogo").src = `./assets/res/logo.png`;
        } else {
            document.getElementById("dynamicLogo").src = `./assets/res/logo${isOpague ? "_dark" : ""}.png`;
        }
    } else {
        document.getElementById("dynamicLogo").src = `./assets/res/logo${isOpague ? "_dark" : ""}.png`;
    }*/
    document.getElementById("dynamicLogo").src = `./assets/res/logo${isOpague ? "_dark" : ""}.png`;
});

$( "#navbar" ).loadWith( "./assets/parts/navbar.html" );
$( "#header" ).loadWith( "./assets/parts/header.html" );
$( "#poweredby" ).loadWith( "./assets/parts/poweredby.html" );
$( "#summary" ).loadWith( "./assets/parts/summary.html" );
$( "#faq" ).loadWith( "./assets/parts/faq.html" );
$( "#benefits" ).loadWith( "./assets/parts/benefits.html" );
$( "#contact" ).loadWith( "./assets/parts/contact.html" );
$( "#footer" ).loadWith( "./assets/parts/footer.html" );
$( "#aboutus" ).loadWith( "./assets/parts/aboutus.html" );
$("#editorial").loadWith("./assets/parts/editorial.html");
$("#blog-header").loadWith("./assets/parts/blog-header.html");

document.dispatchEvent(new Event("onFinishLoad", {bubbles: true}));