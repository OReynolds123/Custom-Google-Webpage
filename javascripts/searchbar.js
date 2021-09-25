// SEARCHBOX
const barSearchBar = document.getElementById("barOuterDiv");
const barSearchBox = document.getElementById("barSearchBox");
var searchActive = true;

// searchBoxEnter
barSearchBox.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        var q = barSearchBox.value;
        event.preventDefault();
        window.location.replace('http://google.com/search?q=' + q);
    }
});

// barSearchBoxClick
function barSearchBoxActive() {
    barSearchBar.classList.add("bar-outerDivShadow");
    searchActive = true;
}
function barSearchBoxInactive() {
    barSearchBar.classList.remove("bar-outerDivShadow");
    searchActive = false;
}