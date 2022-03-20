const express = require('express')
const router = express.Router()

const prodRouter = require('./productos.routes')
const carrRouter = require('./carritos.routes')
const userRouter = require('./usuarios.routes')

router.use('/productos', prodRouter)
router.use('/carritos', carrRouter)
router.use('/usuarios', userRouter)

module.exports = router