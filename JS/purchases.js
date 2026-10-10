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

let totalPurchasesDataArray = [];

const inserterDataInArray = () => {

    let obj = {
        supplier: supplierName.value,
        poNumber: poNumber.value,
        item: purchaseItem.value,
        quantity: purchasedQuantity.value,
        cost: purchaseCost.value,
        status: purchaseStatus.value
    }

    if (supplierName.value && poNumber.value && purchaseItem.value
        && purchasedQuantity.value && purchaseCost.value && purchaseStatus.value) {

            totalPurchasesDataArray.push(obj);

            localStorage.setItem("Purchases Data", JSON.stringify(totalPurchasesDataArray));

            dataDisplay();
            
    }

}

const tBody = document.querySelector("tbody");

const dataDisplay = () => {

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
        month = "Nav"
    }
    else if (date.getMonth() === 11) {
        month = "Dec"
    }

    
    let purhasesdatafromlocalstorage = localStorage.getItem("Purchases Data");
    if (purhasesdatafromlocalstorage) {
        totalPurchasesDataArray = JSON.parse(purhasesdatafromlocalstorage);
    }

    tBody = "";

    for (let i = 0; i < purhasesdatafromlocalstorage.length; i++) {
        const element = purhasesdatafromlocalstorage[i];
        
        tBody.innerHTML += `<tr>
                                <td class="sku-code">#PO-${element.poNumber}</td>
                                <td class="product-name"><strong>${element.supplier}</strong></td>
                                <td>${element.item}</td>
                                <td>${element.quantity}</td>
                                <td><strong>$${element.cost}</strong></td>
                                <td>${month} ${date.getDay()}, ${date.getFullYear()}</td>
                                <td><span class="badge status-${element.status}">${element.status}</span></td>
                                <td class="action-buttons">
                                    <button class="btn-icon" title="View Details">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                </td>
                            </tr>
        
        `
    }

}

purchaseForm.addEventListener("submit", (e) => {

    // Ye form ke default behaviour (page ko refresh kerna) ko rekta ha
    e.preventDefault();

    inserterDataInArray();
    modalCloser();

});



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
