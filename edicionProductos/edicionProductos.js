window.electronAPI.getProducto((dataFromEvent) => {
    console.log('Datos recibidos:', dataFromEvent);
    const formulario = document.getElementById('formulario');
    const idInput = document.getElementById('id');
    const descripcionInput = document.getElementById('descripcion');
    const categoriaInput = document.getElementById('categoria');
    const existenciaInput = document.getElementById('existencia');
    const eliminarButton = document.getElementById('eliminar');
    const guardarButton = document.getElementById('guardar');
    const producto = dataFromEvent;

    idInput.value = producto.id;
    descripcionInput.value = producto.descripcion;
    categoriaInput.value = producto.categoría;
    existenciaInput.value = producto.existencia;

    descripcionInput.addEventListener('keydown', (event) => {
        validarCampos();
    });

    categoriaInput.addEventListener('keydown', (event) => {
        validarCampos();
    });

    existenciaInput.addEventListener('keydown', (event) => {
        validarCampos();
    });

    eliminarButton.addEventListener('click', function() {
        descripcionInput.value = '';
        categoriaInput.value = '';
        existenciaInput.value = '';
        validarCampos()
    });

    guardarButton.addEventListener('click', function() {
        const nuevaDescripcion = descripcionInput.value;
        const nuevaCategoria = categoriaInput.value;
        const nuevaExistencia = existenciaInput.value;
        window.electronAPI.editarProducto({
            "id": producto.id,
            "descripcion": nuevaDescripcion,
            "categoría": nuevaCategoria,
            "existencia": nuevaExistencia
        });
    });
});

function validarCampos() {
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const existencia = document.getElementById('existencia').value;

    const botonGuardar = document.getElementById('guardar');
    botonGuardar.disabled = !(descripcion && categoria && existencia);
}