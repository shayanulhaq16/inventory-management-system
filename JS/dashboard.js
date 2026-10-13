import supabase from "./credentials.js"
import { errorShow } from "./global.js";

const sidebarContainer = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#menuBtn");

const userContainer = document.querySelector(".user-container");
const userLogo = document.querySelector(".avatar");

let flagForUserInfo = false;


// Run this function whenever the user clicks anywhere on the page
document.addEventListener("click", (event) => {

    // event.target tells us which element the user actually clicked
    // .contains() checks if that clicked element is inside the sidebar
    // ! means NOT, so this checks if the click happened outside the sidebar
    // menuBtn.contains() checks if the click happened inside the menu button
    if (
        !sidebarContainer.contains(event.target) &&
        !menuBtn.contains(event.target) &&
        !userLogo.contains(event.target) &&
        !userContainer.contains(event.target)
    ) {

        // Show the menu button so the user can open the sidebar again
        menuBtn.style.display = "block";

        // Hide the sidebar because the user clicked outside it
        sidebarContainer.style.display = "none";


        userContainer.classList.remove("user-container-active");
        flagForUserInfo = false;
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

userLogo.addEventListener("click", () => {
    if (flagForUserInfo === false) {
        userContainer.classList.add("user-container-active");
        flagForUserInfo = true;
    } else {
        userContainer.classList.remove("user-container-active");
        flagForUserInfo = false;
    }
})

const nameElementOnCard = document.getElementById("name");
const emailElementOnCard = document.getElementById("email");
const logoElementOnCard = document.getElementById("logo");

async function userInfo() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        errorShow(error.message)
    }
    else {

        // It is to show on dashboard not inside the user card info
        userLogo.innerHTML = user.identities[0].identity_data.full_name[0];

        logoElementOnCard.innerHTML = user.identities[0].identity_data.full_name[0];
        nameElementOnCard.innerHTML = user.identities[0].identity_data.full_name;
        emailElementOnCard.innerHTML = user.identities[0].email;

    }
    console.log("Success")

}

userInfo();

