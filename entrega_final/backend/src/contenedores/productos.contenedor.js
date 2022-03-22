const mongoose = require('mongoose')
require('../config/db.mongo')
const logger = require('../../src/utils/logger')
class ContenedorMongoAtlas {
    constructor(collection, schema) {
        this.prodModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {

            const productsAll = await this.prodModel.find()
            return productsAll
            
        } catch (error) {
            logger.error('Productos Mongo findAll', error)
        }
    }

    async findOneId(id) {
        try {

            const oneProduct = await this.prodModel.findOne({ '_id': id })
            return oneProduct

        } catch (error) {
            logger.error('Productos Mongo findOneId', error)

        }
    }

    async newProduct(body) {
        try {

            const newProduct = new this.prodModel(body);
            await newProduct.save()

            return newProduct

        } catch (error) {
            logger.error('Productos Mongo newProduct', error)

        }
    }

    async ModifyOneProduct(id, body) {
        try {

            const modifyProd = await this.prodModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyProd

        } catch (error) {
            logger.error('Productos Mongo ModifyOneProduct', error)

        }
    }

    async DeleteOneProduct(id) {
        try {

            const deleteProd = await this.prodModel.findByIdAndDelete({ '_id': id })
            return deleteProd

        } catch (error) {
            logger.error('Productos Mongo DeleteOneProduct', error)

        }
    }
}

module.exports = ContenedorMongoAtlas;
