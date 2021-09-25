// NAVBAR
const documentBody = document;
const navbarMoreBtn = document.getElementById("navbar-moreBtn");
const navbarMoreButton = document.getElementById("navbar-moreButton");
const navbarMoreCtr = document.getElementById("navbar-moreContainer");

// navbarMoreContainer
navbarMoreBtn.addEventListener('click', function() {
    navbarMoreCtr.classList.toggle("show");
    navbarMoreButton.classList.toggle("rotate");
});
documentBody.addEventListener('click', function(e) {
    if (e.target.className == "navbar-moreContainerDiv" || e.target.className == "navbar-moreContainerElementDiv" || e.target.className == "navbar-right-moreBtnDiv" || e.target.className == "[object SVGAnimatedString]") {
        // Do nothing
    } else {
        navbarMoreCtr.classList.remove("show");
        navbarMoreButton.classList.remove("rotate");
    }
});