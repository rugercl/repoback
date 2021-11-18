import admin from "firebase-admin"
import config from '../configDb.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase{

}
export default ContenedorFirebase;