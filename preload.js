const { contextBridge, ipcRenderer } = require('electron/renderer')

const onLoginFallido = (callback) => {
  ipcRenderer.on('login-fallido', (event, data) => {
      callback(data);
  });
};

const getProductos = (callback) => {
  ipcRenderer.on('obtener-productos', (event, data) => {
      callback(data);
  });
};

const getProveedores = (callback) => {
  ipcRenderer.on('obtener-proveedores', (event, data) => {
      callback(data);
  });
};

const getPedidos = (callback) => {
  ipcRenderer.on('obtener-pedidos', (event, data) => {
      callback(data);
  });
};

const getProducto = (callback) => {
  ipcRenderer.on('obtener-producto', (event, data) => {
      callback(data);
  });
};

contextBridge.exposeInMainWorld('electronAPI', {
  login: (loginData) => ipcRenderer.send('login', loginData),
  loginFallido: (text) => ipcRenderer.send('login-fallido',text),
  onLoginFallido,
  getProductos,
  abrirEditarProducto: (producto) => ipcRenderer.send('editar-producto', producto),
  editarProducto: (producto) => ipcRenderer.send('editar-producto-db', producto),
  abrirPedidoProducto: (producto) => ipcRenderer.send('pedido-producto', producto),
  crearPedido: (pedido) => ipcRenderer.send('crear-pedido-db', pedido),
  getProveedores,
  getPedidos,
  getProducto,
})