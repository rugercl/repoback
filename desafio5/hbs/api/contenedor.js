class Contenedor{
    constructor(archivo){
        this.archivo = archivo;        
    }

    save(libro, precio, url){        
        this.archivo.push({libro, precio, url});  
        return this.archivo;  
    }  

    getById(id){
    return this.archivo[id];
    }

    getAll(){
        return this.archivo;
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

// const test = new Contenedor([]);

// test.save("Pantalon", 2500, "http://casadeldeporte/pantalon.jpg")
// console.log("Probando metodo Save",test)

// test.save("Camiseta", 3500, "http://casadeldeporte/camiseta.jpg")
// console.log("Probando metodo Save",test)

// test.save("Polera", 2000, "http://casadeldeporte/polera.jpg")
// console.log("Probando metodo Save",test)

// let write = fs.promises.writeFile("./productos.txt", JSON.stringify(test.archivo), "utf-8");

// write.then((res) => {
//   try {
//     console.log("Archivo creado");
//   } catch {
//     throw "Error al crear archivo";
//   }
// }).catch(err => {
//     throw err
// });

// console.log("Mostrando archivo posicion 1",test.getById(1));
// console.log("Mostrando contenido del archivo",test.getAll());

// test.deleteById(2);
// console.log("Borrando elemento 2",test)

// test.deleteAll();
// console.log("Vaciar Archivo",test);

module.exports = Contenedor;








