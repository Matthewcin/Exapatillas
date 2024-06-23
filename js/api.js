document.addEventListener("DOMContentLoaded", function() {
    const apiURL = 'https://6675b92ea8d2b4d072f137f2.mockapi.io/api/v1/stock/zapatillas';

    function cargarTabla() {
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('tbody');
                tbody.innerHTML = '';
                data.forEach(zapatilla => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${zapatilla.modelo}</td>
                        <td>${zapatilla.cantidad}</td>
                        <td>
                            <button class="editar" data-id="${zapatilla.id}">Editar</button>
                            <button class="borrar" data-id="${zapatilla.id}">Borrar</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
                agregarEventos();
            });
    }

    function agregarEventos() {
        document.querySelectorAll('.borrar').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                borrarZapatilla(id);
            });
        });

        document.querySelectorAll('.editar').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editarZapatilla(id);
            });
        });
    }

    function borrarZapatilla(id) {
        fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        }).then(() => {
            cargarTabla();
        });
    }

    function editarZapatilla(id) {
        const nuevoModelo = prompt('Nuevo modelo:');
        const nuevaCantidad = prompt('Nueva cantidad:');
        if (nuevoModelo && nuevaCantidad) {
            fetch(`${apiURL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ modelo: nuevoModelo, cantidad: nuevaCantidad })
            }).then(() => {
                cargarTabla();
            });
        }
    }

    document.querySelector('#formulario-agregar').addEventListener('submit', function(event) {
        event.preventDefault();
        const modelo = document.querySelector('#modelo').value;
        const cantidad = document.querySelector('#cantidad').value;
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ modelo, cantidad })
        }).then(() => {
            cargarTabla();
            document.querySelector('#modelo').value = '';
            document.querySelector('#cantidad').value = '';
        });
    });

    cargarTabla();
});
