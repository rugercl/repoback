const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const Contenedor = require('../api/contenedor')
const ContenedorMensajes = require('../api/contenedorMensajes')

const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const datosLibros = new Contenedor();
const datosMensajes = new ContenedorMensajes('mensajes.json');

io.on('connection', async socket=>{
    //carga de Libros
    socket.emit('productos', datosLibros.getAll())
   
    socket.on('update', producto =>{       
        datosLibros.save(producto)
        io.sockets.emit('productos', datosLibros.getAll())
    })

    //Carga de mensajes
    socket.emit('mensajes', await datosMensajes.listarAll())

    socket.on('nuevoChat', async mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        await datosMensajes.guardar(mensaje)
        io.sockets.emit('mensajes', await datosMensajes.listarAll());
    })

})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))


httpServer.listen("8080", ()=>{
    console.log("Server on port 8080")
})