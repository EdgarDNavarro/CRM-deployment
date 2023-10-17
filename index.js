const express = require('express')
const router = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config({path: 'variables.env'})

//Conectar Mongo
mongoose.Promise = global.Promise
const db = process.env.DB_URL;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express()

app.use(express.static('uploads'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Definir un dominio(s) para recibir peticiones
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        console.log(process.env.FRONTEND_URL)
        //Revisar que la peticion venga de la white list
        const existe = whiteList.some( dominio => dominio === origin )
        if(existe) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}
app.use(cors(corsOptions))


app.use('/', router())



const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000

//Iniciar app
app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
})