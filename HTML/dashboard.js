const sidebarContainer = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#menuBtn");


document.addEventListener("click", (event) => {


    if (menuBtn.style.display !== "block" &&
        sidebarContainer.style.display !== "none") {
        // event.target tells us which element the user actually clicked
        // .contains() checks if that clicked element is inside the sidebar
        // ! means NOT, so this checks if the click happened outside the sidebar
        if (!sidebarContainer.contains(event.target) && !menuBtn.contains(event.target)) {
            menuBtn.style.display = "block";
            sidebarContainer.style.display = "none";
            console.log("Success");
        }

    }
});

menuBtn.addEventListener("click", (event) => {

    // Prevent this click from bubbling up to the document's click handler
    event.stopPropagation();

    menuBtn.style.display = "none";
    sidebarContainer.style.display = "flex";

});

