const { productosDao } = require('../daos/index')
const moment = require('moment')
const toDay = moment().format('DD/MM/YYYY')

exports.GetAllProducts = async (req, res) => {
 
    try {
        const productos = await productosDao.findAll()
        
        res.json(productos)

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneProduct = async (req, res) => {

    try {

        const id = req.params.id
        const oneProduct = await productosDao.findOneId(id)
        res.json(oneProduct)

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.CreateOneProduct = async (req, res) => {

    try {

        const {nombre, descripcion, foto, precio, stock, codigo} = req.body

        const newObjProd = {
            nombre,
            descripcion,
            foto,
            precio,
            stock,
            timestamp: toDay,
            codigo
        }

        const newProducts = await productosDao.newProduct(newObjProd)
        res.json({ newProducts })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })

    }
}

exports.ModifyOneProduct = async (req, res) => {

    try {

        const id = req.params.id
        const body = req.body

        const modProd = await productosDao.ModifyOneProduct(id, body)
        res.json({ modProd })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneProduct = async (req, res) => {

    try {

        const id = req.params.id
        const deleteProd = await productosDao.DeleteOneProduct(id)
        res.json({ msg: 'eliminado' })

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ msg: 'Error', error })
    }
}
