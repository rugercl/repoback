export default {
    PORT: process.env.PORT || 3000,

    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb://localhost/ecommerce',
    },
    fileSystem: {
        path: './DB'
    }
}
