let hoy= new Date();
let fecha = hoy.getDate() + "-" + (hoy.getMonth() +1) + "-" + hoy.getFullYear();
let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
let fechaHora = fecha + " " + hora;
const { json, response } = require('express');
const Contenedor = require ('./api')

class ContenedorCarrito{
    constructor(archivo){
        this.carrito = []
        this.id_carr = 0
        this.timestap
        this.producto
    }

    // POST '/api/carrito
    saveCarrito(prod) {
        
        const newProd = { id_carr: ++this.id_carr, timestap:fechaHora, producto: [prod] }
        this.carrito.push(newProd)
        
        //console.log(this.carrito)
         return newProd
    }

    // GET '/api/carrito/:id'
    getByIdCarrito(id_carr) {
        const prod = this.carrito.find(prod => prod.id_carr == id_carr)
        return prod || { error: 'carrito no encontrado' }
        
    }

    getAllCarrito(){
        return this.carrito;
    }

    //PUT '/api/carrito
    putCarrito(prod, id_carr) {
        const newProd = { ...prod }
        //console.log(newProd)
        const index = this.carrito.findIndex(p => p.id_carr == id_carr)
        if (index !== -1) {
            //console.log(index)
            //console.log(this.carrito[index].producto)

            this.carrito[index].producto.push(newProd)
            return this.carrito[index]
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    // DELETE '/api/carrito/:id  
    deleteByIdCarrito(id_carr, id) {
        const index = this.carrito.findIndex(prod => prod.id_carr == id_carr)
        console.log(index)
        if (index !== -1) {
            
            const auxIndex = this.carrito.findIndex(prod => prod.id == id)
            console.log(auxIndex)           
            
            return this.carrito[index].producto.splice(auxIndex, 1)
        } else {
            return { error: 'producto no encontrado' }
        } 
    }

}

module.exports = ContenedorCarrito;