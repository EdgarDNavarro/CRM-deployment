const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')

module.exports = function() {

    //Agrega nuevos clientes via post
    router.post('/clientes', clienteController.nuevoCliente)

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    //Muestra un cliente en especifico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    //Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)

    //Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

    /* PRODUCTOS */
    //Nuevos productos
    router.post('/productos', productosController.subirArchivo ,productosController.nuevoProducto)

    //Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos)

    //Muestra un producto en especifico
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    //Actualizar producto
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto)

    //Eliminar Productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    /* PEDIDOS */
    //Agregar nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido)

    //Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos)

    //Mostrar un pedido 
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)

    //Actualizar pedidos
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

    //Eliminar pedidos
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)
    return router
}