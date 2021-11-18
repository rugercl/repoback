const express = require('express')
const faker = require('faker');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const Contenedor = require('../api/contenedor')
const ContenedorMensajes = require('../api/contenedorMensajes')

const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const datosLibros = new Contenedor();
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


io.on('connection', async socket=>{
    //carga datos
    socket.emit('productos', productos);
   
    socket.on('update', producto =>{       
        io.sockets.emit('productos', productos)
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

app.get('/api/productos-test', (req, res) => {
    
})


httpServer.listen("8080", ()=>{
    console.log("Server on port 8080")
})