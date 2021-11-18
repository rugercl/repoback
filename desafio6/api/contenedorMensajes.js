const { promises: fs } = require('fs')

class ContenedorMensajes{
    constructor(ruta) {
        this.ruta = ruta;
    }

    async guardar(obj) {
        const objs = await this.listarAll()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
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


module.exports = ContenedorMensajes;








