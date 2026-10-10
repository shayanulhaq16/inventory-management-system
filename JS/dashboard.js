
const sidebarContainer = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#menuBtn");

// Run this function whenever the user clicks anywhere on the page
document.addEventListener("click", (event) => {

    // event.target tells us which element the user actually clicked
    // .contains() checks if that clicked element is inside the sidebar
    // ! means NOT, so this checks if the click happened outside the sidebar
    // menuBtn.contains() checks if the click happened inside the menu button
    if (
        !sidebarContainer.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        // Show the menu button so the user can open the sidebar again
        menuBtn.style.display = "block";

        // Hide the sidebar because the user clicked outside it
        sidebarContainer.style.display = "none";
    }
});

// Run this function whenever the user clicks the menu button
menuBtn.addEventListener("click", (event) => {

    // Stop this click from reaching the document click handler
    event.stopPropagation();

    // Hide the menu button when opening the sidebar
    menuBtn.style.display = "none";

    // Show the sidebar using flex layout
    sidebarContainer.style.display = "flex";
});
