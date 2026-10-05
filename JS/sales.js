const modal = document.getElementById("salesModal");;
const new_sales = document.querySelector(".btn-primary");

const modalCloseSign = document.getElementById("closeSalesModal");
const modalCancelBtn = document.getElementById("cancelSalesBtn");


new_sales.addEventListener("click", () => {
    modal.classList.add("active");
});

const modalCloser = () => {
    modal.classList.remove("active");
};


modalCloseSign.addEventListener("click", modalCloser);
modalCancelBtn.addEventListener("click", modalCloser);