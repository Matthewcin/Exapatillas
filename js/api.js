document.addEventListener("DOMContentLoaded", function() {
    const apiURL = 'https://6675b92ea8d2b4d072f137f2.mockapi.io/api/v1/stock/zapatillas';
    let paginaActual = 1;
    const limit = 10;
    let dataCache = [];

    function cargarTabla(page = 1) {
        const url = new URL(apiURL);
        url.searchParams.append('page', page);
        url.searchParams.append('limit', limit);

        fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'}
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la carga de datos');
        })
        .then(data => {
            dataCache = data; // Guardamos los datos en cache
            mostrarTabla(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function mostrarTabla(data) {
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
            cargarTabla(paginaActual);
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
                cargarTabla(paginaActual);
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
            cargarTabla(paginaActual);
            document.querySelector('#modelo').value = '';
            document.querySelector('#cantidad').value = '';
        });
    });

    document.getElementById('paginaSiguiente').addEventListener('click', () => {
        paginaActual++;
        cargarTabla(paginaActual);
        updateButtons();
    });

    document.getElementById('paginaAnterior').addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual--;
            cargarTabla(paginaActual);
            updateButtons();
        }
    });

    function updateButtons() {
        document.getElementById('paginaAnterior').disabled = paginaActual === 1;
    }

    document.getElementById('btn-filtrar').addEventListener('click', () => {
        const filtroModelo = document.getElementById('filtro-modelo').value.toLowerCase();
        const datosFiltrados = dataCache.filter(zapatilla => zapatilla.modelo.toLowerCase().includes(filtroModelo));
        mostrarTabla(datosFiltrados);
    });

    cargarTabla(paginaActual);
});
