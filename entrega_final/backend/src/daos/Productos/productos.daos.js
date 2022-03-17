const ContenedorProductosMongoAtlas = require('../../contenedores/productos.contenedor')
const SchemaProducts = require('../../model/productos.model')

class ProductosDAOMongoDB extends ContenedorProductosMongoAtlas {
    constructor() {
        super('product', SchemaProducts)
    }
}

module.exports = ProductosDAOMongoDB;
