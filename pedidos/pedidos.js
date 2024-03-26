window.electronAPI.getProveedores((dataFromEventProveedores) => {
    let dataProveedores = JSON.parse(dataFromEventProveedores);
    console.log(dataProveedores);
    window.electronAPI.getProducto((dataFromEvent) => {
        console.log(dataFromEvent);
        const idProducto = document.getElementById('id');
        const nombreProducto = document.getElementById('nombreProducto');
        idProducto.value = dataFromEvent.id;
        nombreProducto.value = dataFromEvent.descripcion;
        const selectProveedor = document.getElementById('proveedor');
        selectProveedor.innerHTML = '';
        dataProveedores.forEach((proveedor) => {
            console.log(proveedor);
            const option = document.createElement('option');
            option.value = proveedor.id;
            option.textContent = proveedor.descripcion;
            selectProveedor.appendChild(option);
        });

        window.electronAPI.getPedidos((dataFromEventPedidos) => {
            let dataPedidos = JSON.parse(dataFromEventPedidos);
            console.log('Datos recibidos:', dataPedidos);
        });
    });
});

function confirmarPedido() {
    const idProducto = document.getElementById('id').value;
    const nombreProducto = document.getElementById('nombreProducto').value;
    const proveedor = document.getElementById('proveedor').value;
    const cantidad = document.getElementById('cantidad').value;

    window.electronAPI.crearPedido({
        nombreProducto: nombreProducto,
        idProducto: idProducto,
        idProveedor: proveedor,
        cantidad: cantidad,
    })
}