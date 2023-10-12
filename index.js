const express = require('express')
const router = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

//Conectar Mongo
mongoose.Promise = global.Promise
const db = "mongodb://127.0.0.1/restapis";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

app.use('/', router())

app.use(express.static('uploads'))

app.listen(5000)