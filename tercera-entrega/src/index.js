require('dotenv').config()
const express = require('express')
const handlebars = require ('express-handlebars');
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('public'))

// app.engine(
//     "hbs",
//     handlebars({
//         extname: ".hbs",
//         defaultLayout: 'index.hbs',
//     })
// );
// app.set("view engine", "hbs");
// app.set("views", "./views");


const routerRoutes = require('./routes')
app.use('/api', routerRoutes)

app.listen(3000, () => {
    console.log('Server on port 3000');
})
