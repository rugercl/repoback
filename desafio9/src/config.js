export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost/ecommerce',
    },
    fileSystem: {
        path: './DB'
    }

}