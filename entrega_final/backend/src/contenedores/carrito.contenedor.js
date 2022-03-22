const mongoose = require('mongoose')
require('../config/db.mongo')
const logger = require('../../src/utils/logger')

class ContenedorCartMongoAtlas {
    constructor(collection, schema) {
        this.cartModel = mongoose.model(collection, schema)
    }

    async findAll() {
        try {

            const cartsAll = await this.cartModel.find()
            return cartsAll
        } catch (error) {
            logger.error('Carrito Mongo findAll', error);
        }
    }

    async findOneId(id) {
        try {

            const oneCart = await this.cartModel.findOne({ '_id': id })
            return oneCart

        } catch (error) {
            logger.error('Carrito Mongo findOneId', error);

        }
    }

    async newCart(body) {
        try {

            const newCart = new this.cartModel(body);
            await newCart.save()
            return newCart


        } catch (error) {
            logger.error('Carrito Mongo newCart', error);

        }
    }

    async ModifyOneCart(id, body) {
        try {

            const modifyCart = await this.cartModel.findByIdAndUpdate({ '_id': id }, body, { new: true })
            return modifyCart

        } catch (error) {
            logger.error('Carrito Mongo ModifyOneCart', error);
        }
    }

    async DeleteOneCart(id) {
        try {

            const deleteCart = await this.cartModel.findByIdAndDelete({ '_id': id })
            return deleteCart

        } catch (error) {
            logger.error('Carrito Mongo DeleteOneCart', error);

        }
    }

    async SaveCart(cartEnc) {
        try {
           
            cartEnc.save()
            return cartEnc 

        } catch (error) {
            logger.error('Carrito Mongo SaveCart', error);
        }
    }
}

module.exports = ContenedorCartMongoAtlas;
