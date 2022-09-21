var isOpague = false;
window.addEventListener('scroll', () => {
    closeMenu();
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
    document.documentElement.style.setProperty("--rwrk-nav-bg", backup + (isOpague ? "D9" : "ff"));
    document.getElementById("navbar").style.filter = `opacity()`;
    document.getElementById("navbar").style.backdropFilter = `blur(${isOpague ? "5px" : "0px"}) opague`;
    document.getElementsByClassName("dynamicColor")[0].src = `./assets/res/logo${isOpague ? "_dark" : ""}.png`;
});

document.addEventListener("click", (event) => {
    closeMenu();
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
    document.styleSheets[1]["cssRules"][3].style["filter"] = `invert(0%)`;
}

$( "#navbar" ).loadWith( "./assets/parts/navbar.html" );
$( "#header" ).loadWith( "./assets/parts/header.html" );
$( "#poweredby" ).loadWith( "./assets/parts/poweredby.html" );
$( "#summary" ).loadWith( "./assets/parts/summary.html" );
$( "#faq" ).loadWith( "./assets/parts/faq.html" );
$( "#benefits" ).loadWith( "./assets/parts/benefits.html" );
$( "#contact" ).loadWith( "./assets/parts/contact.html" );
$( "#footer" ).loadWith( "./assets/parts/footer.html" );
$( "#aboutus" ).loadWith( "./assets/parts/aboutus.html" );

document.dispatchEvent(new Event("onFinishLoad", {bubbles: true}));