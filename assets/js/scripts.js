document.addEventListener("onFinishLoad", function() {
    var isOpague = false;
    window.addEventListener('scroll', () => {
        closeMenu();
        let y = window.scrollY || window.pageYOffset;
        if (y > 20) {
            if (isOpague) {
                return;
            } else {
                isOpague = true;
            }
        } else {
            isOpague = false;
        }

        document.getElementById("navbar").style.backgroundColor = `rgba(255, 255, 255, ${isOpague ? "0.85" : "0"})`;
        document.getElementById("navbar").style.backdropFilter = `blur(${isOpague ? "5px" : "0px"})`;
        document.styleSheets[1]["cssRules"][3].style["filter"] = `invert(${isOpague ? "0%" : "100%"})`;
    });

    document.addEventListener("click", (event) => {
        closeMenu();
    });
});

function closeMenu() {
    const nav = document.getElementById("navbarTogglerDemo01");
    if (nav.classList.contains('show')) {
        document.getElementById("toggler").click();
    }
}

function toggleNavBg() {
    document.getElementById("navbar").style.backgroundColor = `rgba(255, 255, 255, 0.85)`;
    document.getElementById("navbar").style.backdropFilter = `blur("5px")`;
}

$( "#navbar" ).loadWith( "./assets/parts/navbar.html" );
$( "#header" ).loadWith( "./assets/parts/header.html" );
$( "#poweredby" ).loadWith( "./assets/parts/poweredby.html" );
$( "#summary" ).loadWith( "./assets/parts/summary.html" );
$( "#faq" ).loadWith( "./assets/parts/faq.html" );
$( "#benefits" ).loadWith( "./assets/parts/benefits.html" );
$( "#contact" ).loadWith( "./assets/parts/contact.html" );
$( "#footer" ).loadWith( "./assets/parts/footer.html" );

document.dispatchEvent(new Event("onFinishLoad", {bubbles: true}));