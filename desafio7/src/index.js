const express = require('express')
const knex = require('../knexfile')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const Contenedor = require('../api/contenedor')
const ContenedorMensajes = require('../api/contenedorMensajes')

const app = express();
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const datosLibros = new Contenedor();
const datosMensajes = new ContenedorMensajes('mensajes.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

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

          let ojbNew = {
            email: mensaje.autor,
            texto: mensaje.texto,
          };
            knex("mensajes")
              .insert(ojbNew)
              .then(() => {
                console.log("Registro Creado!");
              })
              .catch((err) => {
                throw err;
              });
          });
        
    })

app.get("/all", (req, res) => {
  knex
    .from("mensajes")
    .select("*")
    .orderBy("id", "desc")
    .then((json) => {
      res.json({ data: json });
    })
    .catch((err) => {
      res.send({ error: err });
    });
});

app.delete("/deleteUser/:id", (req, res) => {
  knex("mensajes")
    .where({ id: req.params.id })
    .del()
    .then((json) => {
      console.log(json);
      res.json({ data: "Registro Eliminado!" });
    })
    .catch((err) => {
      console.log("Entro al cacth");
      res.send({ error: err });
    });
});

httpServer.listen("3001", ()=>{
    console.log("Server on port 3001")
})