drop database if exists `23000349_supermercado`;
create database `23000349_supermercado`;
use `23000349_supermercado`;

create table usuario (
    id int primary key,
    usuario varchar(100),
    nombre varchar(100),
    numeroIdentificacion varchar(100),
    pass varchar(100)
);

insert into  usuario (id, usuario, nombre, numeroIdentificacion, pass) values
(1, 'user1', 'Juan Perez', '1234567890', '$2b$10$qHYayW055wClMvfvGyBTbeeiVpr/Oc0TdY94pQzj9aOy01aHZoSaO'),
(2, 'user2', 'María Rodriguez', '0987654321', '$2b$10$qHYayW055wClMvfvGyBTbeeiVpr/Oc0TdY94pQzj9aOy01aHZoSaO'),
(3, 'user3', 'Carlos Sanchez', '1357902468', '$2b$10$qHYayW055wClMvfvGyBTbeeiVpr/Oc0TdY94pQzj9aOy01aHZoSaO'),
(4, 'user4', 'Laura García', '2468013579', '$2b$10$qHYayW055wClMvfvGyBTbeeiVpr/Oc0TdY94pQzj9aOy01aHZoSaO'),
(5, 'user5', 'Pedro Gomez', '9876543210', '$2b$10$qHYayW055wClMvfvGyBTbeeiVpr/Oc0TdY94pQzj9aOy01aHZoSaO');


create table producto (
    id int primary key,
    descripcion varchar(100),
    categoría varchar(100),
    existencia int
);

insert into producto (id, descripcion, categoría, existencia) values
(1, 'Producto A', 'Categoría 1', 10),
(2, 'Producto B', 'Categoría 2', 20),
(3, 'Producto C', 'Categoría 1', 15),
(4, 'Producto D', 'Categoría 3', 5),
(5, 'Producto E', 'Categoría 2', 30);

create table proveedor(
    id int primary key,
    descripcion varchar(100)
);

insert into proveedor (id, descripcion) values
(1, 'Proveedor A'),
(2, 'Proveedor B'),
(3, 'Proveedor C'),
(4, 'Proveedor D'),
(5, 'Proveedor E');

create table producto_proveedor(
    idProducto int,
    idProveedor int,
    PRIMARY KEY (idProducto, idProveedor),
    FOREIGN KEY (idProducto) REFERENCES producto(id),
    FOREIGN KEY (idProveedor) REFERENCES proveedor(id)
);

insert into producto_proveedor (idProducto, idProveedor) values
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 5);

create view proveedores_de_producto as
select pp.idproducto, prv.*
from producto_proveedor pp
join proveedor prv on pp.idproveedor = prv.id;

-- select * from proveedores_de_producto where idProducto = 1;

create table pedidos (
    id int primary key auto_increment,
    nombreProducto varchar(100),
    idProducto int,
    idProveedor int,
    cantidad int,
    foreign key (idProducto) references producto(id),
    foreign key (idProveedor) references  proveedor(id)
);

