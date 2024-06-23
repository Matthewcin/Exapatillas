document.addEventListener("DOMContentLoaded", function () {
    const contador = document.querySelectorAll('.dias, .horas, .minutos, .segundos');
    let dia = 3;
    let hora = 21;
    let minuto = 52;
    let segundo = 21;

    function actualizarContador() { // Estados del Tiempo
        segundo--;
        if (segundo < 0) { // si los segundos llega a 00
            segundo = 59; // se reestablece a 59
            minuto--; // Baja un Minuto
            if (minuto < 0) { // Si los minutos llegan a 00
                minuto = 59; // se reestablece a 59
                hora--; // Baja una hora
                if (hora < 0) { // Si la hora llega a 00
                    hora = 23; // se reestablece a 23
                    dia--; // Baja un Dia
                    if (dia < 0) { // Si los dias llegan a 0, entonces esta variable no existe, luego quedara hora. minutos. segundos y será el fin del intervalo
                        limpiarIntervalo(intervalo);
                    }
                }
            }
        }
        contador[0].innerText = dia + "d";
        contador[1].innerText = hora + "h";
        contador[2].innerText = minuto + "m";
        contador[3].innerText = segundo + "s";
    }

    actualizarContador(); // Actualizar el contador al cargar la página
    const intervalo = setInterval(actualizarContador, 1000); // Actualizar cada segundo
});