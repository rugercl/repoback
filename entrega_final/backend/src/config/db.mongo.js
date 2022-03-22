const mongoose = require('mongoose')
const logger = require('../../src/utils/logger')

mongoose.connect(
    process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
       logger.error('Server no Arranca ',err)
    } else{
        logger.error('MongoAtlas Iniciado')
    }
})
