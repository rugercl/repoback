import express from 'express'
import faker from 'faker'
import handlebars from 'express-handlebars'
import config from './config.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { normalizarMensajes } from '../src/normalizacion/index.js'
// const normalizarMensajes = require('../src/normalizacion/mensajes');

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

// const Contenedor = require('../api/contenedor')
//const ContenedorMensajes = require('../api/contenedorMensajes')
import ContenedorMensajes from '../api/contenedorMensajes.js'

const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const datosMensajes = new ContenedorMensajes('mensajes.json');

let productos = [];
for(let i = 0; i <= 4; i++){
    productos.push({
        id: i,
        nombre: faker.commerce.productName(),
        precio: faker.commerce.price(),
        foto: faker.image.imageUrl()
    });
}

//llamado a Handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(session({
    // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
    store: MongoStore.create({ mongoUrl: config.mongoRemote.cnxStr }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))


io.on('connection', async socket=>{
    //Carga de mensajes
    socket.emit('mensajes', normalizarMensajes(await datosMensajes.listarAll()))

    socket.on('nuevoChat', async mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        await datosMensajes.guardar(mensaje)
        io.sockets.emit('mensajes', normalizarMensajes(await datosMensajes.listarAll()));
    })

})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/api/productos-test', (req, res)=>{
    let produc = productos;

    res.render("vista",{
        productos: produc,
        hayProductos: produc.length
    });
});


const connectedServer = httpServer.listen(config.PORT, () => {
    console.log(`Server on port ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))