require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))


const routerRoutes = require('./routes')
app.use('/api', routerRoutes)

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})