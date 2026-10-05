const addItem = document.querySelector(".btn-primary");
const modal = document.getElementById("stockModal");

const cancel_btn = document.getElementById("cancelStockBtn");
const close_icon = document.getElementById("closeStockModal");



addItem.addEventListener("click", () => {
    modal.classList.add("active")
});


const closer_module = () => {
    modal.classList.remove("active")
};

cancel_btn.addEventListener("click", closer_module);
close_icon.addEventListener("click", closer_module);