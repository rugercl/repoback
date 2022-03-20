const ContenedorUsuariosMongoAtlas = require('../../contenedores/usuarios.contenedor')
const SchemaUsers = require('../../model/usuarios.model')

class UsuariosDAOMongoDB extends ContenedorUsuariosMongoAtlas {
    constructor() {
        super('user', SchemaUsers)
    }
}

module.exports = UsuariosDAOMongoDB;
