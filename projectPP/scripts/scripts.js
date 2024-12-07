function addItem() {
    const itemNameInput = document.getElementById("item-name");
    const itemQuantityInput = document.getElementById("item-quantity");

    const itemName = itemNameInput.value.trim();
    const itemQuantity = parseInt(itemQuantityInput.value, 10);

    if (!itemName) {
        alert("Введите название товара!");
        return;
    }

    if (!itemQuantity || itemQuantity <= 0) {
        alert("Введите корректное количество товара!");
        return;
    }

    const template = document.getElementById("item_template");
    const newItem = template.content.cloneNode(true);

    newItem.querySelector(".item_title").textContent = itemName;
    newItem.querySelector(".item_quantity").textContent = `Количество: ${itemQuantity}`;

    const shoppingList = document.getElementById("shopping-list");
    shoppingList.appendChild(newItem);

    itemNameInput.value = "";
    itemQuantityInput.value = "";
}