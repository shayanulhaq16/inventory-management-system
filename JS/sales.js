import supabase from "./credentials.js"
import { errorShow } from "./global.js";

const modal = document.getElementById("salesModal");;
const new_sales = document.querySelector(".btn-primary");

const modalCloseSign = document.getElementById("closeSalesModal");
const modalCancelBtn = document.getElementById("cancelSalesBtn");


new_sales.addEventListener("click", () => {
    modal.classList.add("active");
});

const modalCloser = () => {
    modal.classList.remove("active");

    customerName.value = "";
    invoiceNumber.value = "";
    saleItem.value = "";
    saleQuantity.value = "";
    saleTotalAmount.value = "";
    saleStatus.value = "completed";
};


modalCloseSign.addEventListener("click", modalCloser);
modalCancelBtn.addEventListener("click", modalCloser);


const customerName = document.getElementById("customerName");
const invoiceNumber = document.getElementById("invoiceNo");
const saleItem = document.getElementById("saleItem");
const saleQuantity = document.getElementById("saleQty");
const saleTotalAmount = document.getElementById("saleTotal");
const saleStatus = document.getElementById("saleStatus");

const conformSaleBtn = document.querySelector(".btn-sales-modal");

const tBody = document.querySelector("tbody");

let allSalesData = [];


conformSaleBtn.addEventListener("click", async () => {

    if (customerName.value && invoiceNumber.value && saleItem.value &&
        saleQuantity.value && saleTotalAmount.value && saleStatus.value) {

        let data = {
            cName: customerName.value,
            invoice: invoiceNumber.value,
            item: saleItem.value,
            quantity: saleQuantity.value,
            amount: saleTotalAmount.value,
            status: saleStatus.value
        }

        

        allSalesData.push(data);

        localStorage.setItem("AllSalesData", JSON.stringify(allSalesData));

        modalCloser();

        allSalesDisplay();
    }



});


const allSalesDisplay = () => {

    let date = new Date();
    let month = "";

    if (date.getMonth() === 0) {
        month = "Jan"
    }
    else if (date.getMonth() === 1) {
        month = "Feb"
    }
    else if (date.getMonth() === 2) {
        month = "Mar"
    }
    else if (date.getMonth() === 3) {
        month = "Apr"
    }
    else if (date.getMonth() === 4) {
        month = "May"
    }
    else if (date.getMonth() === 5) {
        month = "Jun"
    }
    else if (date.getMonth() === 6) {
        month = "Jul"
    }
    else if (date.getMonth() === 7) {
        month = "Aug"
    }
    else if (date.getMonth() === 8) {
        month = "Sep"
    }
    else if (date.getMonth() === 9) {
        month = "Oct"
    }
    else if (date.getMonth() === 10) {
        month = "Nov"
    }
    else if (date.getMonth() === 11) {
        month = "Dec"
    }

    let localStorageGetData = localStorage.getItem("AllSalesData");
    if (localStorageGetData) {
        allSalesData = JSON.parse(localStorageGetData);
        console.log(allSalesData);
    }

    tBody.innerHTML = "";

    for (let i = 0; i < allSalesData.length; i++) {

        let itration = allSalesData[i];
        let status = itration.status;

        tBody.innerHTML += `<tr>
                                <td class="sku-code">#INV-${itration.invoice}</td>
                                <td class="product-name"><strong>${itration.cName}</strong></td>
                                <td>${itration.item}</td>
                                <td>${itration.quantity}</td>
                                <td><strong>$${itration.amount}</strong></td>
                                <td>${date.getDate()}, ${month}, ${date.getFullYear()}</td>
                                <td><span class="badge status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span ></td >
        <td class="action-buttons">
            <button class="btn-icon" title="View Details">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
        </td>
                            </tr >

    `

    }

}



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

        sidebarContainer.classList.remove("open");

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

    sidebarContainer.classList.add("open");
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

