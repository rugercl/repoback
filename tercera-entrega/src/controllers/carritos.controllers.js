const { carritosDao, productosDao, usuariosDao } = require('../daos/index')

exports.GetAllCarts = async (req, res) => {

    try {

        const cartsAll = await carritosDao.findAll()
        res.json({ cartsAll })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneCart = async (req, res) => {

    try {

        const id = req.params.id
        const oneCart = await carritosDao.findOneId(id)
        res.json({ oneCart })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.newCart = async (req, res) => {

    try {

        const newCats = await carritosDao.newCart(req.body)
        res.json({ newCats })

    } catch (error) {
        console.log('error', error);
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
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneCartAndProducts = async (req, res) => {

    try {

        const id = req.params.id
        const deleteCart = await carritosDao.DeleteOneCart(id)
        res.json({ msg: 'eliminado' })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.addProductinTheCart = async (req, res) => {

    try {

        const idCart = req.params.id
        console.log('idCart', idCart)
        const idProd = req.params.idProd
        console.log('idProd', idProd)

        const cartEnc = await carritosDao.findOneId(idCart)
        const prodEnc = await productosDao.findOneId(idProd)

        cartEnc.producto.push(prodEnc)
        const CartG = carritosDao.SaveCart(cartEnc, idCart, idProd)


        res.json({ CartG })
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneProductCart = async (req, res) => {

    try {

        let idCart = req.params.id
        let idProd = req.params.idProd

        const cartSearch = await carritosDao.findOneId(idCart)
        console.log('cartSearch', cartSearch);

        const prodSearch = await productosDao.findOneId(idProd)
        console.log('prodSearch', prodSearch);

        cartSearch.producto.splice(prodSearch, 1)
        const CartG = carritosDao.SaveCart(cartSearch, idCart)

        res.json(CartG)

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.payCart = async (req, res) => {

    try {

        const pedidoFront = req.body
        const idUser = req.params.idUser
        const oneUser = await usuariosDao.findOneId(idUser)
        const { nombre, usuario, telefono } = oneUser

        function primeraLetraDelNombreMayuscula(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }

        const mailContent = {
            subject: 'Nuevo Pedido',
            nombre,
            usuario,
            pedidoFront
        }

        await sendNodeMailCart(mailContent)

        res.json(msgClient)

    } catch (error) {
        console.log('error', error)
    }
}
