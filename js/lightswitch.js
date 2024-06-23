document.querySelector("#btn-sun").addEventListener("click", prender);
document.querySelector("#btn-moon").addEventListener("click", apagar);

// Añade los eventos para los botones dentro del menú hamburguesa
document.querySelector("#btn-sun-mobile").addEventListener("click", prender);
document.querySelector("#btn-moon-mobile").addEventListener("click", apagar);
apagar();

function prender() {
    // Encender
    document.getElementById("fondo").classList.add("encendido");
    document.getElementById("fondo").classList.remove("apagado");
    document.querySelectorAll(".nav_element").forEach(function(element) {
        element.classList.add("li_color_off");
        element.classList.remove("li_color_on");
    });
    document.querySelector(".nav__container").classList.add("nav_off");
    document.querySelector(".nav__container").classList.remove("nav_on");
    document.querySelectorAll(".preparate").forEach(function(element) {
        element.classList.add("encendido");
        element.classList.remove("apagado");
    });

    // Cambiar Color de Imagenes
    document.getElementById("logo").src = "assets/logo-b.png";
    document.querySelectorAll(".sun").forEach(function(element) {
        element.src = "assets/sun-b.png";
    });
    document.querySelectorAll(".moon").forEach(function(element) {
        element.src = "assets/moon-b.png";
    });
    document.querySelectorAll(".instagram").forEach(function(element) {
        element.src = "assets/instagram-b.png";
    });

    // Switch Box
    document.querySelectorAll(".masculino, .niño, .femenino").forEach(function(element) {
        element.classList.add("box_off");
        element.classList.remove("box_on");
    });
}

function apagar() {
    // Apagar
    document.getElementById("fondo").classList.add("apagado");
    document.getElementById("fondo").classList.remove("encendido");
    document.querySelectorAll(".nav_element").forEach(function(element) {
        element.classList.add("li_color_on");
        element.classList.remove("li_color_off");
    });
    document.querySelector(".nav__container").classList.add("nav_on");
    document.querySelector(".nav__container").classList.remove("nav_off");
    document.querySelectorAll(".preparate").forEach(function(element) {
        element.classList.add("apagado");
        element.classList.remove("encendido");
    });

    // Cambiar Color de Imagenes
    document.getElementById("logo").src = "assets/logo-w.png";
    document.querySelectorAll(".sun").forEach(function(element) {
        element.src = "assets/sun-w.png";
    });
    document.querySelectorAll(".moon").forEach(function(element) {
        element.src = "assets/moon-w.png";
    });
    document.querySelectorAll(".instagram").forEach(function(element) {
        element.src = "assets/instagram-w.png";
    });

    // Switch Box
    document.querySelectorAll(".masculino, .niño, .femenino").forEach(function(element) {
        element.classList.add("box_on");
        element.classList.remove("box_off");
    });
}
