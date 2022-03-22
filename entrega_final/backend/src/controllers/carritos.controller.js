const twlio = require('twilio')
const { carritosDao, productosDao, usuariosDao } = require('../daos/index')
const { sendNodeMailCart } = require('../middleware/nodeMailerCart')
const {logger} = require('../../src/utils/logger')


const acountID = process.env.TWILIO_ACOUNT_ID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twlio(acountID, authToken)

exports.GetAllCarts = async (req, res) => {

    try {

        const cartsAll = await carritosDao.findAll()
        res.json({ cartsAll })

    } catch (error) {
        logger.error('Carritos Controller GetAllCarts ', error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneCart = async (req, res) => {

    try {

        const id = req.params.id
        const oneCart = await carritosDao.findOneId(id)
        res.json({ oneCart })

    } catch (error) {
        logger.error('Carritos Controller GetOneCart ', error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.newCart = async (req, res) => {

    try {

        const newCats = await carritosDao.newCart(req.body)
        res.json({ newCats })

    } catch (error) {
        logger.error('Carritos Controller newCart ', error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.ModifyOneCart = async (req, res) => {

    try {

        const id = req.params.id
        const body = req.body

        const modCart = await carritosDao.ModifyOneCart(id, body)
        res.json({ modCart })

    } catch (error) {
        logger.error('Carritos Controller ModifyOneCart ', error)
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneCartAndProducts = async (req, res) => {

    try {

        const id = req.params.id
        const deleteCart = await carritosDao.DeleteOneCart(id)
        res.json({ msg: 'eliminado' })

    } catch (error) {
        logger.error('Carritos Controller DeleteOneCartAndProducts', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.addProductinTheCart = async (req, res) => {

    try {

        const idCart = req.params.id
        logger.error('idCart', idCart)
        const idProd = req.params.idProd
        logger.error('idProd', idProd)

        const cartEnc = await carritosDao.findOneId(idCart)
        const prodEnc = await productosDao.findOneId(idProd)

        cartEnc.producto.push(prodEnc)
        const CartG = carritosDao.SaveCart(cartEnc, idCart, idProd)


        res.json({ CartG })
    } catch (error) {
        logger.error('Carritos Controller addProductinTheCart', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneProductCart = async (req, res) => {

    try {

        let idCart = req.params.id
        let idProd = req.params.idProd

        const cartSearch = await carritosDao.findOneId(idCart)
        logger.error('cartSearch DeleteOneProductCart', cartSearch);

        const prodSearch = await productosDao.findOneId(idProd)
        logger.error('prodSearch DeleteOneProductCart', prodSearch);

        cartSearch.producto.splice(prodSearch, 1)
        const CartG = carritosDao.SaveCart(cartSearch, idCart)

        res.json(CartG)

    } catch (error) {
        logger.error('Carritos Controller DeleteOneProductCart', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.payCart = async (req, res) => {

    try {

        const pedidoFront = req.body
        const idUser = req.params.idUser
        const oneUser = await usuariosDao.findOneId(idUser)
        const { nombre, usuario, telefono } = oneUser

        function nameUser(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }

        const contentEmail = {
            subject: 'Nuevo Pedido',
            nombre,
            usuario,
            pedidoFront
        }

        const msgClient = await client.messages.create({
            body: 'Tu pedido ya fue recibo y se encuentra en proceso de envio',
            from: process.env.TWILIO_NUMBER_DEFAULT,
            to: telefono
        })

        const msgAdmin = await client.messages.create({
            body: `Nuevo Pedido de ${nameUser(nombre)}. Email del usuario: ${usuario}`,
            from: process.env.TWILIO_NUMBER_DEFAULT_ADMIN,
            to: process.env.TWILIO_NUMBER_DEFAULT_WHTS
        })

        await sendNodeMailCart(contentEmail)

        res.json(msgClient)

    } catch (error) {
        logger.error('Carritos Controller payCart', error)
    }
}
