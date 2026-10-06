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






const itemName = document.getElementById("itemName");
const itemSku = document.getElementById("itemSku");
const itemCategory = document.getElementById("itemCategory");
const itemPrice = document.getElementById("itemPrice");
const itemQuantity = document.getElementById("itemQuantity");
const itemStatus =  document.getElementById("itemStatus");

const saveItemBtn = document.querySelector(".btn-primary-modal");



let allStockDataArray = [];

const inserterdataInArray = () => {

    if(itemName.value && itemSku.value && itemCategory.value && itemPrice.value && 
        itemQuantity.value && itemStatus.value
    ){

        
        let obj = {
        item: itemName.value,
        skuCode: itemSku.value,
        category: itemCategory.value,
        price: itemPrice.value,
        quantity: itemQuantity.value,
        status: itemStatus.value
    }

    allStockDataArray.push(obj);

    localStorage.setItem("allScockData", JSON.stringify(allStockDataArray));


    scockdataDisplay();
    
    closer_module();

    // itemName.value = "";
    // itemSku.value = "";
    // itemCategory.value = "";
    // itemPrice.value = "";
    // itemQuantity.value = "";
    // itemStatus.value = "";
}

}

const tBody = document.querySelector("tbody");

const scockdataDisplay = () => {

    let data = localStorage.getItem("allScockData");
    if (data) {
        allStockDataArray = JSON.parse(data);
    }

    tBody.innerHTML = "";

    for (let i = 0; i < allStockDataArray.length; i++) {
       
        let itration = allStockDataArray[i];

      

        

        tBody.innerHTML += `

                             <tr>
                                <td class="product-name"><strong>${itration.item}</strong></td>
                                <td class="sku-code">SKU-${itration.skuCode}</td>
                                <td>${itration.category}</td>
                                <td>$${itration.price}</td>
                                <td><strong>${itration.quantity}</strong></td>
                                <td><span class="badge ${itration.status}">${itration.status}</span></td>
                                <td class="action-buttons">
                                    <button class="btn-icon" title="Edit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button class="btn-icon danger" title="Delete" onclick="Deleter('${i}')">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path
                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                            </path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
        
        `
        
    }



}

saveItemBtn.addEventListener("click", inserterdataInArray);


const Deleter = (item) => {

    if (confirm("Do you want to delete it?")) {

        allStockDataArray.splice(item, 1);
        
    }

    localStorage.setItem("allScockData", JSON.stringify(allStockDataArray));


    scockdataDisplay();


}





// Delete ka logic
// edit ki logic