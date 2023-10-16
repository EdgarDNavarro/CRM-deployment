const Usuarios = require('../models/Usuaios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrarUsuario = async (req, res) => {
    //leer los datos del usuario y colocarlos en el usuario
    const usuario = await Usuarios(req.body)
    usuario.password = await bcrypt.hash(req.body.password, 12)
    try {
        await usuario.save()
        res.json({mensaje: 'Usuario Creado Correctamente'})
    } catch (error) {
        console.log(error)
        res.json({mensaje: 'Hubo un error'})
    }
}

exports.autenticarUsuario = async (req, res, next) => {
    //buscar el usuario
    const {email, password} = req.body
    const usuario = await Usuarios.findOne({ email })

    if(!usuario) {
        await res.status(401).json({mensaje: 'Ese usuario no existe'})
        next()
    } else {
        //Si usuario existe verificar el password
        if(!bcrypt.compareSync(password, usuario.password)) {
            //Si el password es incorrecto
            await res.status(401).json({mensaje: 'Password Incorrecto'})
            next()
        } else {
            //firmar el token
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'LLAVESECRETA',
            {
                expiresIn: '30s'
            })
            //retornar el token 
            res.json({ token })
        }
    }
}