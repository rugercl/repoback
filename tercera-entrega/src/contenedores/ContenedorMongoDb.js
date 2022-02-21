import { Mongoose } from "mongoose";
import configDb from "../config/configDb";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
}
}
export default ContenedorMongoDb