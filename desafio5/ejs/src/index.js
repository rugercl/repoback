const express = require('express');
const Contenedor = require ('../api/contenedor');
const productos = require ('../api/productos.json');

//cargar api y llamado a la funcion
const datos = new Contenedor(productos);


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//llamado a index para ingreso de productos
app.use(express.static('public'))

//Carga de Frame EJS
app.set("view engine", "ejs");
app.set("views", "./views");

//llamado a los verbos
app.post('/productos', (req, res)=>{
    datos.save(req.body.libro, req.body.precio, req.body.url);
    res.redirect('/')
    //res.send(datos);
})

app.get('/productos', (req, res)=>{
    let produc = datos.getAll()

    res.render("vista",{
        productos: produc,
        hayProductos: produc.length
    });
});

app.listen("8080", ()=>{
    console.log("Server on port 8080");
})