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

function showRegistration() {
    document.getElementById("registration-container").style.display = "block";
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("shopping-list-container").style.display = "none";
}

function showLogin() {
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("registration-container").style.display = "none";
    document.getElementById("shopping-list-container").style.display = "none";
}


function register() {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();

    // Проверка на пустые поля
    if (!username || !password) {
        alert("Пожалуйста, введите логин и пароль.");
        return;
    }

    // Получаем существующих пользователей из localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Проверка: логин уже зарегистрирован
    if (users[username]) {
        alert("Этот логин уже используется. Попробуйте другой.");
        return;
    }

    // Сохранение нового пользователя
    users[username] = { password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Регистрация успешна!");

    // Переход на страницу авторизации
    showLogin();
}


function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Проверка на пустые поля
    if (!username || !password) {
        alert("Введите логин и пароль.");
        return;
    }

    // Получаем данные пользователей из localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Проверка: логин и пароль совпадают
    if (users[username] && users[username].password === password) {
        alert(`Добро пожаловать, ${username}!`);

        // Сохраняем текущего пользователя
        localStorage.setItem("currentUser", username);

        // Переход к списку покупок
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("shopping-list-container").style.display = "block";
    } else {
        // Показать сообщение об ошибке
        document.getElementById("error-message").style.display = "block";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("shopping-list-container").style.display = "block";
    } else {
        showLogin();
    }
});


function logout() {
    // Удаляем текущего пользователя
    localStorage.removeItem("currentUser");

    // Показываем экран авторизации
    showLogin();
}
