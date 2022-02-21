import app from './server.js'
import express from 'express'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server on port ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
