const Productos = require('../models/Productos')
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Formato NO válido'))
        }
    }
}
const upload = multer(configuracionMulter).single('imagen')

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje : error})
        }
        return next()
    })
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({mensaje : 'Se agregó un nuevo producto'})
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({})
        res.json(productos)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto)

    if(!producto) {
        res.json({mensaje : 'Ese producto no existe'})
        return next()
    }

    res.json(producto)
}

exports.actualizarProducto = async (req, res, next) => {
    try {
        
        let nuevoProducto = req.body

        if(req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = productoAnterior.imagen
        }


        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, 
            nuevoProducto, {
                new: true
            })
        res.json(producto)

    } catch (error) {
        console.log(error)
    }
}

exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findOneAndDelete({_id : req.params.idProducto})
        res.json({mensaje : 'El producto se ha eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
}