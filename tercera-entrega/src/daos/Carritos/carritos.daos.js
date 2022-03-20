const ContenedorCarritosMongoAtlas = require('../../contenedores/carrito.contenedor')
const SchemaCats = require('../../model/carritos.model')

class CarritosDAOMongoDB extends ContenedorCarritosMongoAtlas {
    constructor() {
        super('cart', SchemaCats)
    }
}

module.exports = CarritosDAOMongoDB;