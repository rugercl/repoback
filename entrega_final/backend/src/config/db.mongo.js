const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
       console.log('Server no Arranca ',err)
    } else{
        console.log('MongoAtlas Iniciado')
    }
})
