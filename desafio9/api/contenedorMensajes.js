// const { promises: fs } = require('fs')
// import fs from 'fs';
import { promises as fs } from 'fs'

class ContenedorMensajes{
    constructor(ruta) {
        this.ruta = ruta;
    }
    async guardar(elem) {
        const elems = await this.listarAll()

        let newId
        if (elems.length == 0) {
            newId = 1
        } else {
            newId = elems[elems.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        elems.push(newElem)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    getById(id){
    return this.archivo[id];
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    deleteById(id){
        let faux=this.archivo.findIndex((o)=>{
            return o.id==id
            
        })
        if(faux){
            this.archivo.splice(faux,1);
        }else{
            "no existe"
        }
}
}


export default ContenedorMensajes;








