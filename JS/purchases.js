const modal = document.getElementById("purchaseModal");
const newPurchasesBtn = document.querySelector(".btn-primary");

const closePurchaseModalIcon = document.getElementById("closePurchaseModal");
const cancelPurchaseBtn = document.getElementById("cancelPurchaseBtn");


newPurchasesBtn.addEventListener("click", () => {
    modal.classList.add("active");
});


const modalCloser = () => {
    modal.classList.remove("active");
};

closePurchaseModalIcon.addEventListener("click", modalCloser);
cancelPurchaseBtn.addEventListener("click", modalCloser);