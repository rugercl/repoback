const express = require ('express')
const colors = require ('colors')
const fs = require ('fs')
const Contenedor = require ('./contenedor.js')

const app = express();

let producto = fs.readFileSync("./productos.txt", "utf-8")
let datos = new Contenedor(JSON.parse(producto));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res)=>{
    res.send(`<h1>Usar ruta localhost:8080/productos, para obtener los datos de archivo producto</h1>
            <h1>Usar ruta localhost:8080/productoRandom, para obtener datos aleatorios</h1>`)
})

app.get("/productos", (req, res)=>{

    const readProduct = async () => {
        try {
            let prod = await datos.getAll()
            res.send(prod)
          if (prod) {
            console.log("result OK");
          } else {
            throw "Error al ejecutar";
          }
        } catch (err) {
          throw err;
        }
      };
      
        readProduct();
})
app.get("/productoRandom", (req, res)=>{

    const readRandom = async () => {
        try {
            let random = Math.round((Math.random() * 3));
            let prod = await datos.getById(random);
            res.send(prod)
          if (prod) {
            console.log("result OK");
          } else {
            throw "Error al ejecutar";
          }
        } catch (err) {
          throw err;
        }
      };
      
      readRandom();

})

app.listen(PORT, ()=>{
    console.log("Server on port 8080".blue)
})

