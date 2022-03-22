const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const toDay = new Date()
const { usuariosDao, carritosDao } = require('../daos/index')
const sendNodeMail = require('../middleware/nodemailer')
const sendNodeMailAdmin = require('../middleware/nodemailerAdmin')
const cloudinary = require("../utils/cloudinary");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const logger = require('../../src/utils/logger')

passport.use('local-register', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, usuario, contrasenia, done) => {

    try {
        // const userReg = await usuariosDao.findOneUser({ usuario });

        const { nombre, direccion, edad, telefono } = req.body
        const newUsers = await usuariosDao.newUser(req.body)

        const newCart = {
            userId: newUsers.id,
            timestamp: toDay,
            producto: []
        }

        const newCarts = await carritosDao.newCart(newCart)

        const newUser = {
            carritoID: newCarts.id,
            nombre,
            direccion,
            edad,
            telefono,
            usuario: usuario.toLowerCase(),
            admin: false,
            token: []
        }

        const salt = await bcryptjs.genSalt(10);
        newUser.contrasenia = await bcryptjs.hash(contrasenia, salt);
        const userCreate = await usuariosDao.ModifyOneUser(newUsers.id, newUser)

        const jwt_payload = {
            user: {
                id: newUsers.id,
                usuario: newUser.usuario,
                admin: newUser.admin
            }
        }

        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        newUser.token = [token]
        await usuariosDao.ModifyUserToken(newUser)

        function nameUser(name) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        }

        const contentEmail = {
            email: usuario,
            subject: 'Registro exitoso ',
            msg: '¡Hola ' + nameUser(nombre) + ' Bienvenido!',
        }

        await sendNodeMail(contentEmail.email, contentEmail.subject, contentEmail.msg)


    } catch (error) {
        logger.error('Passport Local Register', error);
    }
}))

//Login PassPort
passport.use('local-login', new LocalStrategy(async (usuario, contrasenia, done) => {

    try {

        const userLogin = await usuariosDao.findOneUser({ usuario });

        const jwt_payload = {
            user: {
                id: userLogin.id,
                usuario: userLogin.usuario,
                admin: userLogin.admin
            }
        }

        const token = jwt.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin.token = [token]
        await usuariosDao.ModifyUserToken(userLogin)
        logger.error('usuarioLogueado', userLogin)

    } catch (error) {
        logger.error('Passport Local Login', error);
        res.status(500).json({ msg: 'Error', error })
    }

}))

exports.ImageUpload = async (req, res) => {

    try {
        const id = req.params.userId
        const results = await cloudinary.uploader.upload(req.file.path);
        const fotOavatar = results.secure_url

        const userCreate = await usuariosDao.addImage(id, fotOavatar)

        const oneUser = await usuariosDao.findOneId(id)
        const { carritoID, nombre, edad, usuario, direccion, telefono, admin, foto } = oneUser

        const contentEmail = {
            subject: 'Nuevo Registro',
            carritoID,
            nombre,
            direccion,
            edad,
            telefono,
            usuario,
            admin,
            foto
        }

        await sendNodeMailAdmin(contentEmail)
        res.send(results.secure_url);

    } catch (error) {
        logger.error('Cloudinary ImageUpload', error)
    }
}

exports.LogoutUser = async (req, res) => {
    try {

        logger.error('resLocalsControllers', res.locals.user)

        await usuariosDao.LogoutUserRes(res.locals.user)
        res.json({ mensaje: 'Deslogueo ok' })

    } catch (error) {
        logger.error('Passport LogoutUser', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetAllUsers = async (req, res) => {

    try {
        const usuarios = await usuariosDao.findAll()
        res.json({ usuarios })

    } catch (error) {
        logger.error('Usuarios Controller GetAllUsers', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.GetOneUser = async (req, res) => {

    try {

        const id = req.params.id
        const oneUser = await usuariosDao.findOneId(id)

        res.json({ oneUser })

    } catch (error) {
        logger.error('Usuarios Controller GetOneUser', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.ModifyOneUser = async (req, res) => {

    try {

        const id = req.params.id
        const body = req.body

        const modUser = await usuariosDao.ModifyOneUser(id, body)
        res.json({ modUser })

    } catch (error) {
        logger.error('Usuarios Controller ModifyOneUser', error);
        res.status(500).json({ msg: 'Error', error })
    }
}

exports.DeleteOneUSer = async (req, res) => {

    try {

        const id = req.params.id

        const userSearch = await usuariosDao.findOneId(id)
        let idCart = await userSearch.carritoID
        let cartSearch = await carritosDao.findOneId(idCart)
        logger.error('cartSearch', cartSearch);

        if (cartSearch.producto.length !== 0) {

            cartSearch.producto.splice(0, cartSearch.producto.length)
            cartSearch.save()

            cartSearch = await carritosDao.DeleteOneCart(idCart)
            const deleteUser = await usuariosDao.DeleteOneUser(id)

            res.json('Carrito eliminado')
        } else {

            cartSearch = await carritosDao.DeleteOneCart(idCart)
            const deleteUser = await usuariosDao.DeleteOneUser(id)

            res.json('Carrito eliminado')
        }

    } catch (error) {
        logger.error('Usuarios Controller DeleteOneUSer', error);
        res.status(500).json({ msg: 'Error', error })
    }
}
