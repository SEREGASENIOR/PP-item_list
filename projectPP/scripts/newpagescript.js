function goToMain() {
    window.location.href = "index.html";
}

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

const itemList = document.getElementById("item-list");
if (!itemList) {
    console.error("Элемент с id='item-list' не найден.");
}

// Отображаем список товаров
function renderItems() {
    if (!itemList) return;

    itemList.innerHTML = "";

    savedItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "item";

        li.innerHTML = `
            <span>${item.name} (Количество: ${item.quantity})</span>
            <button onclick="deleteItem(${index})">Удалить</button>
        `;

        itemList.appendChild(li);
    });
}


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

    const newItem = {
        name: itemName,
        quantity: itemQuantity,
    };

    savedItems.push(newItem);

    localStorage.setItem(category, JSON.stringify(savedItems));

    renderItems();

    itemNameInput.value = "";
    itemQuantityInput.value = "";
}

// Функция для удаления товара
function deleteItem(index) {
    savedItems.splice(index, 1);
    localStorage.setItem(category, JSON.stringify(savedItems));
    renderItems();
}

renderItems();
