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

conformSaleBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let obj = {
        invoice_number: Number(invoiceNumber.value),
        customer_name: customerName.value,
        product_name: saleItem.value,
        quantity: Number(saleQuantity.value),
        price: (saleTotalAmount.value / saleQuantity.value).toFixed(2),
        total_price: saleTotalAmount.value,
        product_status: saleStatus.value
    }

    modalCloser();

    allSalesDisplay();



    const { error } = await supabase
        .from('sales')
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



});


const allSalesDisplay = async () => {

    const { data, error } = await supabase
        .from('sales')
        .select()

    if (error) {
        errorShow(error.message)
    }
    else {
        console.log(data);

        tBody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {

            let itration = data[i];

            tBody.innerHTML += `<tr>
                                <td class="sku-code">#INV-${itration.invoice_number}</td>
                                <td class="product-name"><strong>${itration.customer_name}</strong></td>
                                <td>${itration.product_name}</td>
                                <td>${itration.quantity}</td>
                                <td><strong>$${itration.total_price}</strong></td>
                                <td>${date.getDate()}, ${month}, ${date.getFullYear()}</td>
                                <td><span class="badge status-${itration.product_status}">${itration.product_status}</span ></td >
        <td class="action-buttons">
            <button class="btn-icon" title="View Details">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
        </td>
                            </tr >

    `

        }

    }


    allSalesDisplay();



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
}