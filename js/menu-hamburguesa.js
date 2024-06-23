document.getElementById("menu-btn").addEventListener("click", function () {
    const menuHamburguesa = document.getElementById("menu-telefono");
    if (menuHamburguesa.classList.contains("abrir")) {
        menuHamburguesa.classList.remove("abrir");
    } else {
        menuHamburguesa.classList.add("abrir");
    }
});
