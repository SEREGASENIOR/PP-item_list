document.addEventListener("DOMContentLoaded", () => {
    const shoppingList = document.getElementById("shopping-list");

    // Функция для добавления нового элемента
    window.addItem = function (title, quantity) {
        const template = document.getElementById("item_template");
        const newItem = template.content.cloneNode(true);

        const itemTitle = newItem.querySelector(".item_title");
        const itemQuantity = newItem.querySelector(".item_quantity");
        const itemCheckbox = newItem.querySelector(".item-checkbox");

        itemTitle.textContent = title;
        itemQuantity.textContent = ` - ${quantity}`;

        // Логика для изменения стиля при отметке товара
        itemCheckbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                itemTitle.style.textDecoration = "line-through";
                itemTitle.style.color = "gray";
            } else {
                itemTitle.style.textDecoration = "none";
                itemTitle.style.color = "black";
            }
        });

        shoppingList.appendChild(newItem);
    };

    // Очистка списка
    window.clearItems = function () {
        shoppingList.innerHTML = "";
    };
});
