const jwt = require('jsonwebtoken');
const { usuariosDao } = require('../daos/index')
const logger = require('../../src/utils/logger')

module.exports = (role) => async (req, res, next) => {

    try {

        const token = req.header('authorization').replace('Bearer ', '');
        logger.error('token', token)
        const verificar = jwt.verify(token, process.env.JWT_SECRET);
        const userLogin = await usuariosDao.authTokenVerify({ verificar, token });
        if (!userLogin) {
            return res.status(401).json({ mensaje: 'Login: No Autorizado' })
        }

        res.locals.user = userLogin;
        res.locals.token = token;

        next();
    }

    catch (error) {
        logger.error('error', error);
        return res.status(401).json({ mensaje: 'Logout: Acceso Restringido', error: error.message })
    }
}
