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

            console.log(totalPurchasesDataArray);
            
    }

}

purchaseForm.addEventListener("submit", (e) => {

    e.preventDefault();
    inserterDataInArray();
    modalCloser();
    
});