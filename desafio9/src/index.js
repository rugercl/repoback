const express = require('express')
const faker = require('faker');
const handlebars = require ('express-handlebars');

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const Contenedor = require('../api/contenedor')
const ContenedorMensajes = require('../api/contenedorMensajes')

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


io.on('connection', async socket=>{
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


app.get('/api/productos-test', (req, res)=>{
    let produc = productos;

    res.render("vista",{
        productos: produc,
        hayProductos: produc.length
    });
});


httpServer.listen("8080", ()=>{
    console.log("Server on port 8080")
})