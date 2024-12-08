document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.getElementById("item-list");

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");

    const categories = {
        vegetables: { icon: "image/Овощи 1.jpg" },
        drinks: { icon: "image/Напитки 3.jpg" },
        plumbing: { icon: "image/Сантехника 1.jpg" },
        fastfood: { icon: "image/Фастфуд 1.jpg" },
        Personal_hygiene: { icon: "image/Личная гигиена 1.jpg" },
        furniture: { icon: "image/Мебель 2.jpg" },
        techniques: { icon: "image/Техника 1.jpg" },
        medicine: { icon: "image/Медицина 1.jpg" },
    };

    // Проверяем, существует ли категория
    if (!categories[category]) {
        alert("Категория не найдена!");
        goToMain();
    }

    // Устанавливаем иконку категории
    const categoryIcon = document.getElementById("category-icon");
    if (categoryIcon) {
        categoryIcon.src = categories[category].icon;
    } else {
        console.error("Элемент с id='category-icon' не найден.");
    }

    // Инициализируем список сохранённых товаров
    let savedItems = JSON.parse(localStorage.getItem(category)) || [];

    // Функция для отображения товаров
    function renderItems() {
        if (!itemList) return;

        itemList.innerHTML = ""; // Очищаем список перед обновлением

        savedItems.forEach((item, index) => {
            const template = document.getElementById("item_template");
            const newItem = template.content.cloneNode(true);

            const itemTitle = newItem.querySelector(".item_title");
            const itemQuantity = newItem.querySelector(".item_quantity");
            const itemCheckbox = newItem.querySelector(".item-checkbox");

            itemTitle.textContent = item.name;
            itemQuantity.textContent = ` - ${item.quantity}`;

            // Логика для отметки как купленного
            itemCheckbox.addEventListener("change", (event) => {
                if (event.target.checked) {
                    itemTitle.style.textDecoration = "line-through";
                    itemTitle.style.color = "gray";
                } else {
                    itemTitle.style.textDecoration = "none";
                    itemTitle.style.color = "black";
                }
            });

            // Добавляем кнопку удаления
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Удалить";
            deleteButton.addEventListener("click", () => deleteItem(index));
            newItem.querySelector("li").appendChild(deleteButton);

            itemList.appendChild(newItem);
        });
    }

    // Функция для добавления нового товара
    window.addItem = function () {
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

        const newItem = {
            name: itemName,
            quantity: itemQuantity,
        };

        savedItems.push(newItem);

        localStorage.setItem(category, JSON.stringify(savedItems));

        renderItems();

        itemNameInput.value = "";
        itemQuantityInput.value = "";
    };

    // Функция для удаления товара
    function deleteItem(index) {
        savedItems.splice(index, 1);
        localStorage.setItem(category, JSON.stringify(savedItems));
        renderItems();
    }

    // Очистить весь список
    window.clearItems = function () {
        savedItems = [];
        localStorage.setItem(category, JSON.stringify(savedItems));
        renderItems();
    };

    // Отображение списка товаров при загрузке страницы
    renderItems();

    // Переход на главную страницу
    window.goToMain = function () {
        window.location.href = "index.html";
    };
});
