let hoy= new Date();
let fecha = hoy.getDate() + "-" + (hoy.getMonth() +1) + "-" + hoy.getFullYear();
let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
let fechaHora = fecha + " " + hora;

class Contenedor{
    constructor(archivo){
        this.productos = []
        this.id = 0
        this.timestap
        this.codigo = 1000    
    }

    // GET '/api/productos/:id'
    getById(id) {
        const prod = this.productos.find(prod => prod.id == id)
        return prod || { error: 'producto no encontrado' }
        
    }

    getAll(){
        return this.productos;
    }

    // POST '/api/productos
    save(prod) {
        const newProd = { ...prod, id: ++this.id, timestap:fechaHora, codigo: ++this.codigo }
        this.productos.push(newProd)
        return newProd
    }

    // PUT '/api/productos
    put(prod, id) {
        const newProd = { id: Number(id), ...prod }
        const index = this.productos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    // DELETE '/api/productos/:id  
    deleteById(id) {
        const index = this.productos.findIndex(prod => prod.id == id)
        if (index !== -1) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'producto no encontrado' }
        }
    }

}

module.exports = Contenedor;