import express from 'express';
import config from './config.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'

//dependencias del servidor
const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//configuraciones del servidor
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs');


//session MongoDB
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    // store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    store: MongoStore.create({ 
        mongoUrl    : 
        "mongodb+srv://edgardo:1q2w3e4r@cluster0.my327.mongodb.net/coderLogin?retryWrites=true&w=majority",
        mongoOptions: advancedOptions }),
    secret: 'misecreto',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}))

//rutas del servidor
app.use(authWebRouter)
app.use(homeWebRouter)

//inicio del servidor
const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))