var isOpague = false;

window.addEventListener('scroll', () => {
    let y = window.scrollY || window.pageYOffset;
    isOpague = y > 0;

    let backup = getComputedStyle(document.documentElement).getPropertyValue('--rwrk-nav-backup');
    document.documentElement.style.setProperty("--rwrk-nav-bg", backup + (isOpague ? "D9" : "00"));
    document.documentElement.style.setProperty("--rwrk-nav-item-color", isOpague ? "black" : "white");
    document.getElementById("navbar").style.backdropFilter = `blur(${isOpague ? "5px" : "0px"}) opague`;
    document.getElementById("dynamicLogo").src = `./assets/res/logo${isOpague ? "_dark" : ""}.webp`;
});

$( "#navbar" ).load( "./assets/parts/navbar.html" );
$( "#header" ).load( "./assets/parts/header.html" );
$( "#poweredby" ).load( "./assets/parts/poweredby.html" );
$( "#summary" ).load( "./assets/parts/summary.html" );
$( "#faq" ).load( "./assets/parts/faq.html" );
$( "#benefits" ).load( "./assets/parts/benefits.html" );
$( "#contact" ).load( "./assets/parts/contact.html" );
$( "#footer" ).load( "./assets/parts/footer.html" );
$( "#aboutus" ).load( "./assets/parts/aboutus.html" );
$( "#editorial" ).load("./assets/parts/editorial.html");
$( "#blog-header" ).load("./assets/parts/blog-header.html");
$( "#blog-body" ).load("./assets/parts/blog-body.html");

document.dispatchEvent(new Event("onFinishLoad", {bubbles: true}));