import { errorShow } from "./global.js";
import supabase from "./credentials.js";

const modal = document.getElementById("purchaseModal");
const newPurchasesBtn = document.querySelector(".btn-primary");

const closePurchaseModalIcon = document.getElementById("closePurchaseModal");
const cancelPurchaseBtn = document.getElementById("cancelPurchaseBtn");


newPurchasesBtn.addEventListener("click", () => {
    modal.classList.add("active");
});


const modalCloser = () => {
    modal.classList.remove("active");

    supplierName.value = "";
    poNumber.value = "";
    purchaseItem.value = "";

    purchasedQuantity.value = "";
    purchaseCost.value = "";
    purchaseStatus.value = "";

};

closePurchaseModalIcon.addEventListener("click", modalCloser);
cancelPurchaseBtn.addEventListener("click", modalCloser);




const supplierName = document.getElementById("supplierName");
const poNumber = document.getElementById("poNumber");
const purchaseItem = document.getElementById("purchaseItem");
const purchasedQuantity = document.getElementById("purchaseQty");
const purchaseCost = document.getElementById("purchaseCost");
const purchaseStatus = document.getElementById("purchaseStatus");

const purchaseForm = document.getElementById("purchaseForm");


const inserterDataInArray = async () => {
    
    let obj = {
        po_number: poNumber.value,
        supplier_name: supplierName.value,
        product_name: purchaseItem.value,
        quantity: purchasedQuantity.value,
        price: (purchaseCost.value / purchasedQuantity.value).toFixed(2),
        total_price: purchaseCost.value,
        product_status: purchaseStatus.value
    }
    
    const { error } = await supabase
        .from('purchases')
        .insert(obj)
        
        if (error) {
            errorShow(error.message);
        }
        else {
            Swal.fire({
                title: "Account matched!",
            text: "Your Data Has Been Added Successfully!",
            icon: "success",
        })
    }
}

const tBody = document.querySelector("tbody");

const dataDisplay = async () => {

    const { data, error } = await supabase
    .from('purchases')
    .select()

    if (error) {
        errorShow(error.message)
    }
    else {
        console.log(data);



        
        tBody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            tBody.innerHTML += `<tr>
            <td class="sku-code">#PO-${element.po_number}</td>
            <td class="product-name"><strong>${element.supplier_name}</strong></td>
            <td>${element.product_name}</td>
            <td>${element.quantity}</td>
            <td><strong>$${element.total_price}</strong></td>
            <td>${element.created_at.slice(0, 10)}</td>
            <td><span class="badge status-${element.product_status}">${element.product_status}</span></td>
            <td class="action-buttons">
            <button class="btn-icon" title="View Details">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            </td>
            </tr>
                            
                            `
                        }
                        
                    }
}

dataDisplay();

purchaseForm.addEventListener("submit", async (e) => {
    
    // Ye form ke default behaviour (page ko refresh kerna) ko rekta ha
    e.preventDefault();
    
    
    inserterDataInArray();
    
    dataDisplay();
    
    modalCloser();
});



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


const logoElementOnCard = document.getElementById("logo");
const nameElementOnCard = document.getElementById("name");
const emailElementOnCard = document.getElementById("email");

async function userinfo() {

    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user || error) {
        errorShow(error);
    }
    else {

        // It is to be showed on dashboard not inside the user info card
        userLogo.innerHTML = user.identities[0].identity_data.full_name[0];

        logoElementOnCard.innerHTML = user.identities[0].identity_data.full_name[0];
        nameElementOnCard.innerHTML = user.identities[0].identity_data.full_name;
        emailElementOnCard.innerHTML = user.identities[0].email

    }

}

userinfo();