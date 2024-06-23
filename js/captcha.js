document.addEventListener("DOMContentLoaded", function () { /* Cuando el DOM Cargue se ejecutara primero este captcha antes que todo */
    captcha();
});

function captcha() {
    const num1 = Math.floor(Math.random() * 10) + 1; /* Genera un numero como 0,523050232 .. se multiplica por 10: 5,23050232 y luego se redondea: 5 */
    const num2 = Math.floor(Math.random() * 10) + 1; /* Lo mismo que arriba, pero es un segundo numero para que luego el usuario haga una suma */
    const preguntar = "cuanto es " + num1 + "+" + num2 + " ?"; /* Pregunta cuanto es X + X */
    document.getElementById("pregunta-captcha").textContent = preguntar;
    document.getElementById("respuesta-captcha").dataset.suma = num1 + num2; /* se guarda el resultado de la suma para utilizarlo luego */
}

function verificarCaptcha() {
    const resp = parseInt(document.getElementById("respuesta-captcha").value, 10); /* Toma el Valor entero en base 10 ingresado por el usuario */
    const suma = parseInt(document.getElementById("respuesta-captcha").dataset.suma, 10); /* Toma el Valor de la suma */
    const respuestaFinal = document.getElementById('mensaje');

    if (resp === suma) {  /* SI LA RESPUESTA ES ESTRICTAMENTE IGUAL A LA SUMA, ENTONCES... */
        respuestaFinal.textContent = "Bien! se nota que estudiaste profe..";
        respuestaFinal.style.color = "green";
        setTimeout(() => {
            document.getElementById("overlay").style.display = "none"; /* Quita el Overlay para que el usuario pueda seguir Navegando por la pagina */
        }, 2000); /* espera 2000ms = 2 segundos */
    } else { /* Si lo de arriba no se cumple entonces se cambia el mensaje de respuesta */
        respuestaFinal.textContent = "Toca volver a la primaria D:";
    }
}
