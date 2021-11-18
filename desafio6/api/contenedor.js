
class Contenedor{
    constructor() {
        this.elementos = []
        this.id = 0
    }

    save(dato){        
        const newDato = { ...dato, id: ++this.id }
        this.elementos.push(newDato)
        return newDato 
    }  

    getById(id){
    return this.archivo[id];
    }

    getAll(){
        return [...this.elementos];
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


module.exports = Contenedor;








