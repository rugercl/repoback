const express = require ('express');
const {Router} = express;
const fs = require ('fs');

const router = new Router();

const Contenedor = require ('../contenedor.js')

let prod = fs.readFileSync("./routes/productos.txt", "utf-8");
let arch = JSON.parse(prod);
let id=arch.length;

let datos = new Contenedor(arch);

// let datos = JSON.parse(prod);
router.get("/productos", (req,res)=>{
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

});

router.get("/productos/:id", (req,res)=>{
   id = req.params.id;
   let aux = arch.findIndex((n)=>{
     return n.id==id

   })
   if(aux){
   
    const readRandom = async () => {
        try {
           let prod = await datos.getById(id);
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
        
   }else{
     let err = {
       error: "Producto no encontrado"
      }
      res.send(err);
   }

});

router.post("/productos", (req,res)=>{
      id++
      datos.save(id,req.body.nombre, req.body.precio, req.body.autor);
      res.send("Producto Agregado!")
});

router.put("/productos/:id", (req,res)=>{
      console.log(req.params.id)
      console.log(req.body)
      arch.map((dato)=>{
        if(dato.id==req.params.id){
          dato.nombre = req.body.nombre;
          dato.precio = req.body.precio;
          dato.autor = req.body.autor;
        }
        return dato;

    })

    res.send("Producto Modificado!")

});

router.delete("/productos/:id", (req,res)=>{
  
    id = req.params.id;
    datos.deleteById(id);

    res.send("Producto Eliminado!")
});

module.exports = router;