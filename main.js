const { app, BrowserWindow, ipcMain } = require('electron');
let bcrypt = require('bcrypt');
const mysql = require('mysql2');
const path = require('path');

let loginWindow;
let productosWindow;
let edicionProductosWindow;
let pedidosWindow;

//login
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  loginWindow.loadFile('login/login.html');

  loginWindow.on('closed', function () {
    loginWindow = null;
  });
  loginWindow.webContents.openDevTools();
  ipcMain.on('login', (event, dato) => {
    connection.query('SELECT * FROM usuario WHERE id = ?', [dato.id], (error, results, fields) => {
      if (error) {
        loginWindow.webContents.send('login-fallido', 'Error en base de datos');
        return;
      }
      //general password: hola
      if (results.length) {
        bcrypt.compare(dato.pass, results[0].pass, function (err, compare) {
          if (compare) {
            abrirProductos();
            loginWindow.close();
          } else {
            loginWindow.webContents.send('login-fallido', 'Usuario o contraseña incorrectos');
          }
        });
      } else {
        loginWindow.webContents.send('login-fallido', 'Usuario o contraseña incorrectos db');
      }
    });
  });
}

//productos
function createProductosWindow() {
  productosWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  productosWindow.loadFile('productos/productos.html');

  productosWindow.on('closed', function () {
    productosWindow = null;
  });
  productosWindow.webContents.openDevTools();

  ipcMain.on('editar-producto', (event, dato) => {
    createEdicionProductoWindow()
    edicionProductosWindow.webContents.send('obtener-producto', dato);

  });

  ipcMain.on('pedido-producto', (event, dato) => {
    createPedidosWindow();
    connection.promise().query('SELECT * FROM proveedores_de_producto WHERE idProducto = ?', [dato.id])
      .then(([resultsProveedores, fields]) => {
        if (resultsProveedores.length) {
          const dbProveedoresString = JSON.stringify(resultsProveedores);
          pedidosWindow.webContents.send('obtener-proveedores', dbProveedoresString);
          pedidosWindow.webContents.send('obtener-producto', dato);
          connection.promise().query('SELECT * FROM pedidos')
            .then(([resultsPedidos, fields]) => {
              if (resultsPedidos.length) {
                console.log(resultsPedidos);
                const dbPedidosString = JSON.stringify(resultsProveedores);
                pedidosWindow.webContents.send('obtener-pedidos', dbPedidosString);
              }
            })
        }
      })
  });
}

function abrirProductos() {
  connection.promise().query('SELECT * FROM producto')
    .then(([results, fields]) => {
      if (results.length) {
        createProductosWindow()
        const dbProductosString = JSON.stringify(results);
        productosWindow.webContents.send('obtener-productos', dbProductosString);
      }
    })
    .catch((err) => {
      console.error('Error al ejecutar la consulta:', err);
    });
}

//edicion
function createEdicionProductoWindow() {
  edicionProductosWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  edicionProductosWindow.loadFile('edicionProductos/edicionProductos.html');

  edicionProductosWindow.on('closed', function () {
    edicionProductosWindow = null;
  });
  edicionProductosWindow.webContents.openDevTools();

  ipcMain.on('editar-producto-db', (event, dato) => {
    connection.promise().query('UPDATE producto SET descripcion = ?, categoría = ?, existencia = ? WHERE id = ?', [dato.descripcion, dato.categoría, dato.existencia, dato.id])
      .then(([update, fields]) => {
        connection.promise().query('SELECT * FROM producto')
          .then(([results, fields]) => {
            if (results.length) {
              const dbProductosString = JSON.stringify(results);
              productosWindow.webContents.send('obtener-productos', dbProductosString);
            }
          })
          .catch((err) => {
            console.error('Error al ejecutar la consulta:', err);
          });
        edicionProductosWindow.close();
      })
  });
}

//pedidos
function createPedidosWindow() {
  pedidosWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  pedidosWindow.loadFile('pedidos/pedidos.html');

  pedidosWindow.on('closed', function () {
    pedidosWindow = null;
  });
  pedidosWindow.webContents.openDevTools();

  ipcMain.on('crear-pedido-db', (event, dato) => {
    connection.promise().query('INSERT INTO pedidos (nombreProducto,idProducto, idProveedor, cantidad) VALUES (?, ?, ?, ?)', [dato.nombreProducto, dato.idProducto, dato.idProveedor, dato.cantidad])
      .then(([results, fields]) => {
        console.log('Pedido insertado con éxito:', results);
      })
    pedidosWindow.close();
  });
}

app.whenReady().then(createLoginWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (loginWindow === null) createLoginWindow();
});

// conexion base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '12345',
  database: '23000349_supermercado'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});