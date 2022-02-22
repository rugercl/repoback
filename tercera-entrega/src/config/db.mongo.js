const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
       console.log('No Anda el server ',err)
    } else{
        console.log('Mongo_Atlas conectado')
    }
})
