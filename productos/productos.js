window.electronAPI.getProductos((dataFromEvent) => {
    let data = JSON.parse(dataFromEvent);
    console.log('Datos recibidos:', data);
    const tablaDatos = document.getElementById('datos');
    tablaDatos.innerHTML = '';
    const encabezado = tablaDatos.createTHead().insertRow();
    const th1 = encabezado.insertCell();
    th1.textContent = 'ID';
    const th2 = encabezado.insertCell();
    th2.textContent = 'Descripción';
    const th3 = encabezado.insertCell();
    th3.textContent = 'Categoría';
    const th4 = encabezado.insertCell();
    th4.textContent = 'Existencia';
    const th5 = encabezado.insertCell();
    th5.textContent = 'Acciones';

    data.forEach((producto) => {
        const fila = tablaDatos.insertRow();
        const celdaId = fila.insertCell();
        celdaId.textContent = producto.id;

        const celdaDescripcion = fila.insertCell();
        celdaDescripcion.textContent = producto.descripcion;

        const celdaCategoria = fila.insertCell();
        celdaCategoria.textContent = producto.categoría;

        const celdaExistencia = fila.insertCell();
        celdaExistencia.textContent = producto.existencia;

        const celdaAcciones = fila.insertCell();
        const btnActualizar = document.createElement('button');
        btnActualizar.textContent = 'Actualizar';
        btnActualizar.addEventListener('click', () => {
            window.electronAPI.abrirEditarProducto(producto);
        });
        celdaAcciones.appendChild(btnActualizar);

        const btnCrearPedido = document.createElement('button');
        btnCrearPedido.textContent = 'Crear Pedido';
        btnCrearPedido.addEventListener('click', () => {
            window.electronAPI.abrirPedidoProducto(producto);
        });
        celdaAcciones.appendChild(btnCrearPedido);
    });
});