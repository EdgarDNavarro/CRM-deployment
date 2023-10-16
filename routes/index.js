const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

//Middleware para proteger las rutas
const auth = require('../middleware/auth')

module.exports = function() {

    //Agrega nuevos clientes via post
    router.post('/clientes', auth, clienteController.nuevoCliente)

    //Obtener todos los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes)

    //Muestra un cliente en especifico
    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente)

    //Actualizar cliente
    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente)

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', auth, clienteController.eliminarCliente)

    /* PRODUCTOS */
    //Nuevos productos
    router.post('/productos', auth, productosController.subirArchivo ,productosController.nuevoProducto)

    //Muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos)

    //Muestra un producto en especifico
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto)

    //Actualizar producto
    router.put('/productos/:idProducto', auth, productosController.subirArchivo, productosController.actualizarProducto)

    //Eliminar Productos
    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto)

    //Busqueda de productos
    router.post('/productos/busqueda/:query', auth, productosController.buscarProductos)

    /* PEDIDOS */
    //Agregar nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido)

    //Mostrar todos los pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedidos)

    //Mostrar un pedido 
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido)

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido)

    //Eliminar pedidos
    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido)

    /* Usuarios */
    router.post('/crear-cuenta', auth, usuariosController.registrarUsuario)

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario)

    return router
}