const express = require('express');
const {Router} = express;
const Contenedor = require('../controller/api')
const ContenedorCarrito = require('../controller/apiCarrito')
const router = new Router();
const administrador = Boolean;

const datosApi = new Contenedor();
const datosCarrito = new ContenedorCarrito();

//Verbos para el manejo de Productos
router.post("/productos", (req, res)=>{
    const producto = req.body;
    datosApi.save(producto)
    res.send("Producto Agregado")
})

router.get("/productos", (req, res)=>{
    datosApi.getAll();
    res.send(datosApi.productos);
})

router.get("/productos/:id", (req, res)=>{
    datoId=req.params.id;
    id=JSON.parse(datoId)
    let resp=(datosApi.getById(id));
    res.send(resp)
})

router.put("/productos/:id", (req, res)=>{
    id=req.params.id;
    body=req.body
    datosApi.put(body, id)

  res.send("Producto Modificado")
})

router.delete("/productos/:id", (req, res)=>{
    id=req.params.id;
    datosApi.deleteById(id)

  res.send("Producto Eliminado")
})

//Verbos para el manejo del carrito
router.post("/carrito/", (req, res)=>{
    const producto = req.body;
    datosCarrito.saveCarrito(producto)    
    res.send(datosCarrito.carrito)
   
})

router.delete("/carrito/:id", (req, res)=>{
    id=req.params.id;
    datosCarrito.deleteByIdCarrito(id);
    res.send("Producto Eliminado");
})

router.get("/carrito/:id/productos", (req, res)=>{
    datoId=req.params.id;
    id=JSON.parse(datoId)

    datosCarrito.getByIdCarrito(id);
    //console.log(datosCarrito.carrito.producto)
    res.send(datosCarrito.carrito);
    
})

router.get("/carrito", (req, res)=>{
    datosCarrito.getAllCarrito();
    res.send(datosCarrito.carrito);
})

router.post("/carrito/:id/productos", (req, res)=>{

    const producto = req.body;
    const id = req.params.id
    datosCarrito.putCarrito(producto, id)  

    res.send(datosCarrito.carrito)
})

router.delete("/carrito/:id/productos/:id_prod", (req, res)=>{
    
    id=req.params.id;
    id_prod=req.params.id_prod;
    //console.log(id)
    //console.log(id_prod)

    datosCarrito.deleteByIdCarrito(id, id_prod );
    res.send("Producto Eliminado");
})

    // //agregar el carrito de compras al storage
    // sincronizarStorage();

    // //informacion del total de la compra del cliente
    // let pagar = articulosCarrito.reduce((counter, item)=> counter + (item.precio*item.cantidad),0);
    // precioTotal.innerText = pagar;

    // //funcion productos en storage
    // function sincronizarStorage(){
    //     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    // }

module.exports = router;